import  {
    ApolloServer,
    gql,
    ForbiddenError,
    AuthenticationError
  } from "apollo-server";

 import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
// const  bcrypt = "bcrypt");
  // 定義 bcrypt 加密所需 saltRounds 次數
  const SALT_ROUNDS = 2;
  // 定義 jwt 所需 secret (可隨便打)
  const SECRET = "just_a_random_secret";
  
  
  // import {users,posts} from "../db"
  
const filterPostsByUserId = userId =>
    posts.filter(post => userId === post.authorId);
  const filterUsersByUserIds = userIds =>
    users.filter(user => userIds.includes(user.id));
  const findUserByUserId = userId =>
    users.find(user => user.id === Number(userId));
  const findUserByName = name => users.find(user => name === user.name);
  const findPostByPostId = postId =>
    posts.find(post => post.id === Number(postId)); 
  // Mutations
  const updateUserInfo = (userId, data) =>
    Object.assign(findUserByUserId(userId), data);
  
  const addPost = ({ authorId, title, body }) =>
    (posts[posts.length] = {
      id: posts[posts.length - 1].id + 1,
      authorId,
      title,
      body,
      likeGiverIds: [],
      createdAt: new Date().toISOString()
    });
  
  const updatePost = (postId, data) =>
    Object.assign(findPostByPostId(postId), data);
  
  const addUser = ({ name, email, password }) =>
    (users[users.length] = {
      id: users[users.length - 1].id + 1,
      name,
      email,
      password
    });
  
  const deletePost = postId =>
    posts.splice(posts.findIndex(post => post.id === postId), 1)[0];
  
  const hash = text => bcrypt.hash(text, SALT_ROUNDS);
  
  const createToken = ({ id, email, name }) =>
    jwt.sign({ id, email, name }, SECRET, {
      expiresIn: "1d"
    });
  
  const isAuthenticated = resolverFunc => (parent, args, context) => {
    if (!context.me) throw new ForbiddenError("Not logged in.");
    return resolverFunc.apply(null, [parent, args, context]);
  };
  
  const isPostAuthor = resolverFunc => async(parent, args, context) => {
    const { postId } = args;
    const { me ,PostModel} = context;
    const post=await PostModel.findOne({_id:postId});
    const isAuthor = post.authorId === me._id;
    if (!isAuthor) throw new ForbiddenError("Only Author Can Delete this Post");
    return resolverFunc.applyFunc(parent, args, context);
  };
  export {filterPostsByUserId,filterUsersByUserIds,findUserByUserId,findUserByName,findPostByPostId,updateUserInfo
    ,addPost,updatePost, addUser,deletePost,hash,createToken,isAuthenticated,isPostAuthor
}