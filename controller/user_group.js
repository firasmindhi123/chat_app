const user_model=require('../model/model_user')
const chat_model=require('../model/model_chat')
const group_model=require('../model/model_group')
const group_table=require('../model/group_table')
const { Op } = require("sequelize")
const path=require('path')
const root_dir=require('../util/path')
function IsStringInvalid(str)
{
    if(str==undefined||str.length===0)
    {
        return true
    }
    else
    {
        return false
    }
}

  
exports.group=async(req,res)=>{
  try{
  const group=req.body.group_name
  if(IsStringInvalid(group))
  {
      return res.status(401).json({message:"something missing"})
  }
 
 const data=await req.user.createGroup({
  
  group_name:group,
 
 })
 
 const admin=await group_table.update({isadmin:true},{where:{userId:req.user.id,groupId:data.id}})
 console.log(admin)
  res.status(201).json({userdata:data,admin})
 }catch(err){
  console.log(err)
  res.status(501).json({message:"something went wrong"})
 }
}
exports.getgroup=async(req,res)=>{
  try
 
 {
   const last_id=req.query.group
     const group_no=  await group_model.findAll({
       where:{
         id: {[Op.gt]: last_id},
       },
   include:[{
      model:user_model,
      where:{
       id :req.user.id
      }
   }]
  
 })
 res.status(200).json({data:group_no})
 }
 catch(err)
 {
res.status(404).json(({message:"data not found"}))
 }
 
 }
 exports.group_chat=(req,res)=>{
  console.log(req.query.group)
  res.sendFile(path.join(root_dir,`/views/group_chat.html`))
  
}
exports.group_chat_post=async(req,res)=>{
   try{
let group_name=req.body.hidden
let group_message=(req.body.message)
if(IsStringInvalid(group_name)||IsStringInvalid(group_message))
{
   return res.status(401).json({message:"something missing"})
}
let group=await group_model.findOne({where:{
 group_name:group_name,
}})
let message=await req.user.createChat({

 message:group_message,
 groupId:group.id
})
let admin=group_model.update({isadmin:true},{where:{
  userId:req.user.id,groupId:group.id}
})
const name=req.user.name
res.status(201).json({userdata:{message,name}})
 
} catch(err){
  console.log(err)
  res.status(501).json({message:"something went wrong"})
}
 }

 