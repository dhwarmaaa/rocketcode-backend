const { DataTypes } = require("sequelize");
const sequelize = require("./db"); // Importa tu instancia de Sequelize

const Persona = sequelize.define("users_test_dharma", {
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  "Segundo Nombre": {
    type: DataTypes.STRING,
    allowNull: true,
  },
  "Apellido Paterno": {
    type: DataTypes.STRING,
    allowNull: false,
  },
  "Apellido Materno": {
    type: DataTypes.STRING,
  },
  "Fecha de Nacimiento": {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Teléfono: {
    type: DataTypes.STRING,
  },
});

Persona.sync(); // Esto crea la tabla en la base de datos si no existe
module.exports = Persona;
