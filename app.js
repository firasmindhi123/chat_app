const express=require('express')
const path =require('path')
const bodyparse=require('body-parser')
const root_dir=require('./util/path')
const sequelize=require('./util/database')
const user_router=require('./router/router_user')
const cors= require('cors')
 const app=express()
 app.use(bodyparse.urlencoded({extended:false}))
app.use(bodyparse.json())
app.use(cors({origin:'*'}))
app.use(express.static(path.join(__dirname,'public')))
 
 app.use('/user',user_router)
 app.use((req,res)=>{
    console.log(req.url)
res.sendFile(path.join(__dirname,`public/${req.url}`))
})
    sequelize.sync().then(result=>{
   
        app.listen(3000)
    } ).catch(err=>console.log(err))