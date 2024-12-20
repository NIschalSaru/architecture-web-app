"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        unique: true,
      },
      profileImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.ENUM("user", "admin"),
        defaultValue: "user",
      },
      gender: {
        type: Sequelize.ENUM("male", "female", "other"),
        defaultValue: "male",
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      passwordResetToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      passwordChangedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      passwordResetTokenExpiry: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
