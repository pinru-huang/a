import { findUserByUserId,filterUsersByUserIds } from "./otherfunction.js"

  
const Post={
    author: async(parent, args, {UserModel}) => await UserModel.findOne(parent.authorId),
    likeGivers: async(parent, args, {UserModel}) =>
      await parent.likeGivers.map(x=>(UserModel.findOne(x)))
  }
  export default Post