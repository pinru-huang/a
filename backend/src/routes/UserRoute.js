import { Router } from "express";
import { UserModel } from "../models/Login.js";
import mongoose from "mongoose";
import auth from './auth.js'
const router = Router();
    //註冊路由

router.post('/users/', async (req, res) => {
    
        // 從 req.body 獲取驗證資訊，並在資料庫存與該用戶
        let find=await UserModel.findOne({email:req.body.email});
        if(find){
          res.status(400).send("Duplicate email!");
        }else {
          find=await UserModel.findOne({name:req.body.name});
          if(find){
             res.status(400).send('Duplicate name!');
          }else{
            try{const user = await UserModel.create(req.body)
            // 為該成功註冊之用戶產生 JWT
            const token = await user.generateAuthToken()
            // 回傳該用戶資訊及 JWT
            res.status(201).send({ user, token })
            }catch (err) {
              res.status(400).send(err)
            }
          } 
        }
    
        
  })
  
  // 登入路由
  router.post('/users/login', async (req, res) => {
    try {
        // 驗證使用者，並將驗證成功回傳的用戶完整資訊存在 user 上
        const user = await UserModel.findByCredentials(req.body.email, req.body.password)
        // 為該成功登入之用戶產生 JWT
        const token = await user.generateAuthToken()
        // 回傳該用戶資訊及 JWT
        res.send({ user, token })
      } catch (err) {
        res.status(400).send()
      }
  })
  
  // 登出路由
  router.post('/users/logout',auth, async(req, res) => {
    try {
        // 篩選掉當前的 Token 
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        // 將包含剩餘 Token 的使用者資料存回資料庫
        await req.user.save()
        res.status(200).send()
      } catch (err) {
        res.status(500).send()
      }
  })
  
  // 登出所有裝置
  router.post('users/logoutAll', auth, async (req, res) => {
    try {
        // 將所有 JWT 從使用者資料中 tokens 欄位刪除
        req.user.tokens = []
        // 將使用者資料存回資料庫
        await req.user.save()
        res.status(200).send()
      } catch {
        res.status(500).send()
      }
  })
  //改密碼
  router.post('/users/change',auth,async(req,res)=>{
    try {
      // 驗證使用者，並將驗證成功回傳的用戶完整資訊存在 user 上
      const user = await UserModel.findByCredentials(req.body.email, req.body.opassword)
      // 為該成功登入之用戶產生 JWT
      user.password=req.body.npassword;
      await user.save()
      const token = await user.generateAuthToken()
      // 回傳該用戶資訊及 JWT
      res.send({ user, token })
    } catch (err) {
      res.status(400).send()
    }
  })
  //get user
  router.get('/users',auth,async(req,res)=>{
      // console.log(req.user);
      const user=req.user
      res.status(200).send({user});
  })
export default router