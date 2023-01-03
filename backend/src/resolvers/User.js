
import { filterPostsByUserId,filterUsersByUserIds } from "./otherfunction.js";
const User={
    posts: async(parent, args, {PostModel}) => await PostModel.find(parent._id),
    friends: (parent, args, {UserModel}) =>
      parent.friendIds.map(x=>UserModel.findOne(x)) 
  }
export default User; 