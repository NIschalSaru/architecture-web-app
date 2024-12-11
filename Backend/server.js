const express = require("express");
const { sequelizeInstance } = require("./database/databaseConnection.js");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mainRoutes = require("./routes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/architecture-web-app", mainRoutes);

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
    process.exit(1);
  });

// app.use((err, req, res, next) => {
//   console.error(err);
//   res
//     .status(500)
//     .json({ success: false, message: err.message || "Internal Server Error" });
// });
