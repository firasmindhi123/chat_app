
const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const group = require('./model_group');

const group_table= sequelize.define('grouptable', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  isadmin: {
    type:Sequelize.BOOLEAN,
   
    
},
  
});



module.exports =group_table;
