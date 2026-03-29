const Sequelize = require("sequelize");
const sequelize = new Sequelize("reservas", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
});

sequelize.authenticate()
.then(function(){
console.log('Conexão Realizada com sucesso')
}).catch(function(){
    console.log('Error')
})

module.exports = sequelize;
 