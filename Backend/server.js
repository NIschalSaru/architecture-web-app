const express = require("express");
const authRoutes = require("./routes/auth.js");
// const MongoDBConnection = require("./database/connectToMongoDB.js");
const { sequelizeInstance } = require("./database/databaseConnection.js");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);

sequelizeInstance
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err.message);
  });
