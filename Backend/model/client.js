const { DataTypes } = require("sequelize");
const { sequelizeInstance } = require("../database/databaseConnection.js");

const Client = sequelizeInstance.define(
  "Client",
  {
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    mobile: {
      type: DataTypes.STRING,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "clients",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Client;
