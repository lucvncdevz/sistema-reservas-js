const Sequelize = require("sequelize");
const db = require("./dbSQL");

const user = db.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [6, 100], 
    },
  },
});

//user.sync({force: true});

module.exports = user;
