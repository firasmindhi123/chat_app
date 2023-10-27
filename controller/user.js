const bcrypt=require('bcrypt')
const user_model=require('../model/model_user')
const jwt=require('jsonwebtoken')
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
function generateAccesstoken(id,ispremium){
    return jwt.sign({userid:id},'securatewq')
  }

exports.signup=async(req,res,next)=>{

    try{
        const name=req.body.username
        const email=req.body.email
        const phone=req.body.number
        const password=req.body.password
        if(IsStringInvalid(name)||IsStringInvalid(email)||IsStringInvalid(phone)||IsStringInvalid(password))
    {
        return res.status(400).json({err:"something is missing"})
    }
    const data1= await user_model.findOne({where:{phone:`${phone}`}})
    if(data1)
    {
        return res.status(402).json({message:'user already exist'})
    }
    const data2= await user_model.findOne({where:{email:`${email}`}})
    if(data2)
    {
        return res.status(402).json({message:'user already exist'})
    }
        bcrypt.hash(password,10,async(err,hash)=>{
            console.log(err)
     await user_model.create({
            name,
            email,
            phone,
            password:hash
        })
        res.status(201).json({message:"successs"})
        })
      
        
    }catch(err){
    res.status(500).json({error:err})
        }
        
    
    }
    exports.login=async(req,res)=>{
        try{
    
        email=req.body.email
        password=req.body.password
        
        const a=await user_model.findAll({where:{email:`${email}`}})
        if(IsStringInvalid(email)||IsStringInvalid(password))
        {
            return res.status(400).json({success:false,message:"something is missing"})
        }
        if(a.length>0)
        {
            bcrypt.compare(password,a[0].password,(err,result)=>{
              if(err)
              {
                throw new Error('SOMETHING WENT WRONG')
              } 
              if(result==true)
              {
                console.log(a)
                
    
                res.status(200).json({success:true,message:"login successfull",token:generateAccesstoken(a[0].id)})
            }
            else{
             res.status(402).json({success:false,message:"password is wrong"})
            }
            })
           
        }
        else{
            
            res.status(404).json({success:false,message:'email is wrong'})
           
        }
    }catch(err){
        res.status(500).json({message:err})
    }
    }