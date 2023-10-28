
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const expense= sequelize.define('chat', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  message: {
    type:Sequelize.STRING,
   
    
},
  
});



module.exports =expense;
