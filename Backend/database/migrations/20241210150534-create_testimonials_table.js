"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Testimonials", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rating: {
        type: Sequelize.FLOAT,
        validate: {
          max: 5,
          min: 0,
        },
      },
      imageUrl: {
        type: Sequelize.STRING,
      },

      title: {
        type: Sequelize.STRING,
        unique: true,
      },

      message: {
        type: Sequelize.STRING,
      },
      fullname: {
        type: Sequelize.STRING,
      },
      designation: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Testimonials");
  },
};
