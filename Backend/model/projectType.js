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
      type: DataTypes.STRING,
      defaultValue: "active",
    },
  },
  {
    tableName: "project_types",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = ProjectType;
