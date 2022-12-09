const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB,process.env.USER,process.env.PASS,{
    host:process.env.HOST,
    dialect: 'mysql'});


sequelize.authenticate()
.then(function(){
    console.log("Conexão com sucesso")
}).catch(function(){
    console.log("erro conexão não realizada")
})
    module.exports = sequelize;
