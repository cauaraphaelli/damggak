const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('users',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    namedb:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    logindb:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    passworddb:{
        type: Sequelize.STRING,
        allowNull: false,
    }
});

//Cria a tabela se ela n existir     
User.sync();

module.exports = User;
