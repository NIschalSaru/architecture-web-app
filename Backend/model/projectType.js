const { DataTypes } = require("sequelize");
const { sequelizeInstance } = require("../database/databaseConnection.js");

const ProjectType = sequelizeInstance.define(
  "ProjectType",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "Project_type",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = ProjectType;
