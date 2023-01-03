
import {filterPostsByUserId,filterUsersByUserIds,findUserByUserId,findUserByName,findPostByPostId,updateUserInfo
  ,addPost,updatePost, addUser,deletePost,hash,createToken,isAuthenticated,isPostAuthor
}from './otherfunction.js'
import {
  ApolloServer,
  gql,
  ForbiddenError,
  AuthenticationError
} from "apollo-server";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";

// 定義 bcrypt 加密所需 saltRounds 次數

const Mutation={
  updateMyInfo: isAuthenticated(async(parent, { input }, { me ,UserModel,pubsub,saltRounds}) => {
    // 過濾空值
    // const data = ["name", "age"].reduce(
    //   (obj, key) => (input[key] ? { ...obj, [key]: input[key] } : obj),
    //   {}
    // );

    const Ume=await UserModel.findOne({email:me.email});
    if(input.name) Ume.name=input.name;
    if(input.age) Ume.age=input.age;
    if(input.opassword){
      const passwordIsValid = await bcrypt.compare(input.opassword, Ume.password);
      if (!passwordIsValid) throw new AuthenticationError("Wrong Password");
      if(input.npassword){
        const hashedPassword = await bcrypt.hash(input.npassword, saltRounds);
        Ume.password=hashedPassword;
      }
    }
    await Ume.save();
    pubsub.publish(`me ${me.email}`, {
      newme: Ume,
    });
    return Ume;
  }),
  addFriend: isAuthenticated(async(parent, { userId }, { me: { _id: meId },UserModel }) => {
    const me = await UserModel.findOne(meId);
    if (me.friendIds.include(userId))
      throw new Error(`User ${userId} Already Friend.`);

    const friend = await UserModel.findOne(userId);
    me.friendIds.push(userId)
    friend.friendIds.push(meId);
    await me.save();
    await friend.save();
    return me;
  }),
  addPost: isAuthenticated(async(parent, { input }, { me ,PostModel}) => {
    const { title, body } = input;
    return await new PostModel({title,body,authorId:me._id});
  }),
  likePost: isAuthenticated(async(parent, { postId }, { me ,PostModel}) => {
    const post = await PostModel.findOne({postId});

    if (!post) throw new Error(`Post ${postId} Not Exists`);

    if (!post.likeGiverIds.includes(postId)) {
        post.likeGiverIds.push(me._id);
        return await post.save();
    }
    const newlike=post.likeGiverIds
    post.likeGiverIds.splice(newlike.indexOf(postId),1);
    return await post.save();

  }),
  deletePost: isAuthenticated(
    isPostAuthor(async(root, { postId }, { me ,PostModel}) =>await PostModel.remove(postId))
  ),
  signUp: async (root, { name, email, password }, {UserModel,saltRounds}) => {
    // 1. 檢查不能有重複註冊 email
    let user = await UserModel.findOne({email});
    if (user) throw new Error("User Email Duplicate");
    // 2. 將 passwrod 加密再存進去。非常重要 !!
    user = await UserModel.findOne({name});
    if (user) throw new Error('User Name Duplicate!');
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // 3. 建立新 user
    return await new UserModel({name,email,password:hashedPassword}).save();
  },
  login: async (root, { email, password }, {UserModel,secret}) => {
    // 1. 透過 email 找到相對應的 user
    const user = await UserModel.findOne({email});
    if (!user) throw new Error("Email Account Not Exists");
    
    // 2. 將傳進來的 password 與資料庫存的 user.password 做比對
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) throw new AuthenticationError("Wrong Password");
    const createToken = ({ id, email, name }) =>
    jwt.sign({ id, email, name }, secret, {
      expiresIn: "1d"
    });
    // 3. 成功則回傳 token
    return { token: await createToken(user) };
  }
}
export default Mutation ;