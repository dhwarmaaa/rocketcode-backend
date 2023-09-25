const { Sequelize } = require("sequelize");

const host = "data-avimo.cgriqmyweq5c.us-east-2.rds.amazonaws.com";
const user = "testing";
const password = "Pruebas%ALI%2020";
const BD = "testing_ali_fullstack";

const sequelize = new Sequelize("rocketcode", "root", "Asdfgh-34", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
