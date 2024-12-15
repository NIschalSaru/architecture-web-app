const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelizeInstance = new Sequelize(process.env.DATABASE_URI, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

module.exports = { sequelizeInstance };
