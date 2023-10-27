
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const expense= sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type:Sequelize.STRING,
   
    
},
  email: {
    type: Sequelize.STRING,
    unique:true
    
    
  },
  phone:{
    type:Sequelize.STRING,
    unique:true
  },
  password:{
    type:Sequelize.STRING,
   
  },
  
});



module.exports =expense;
