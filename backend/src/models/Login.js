import mongoose, { mongo, Schema } from 'mongoose'


import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";

const UserSchema = Schema({
   
    name:{type:String, required: [true, 'Name field is required.']},
    email:{type:String, required: [true, 'Name field is required.']},
    password:{type:String},
    tokens: [{
        token: {
          type: String,
          required: true
        }
      }],
});
UserSchema.set('timestamps',true);
UserSchema.pre('save', async function (next) {
    // this 指向目前正被儲存的使用者 document
    const user = this
    // 確認使用者的 password 欄位是有被變更：初次建立＆修改密碼都算
    if (user.isModified('password')) {
      // 透過 bcrypt 處理密碼，獲得 hashed password
      user.password = await bcrypt.hash(user.password, 8)
    }
    next()
  })
UserSchema.methods.generateAuthToken = async function () {
    // this 指向當前的使用者實例
    const user = this
    // 產生一組 JWT
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewproject')
    // 將該 token 存入資料庫中：讓使用者能跨裝置登入及登出
    user.tokens = user.tokens.concat({ token })
    await user.save()
    // 回傳 JWT
    return token
}


UserSchema.statics.findByCredentials = async (email, password) => {
    // 根據 email 至資料庫找尋該用戶資料
    const user = await UserModel.findOne({ email })
    // 沒找到該用戶時，丟出錯誤訊息
    if (!user) { throw new Error('Unable to login') }
    // 透過 bcrypt 驗證密碼
    const isMatch = await bcrypt.compare(password, user.password)
    // 驗證失敗時，丟出錯誤訊息
    if (!isMatch) { throw new Error('Unable to login') }
    // 驗證成功時，回傳該用戶完整資料
    return user
  }
UserSchema.method('meow', function () {
    console.log('meeeeeoooooooooooow');
  })
  
  const UserModel=mongoose.model('User',UserSchema);
const PostSchema = Schema({
  
    title:{type:String},
    authorId:{type:mongoose.Types.ObjectId,ref:'User'},
    body:{type:String},
    likerGiver:[{ type:Number}] 
});
PostSchema.set('timestamps',true);
const PostModel=mongoose.model('Post',PostSchema);
export {PostModel,UserModel};

// 建立 userSchema

// 在 userSchema 上建立 Pre middleware 將密碼在儲存(save)前處理


// 匯出使用者 Model