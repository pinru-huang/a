import { isAuthenticated,findUserByUserId,findUserByName ,findPostByPostId} from "./otherfunction.js";

import { isObjectIdOrHexString } from "mongoose";

const Query={
    hello: () => "world",
    me: isAuthenticated(async(root, args, { me ,UserModel}) => await UserModel.findOne({email:me.email})),
    users: () => users,
    user: async(root, { name }, {UserModel}) => await UserModel.findOne({name}),
    posts: () => posts,
    post: async(root, { _id }, {PostModel}) => await PostModel.fineOne({_id})
  }
export default Query; 