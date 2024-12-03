"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("sup3r4dmin", 10);
    await queryInterface.bulkInsert("Users", [
      {
        fullName: "SuperAdmin",
        email: "sarunischal2424@gmail.com",
        phoneNumber: "9823123121",
        password: hashedPassword,
        role: "admin",
        gender: "male",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        passwordResetToken: null,
        passwordChangedAt: null,
        passwordResetTokenExpiry: null,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
