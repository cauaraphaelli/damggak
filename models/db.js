const Sequelize = require('sequelize');

const sequelize = new Sequelize("db1","root","Aa!1123456",{
    host:'localhost',
    dialect: 'mysql'});


sequelize.authenticate()
.then(function(){
    console.log("Conexão com sucesso")
}).catch(function(){
    console.log("erro conexão não realizada")
})
    module.exports = sequelize;
