const { DataTypes } = require("sequelize");
const db = require("./dbSQL");

const Room = db.define("salas", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
  },
  capacidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  imagem: {
    type: DataTypes.STRING(255),
  },
  disponivel: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  tableName: 'salas',
  timestamps: false 
});

module.exports = Room;