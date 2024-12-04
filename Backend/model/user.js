// models/user.js
const { DataTypes, Model } = require("sequelize");
const { sequelizeInstance } = require("../database/databaseConnection.js");

class User extends Model {}

User.init(
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: false,
    },
    passwordChangedAt: {
      type: DataTypes.DATE,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
    },
    passwordResetTokenExpiry: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "User",
    tableName: "Users",
    timestamps: true,
  }
);

module.exports = User;
