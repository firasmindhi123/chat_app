const express=require('express')
const user_autheticate=require('../authentication')
const router=express.Router()
const group_chat=require('../controller/group_chat')
router.get('/getdata',user_autheticate.authenticate,group_chat.getchat)
router.post('/add_member',group_chat.add_member)
module.exports=router