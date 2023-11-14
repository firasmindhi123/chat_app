const express=require('express')
const user_autheticate=require('../authentication')
const router=express.Router()
const group_chat=require('../controller/group_chat')
router.get('/getdata',user_autheticate.authenticate,group_chat.getchat)
router.post('/add_member',user_autheticate.authenticate,group_chat.add_member)
router.post('/admin',user_autheticate.authenticate,group_chat.admin)
module.exports=router