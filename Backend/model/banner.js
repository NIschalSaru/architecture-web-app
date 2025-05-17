const { DataTypes } = require("sequelize");
const { sequelizeInstance } = require("../database/databaseConnection.js");

const Banner = sequelizeInstance.define(
  "Banner",
  {
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    heading: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subHeading: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Banners",
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Banner;
