const jwt=require('jsonwebtoken')
const User=require('./model/model_user')

exports.authenticate=(req,res,next)=>{
    try{
       const token=req.header('Authorization')
       
       const user=jwt.verify(token,'securatewq')
       User.findByPk(user.userid).then(user=>{
        req.user=user
        next()
       })
    }
    catch(err)
    {
        console.log(err)
        return res.status(402).json({message:"you are user"})
    }
}