import { UserModel,PostModel } from "./models/Login.js";
import Mutation from "./resolvers/Mutation.js";
import Post from "./resolvers/Post.js";
import Query from "./resolvers/Query.js";
import User from "./resolvers/User.js";
import Subscription from "./resolvers/Subscription.js";
import * as fs from 'fs'
import { createServer } from 'node:http'
import { WebSocketServer } from 'ws'
import { createPubSub, createSchema, createYoga } from 'graphql-yoga'
import { useServer } from 'graphql-ws/lib/use/ws'
import mongo from "./mongo.js";
import {
  ApolloServer,
  gql,
  ForbiddenError,
  AuthenticationError
} from "apollo-server";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
  
  // 定義 bcrypt 加密所需 saltRounds 次數
  import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
  const SALT_ROUNDS = Number(process.env.SALT_ROUNDS)
  const SECRET = process.env.SECRET
  
  //import {users,posts} from "./db"

const pubsub = createPubSub();
const yoga = createYoga({
  schema: createSchema({
  typeDefs :fs.readFileSync( 
    './src/schema.graphql',
    'utf-8'
    ), 
  resolvers:{ 
    Mutation,Post,User,Query,Subscription
  }
  }),
  context: async ({ req }) => {
    // 1. 取出 token
    const context={
        secret:SECRET,
        saltRounds:SALT_ROUNDS,
        UserModel,
        PostModel,
        pubsub
    }
    const token = req.headers["x-token"];
    if (token) {
      try {
        // 2. 檢查 token + 取得解析出的資料
        const me = await jwt.verify(token, SECRET);
        // 3. 放進 context
        return {...context, me };
      } catch (e) {
        throw new Error("Your session expired. Sign in again.");
      }
    }
    // 如果沒有 token 就回傳空的 context 出去
    return context;
  },
  graphiql: {
    subscriptionsProtocol: 'WS',
  }
});
const httpServer = createServer(yoga)
const wsServer = new WebSocketServer({
    server: httpServer,
    path: yoga.graphqlEndpoint,
  })
  
  useServer(
    {
    execute: (args) => args.rootValue.execute(args),
    subscribe: (args) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } =
      yoga.getEnveloped({
        ...ctx,
        req: ctx.extra.request,
        socket: ctx.extra.socket,
        params: msg.payload
      })
      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe
        }
      }
      const errors = validate(args.schema, args.document)
      if (errors.length) return errors
      return args
    },
    },
    wsServer,
    )
//   httpServer.listen().then(({ url }) => {
//     console.log(`🚀 Server ready at ${url}`);
//   });
const port=process.env.PORT || 5000;
mongo.connect();
  httpServer.listen({port}, () => {
    console.log(`Listening on http://localhost:${port}`);
});