const express=require('express')
const path =require('path')
const bodyparse=require('body-parser')
const root_dir=require('./util/path')
const bcrypt=require('bcrypt')
const sequelize=require('./util/database')
const user_model=require('./model/model_user')
 const app=express()
 app.use(bodyparse.urlencoded({extended:false}))
app.use(bodyparse.json())

app.use(express.static(path.join(__dirname,'public')))
 app.get('/signup',(req,res,next)=>{
    res.sendFile(path.join(root_dir,'views','signup.html'))

 })
 app.post('/signup',(req,res,next)=>{

    try{
        const name=req.body.username
        const email=req.body.email
        const phone=req.body.number
        const password=req.body.password
        
        bcrypt.hash(password,10,async(err,hash)=>{
            console.log(err)
     await user_model.create({
            name,
            email,
            phone,
            password:hash,
            totalExpese:0
    
        })
        res.status(201).json({message:"successs"})
        })
      
        
    }catch(err){
    res.status(500).json({error:err})
        }
        
    
    })
    sequelize.sync().then(result=>{
   
        app.listen(3000)
    } ).catch(err=>console.log(err))