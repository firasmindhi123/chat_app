const user_model=require('../model/model_user')
const chat_model=require('../model/model_chat')
const group_model=require('../model/model_group')
const group_table=require('../model/group_table')
const { Op } = require("sequelize")





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

 
    

      
exports.add_member=async(req,res)=>{
    try{
      
    const member=req.body.user_add
     console.log(member)
    if(IsStringInvalid(member))
    {
        return res.status(401).json({message:"something missing"})
    }
    
   const data=await user_model.findOne({
    where:{
      email:member
    },
    attributes:['id','name'],
   })
   const group =req.query.group
   const group_exist=await group_model.findOne({where:{
    group_name:group
   }
  })
  const admin=await group_table.findOne({where:{userId:req.user.id,groupId:group_exist.id}})
  
   if(data && group_exist)
   {
    if(admin.isadmin==false){
      return resstatus(402).json({message:"you are not admin"})
    }
    const adding=await data.addGroup(group_exist.id)
    console.log(adding)
   const c= await group_table.update({isadmin:false},{where:{userId:data.id,groupId:group_exist.id}})
   return res.status(201).json({userdata:{adding}})
  
  }
   else{
    return res.status(404).json({message:"user are not found"})
   }
    
   }catch(err){
    console.log(err)
    res.status(501).json({message:"something went wrong"})
   }
  }
  
  
       
  exports.getchat=async(req,res)=>{
    try{
    const last_message=req.query.message  
     const  group_name=req.query.group
    let group=await group_model.findOne({where:{
      group_name:group_name,
      
     }})
    const user_chat=await chat_model.findAll({
      where:{
       
       id: {[Op.gt]: last_message},
       groupId:group.id,
      },
      attributes:['id','message'],
        include:[
          {
            model:user_model,
            attributes:['name']
            
          }
        ],
        
      })
      // console.log(user_chat)
      res.status(200).json({chat_data:user_chat})
     }catch(err){
      
      console.log(err)
      res.status(404).json({message:"data not found"})
     }
  }
  exports.admin=async(req,res)=>{
    try{
   const person=req.body.person
   const group_name= req.query.group
   let group=await group_model.findOne({where:{
    group_name:group_name,
   },
   
   })
   


   let admin=await group_table.findOne({where:{
    userId:req.user.id,groupId:group.id,

   }})
  if(admin.isadmin==false)
  {
   
    return res.status(404).json({message:"youare not admin"})
  }
  else {
    let userexist= await user_model.findOne({where:{email:person}})
    
    let ingroup=await group_table.findOne({where:{
      userId:userexist.id,groupId:group.id
     }})
     
     if(ingroup)
     {
       const admin=await group_table.update({isadmin:true},{where:{id:ingroup.id}})
        res.status(201).json({message:'user are admin now'})
     }
     else{
      return res.status(403).json({message:"user doesnt exist in group"})
     }
  }
  
  }

catch(err)
{
  res.status(501).json({message:"something went wrong"})
}
  }