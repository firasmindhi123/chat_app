const express=require('express')
const path =require('path')
const bodyparse=require('body-parser')
const root_dir=require('./util/path')
const sequelize=require('./util/database')
const user_router=require('./router/router_user')
const group_router=require('./router/router_group')
const cors= require('cors')
const authenticate_user=require('./authentication')
const user_model=require('./model/model_user')
const chat_model=require('./model/model_chat')
const model_group=require('./model/model_group')
 const app=express()
 app.use(bodyparse.urlencoded({extended:false}))
app.use(bodyparse.json())
app.use(cors({origin:'*'}))
app.use(express.static(path.join(__dirname,'public')))

 
 
app.use('/user',user_router)
app.use('/group',group_router)
 app.use((req,res)=>{
    console.log(req.url)
    
res.sendFile(path.join(__dirname,`public/${req.url}`))
})

 user_model.hasMany(chat_model)
 chat_model.belongsTo(user_model)

 model_group.hasMany(chat_model)
 chat_model.belongsTo(model_group)

 user_model.belongsToMany(model_group,{ through: 'user_table' } )
 model_group.belongsToMany(user_model,{through:'user_table'})

    sequelize.sync().then(result=>{
   
        app.listen(3000)
    } ).catch(err=>console.log(err))