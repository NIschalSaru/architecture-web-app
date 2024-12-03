// const mongoose = require("mongoose");

// class MongoDBConnection {
//   static async connect() {
//     try {
//       await mongoose.connect(process.env.MONGO_DB_URI);
//       console.log("Connected to MongoDB");
//     } catch (error) {
//       console.log("Error connecting to MongoDB", error.message);
//     }
//   }
// }

// export default MongoDBConnection;

const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelizeInstance = new Sequelize(process.env.DATABASE_URI, {
  dialect: "postgres",
  dialectOptions: {
    ssl:
      process.env.NODE_ENV === "production"
        ? { require: true, rejectUnauthorized: false }
        : false,
  },
  // logging: console.log,
});

module.exports = { sequelizeInstance };
