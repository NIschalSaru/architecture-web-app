const jwt = require("jsonwebtoken");
const User = require("../model/user.js");
class ProtectRoute {
  static async authorize(req, res, next) {
    try {
      const token = req.cookies.authToken;
      if (!token) {
        return res
          .status(401)
          .json({ message: "Session expired. Please log in again." });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded)
        return res
          .status(401)
          .json({ message: "Session expired. Please log in again." });

      const user = await User.findOne({
        where: { id: decoded.userData.id },
        attributes: { exclude: ["password"] },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = ProtectRoute;
