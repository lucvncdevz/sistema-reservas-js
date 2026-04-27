const Sequelize = require("sequelize");
const sequelize = new Sequelize("reservas", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3330
});

sequelize.authenticate()
.then(function(){
console.log('Conexão Realizada com sucesso')
}).catch(function(){
    console.log('Error')
})

module.exports = sequelize;
 