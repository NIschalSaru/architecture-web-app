const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const resetPasswordOtp = async () => {
  const otp = crypto.randomInt(100000, 1000000);
  const hashedOtp = await bcrypt.hash(otp.toString(), 10);
  return { otp: otp.toString(), hashedOtp };
};

const generateAccessToken = async (userData, res) => {
  const token = jwt.sign({ userData }, process.env.JWT_SECRET, {
    expiresIn: "4d",
  });

  res.cookie("authToken", token, {
    maxAge: 4 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS attacks, prevent access to this cookie via JavaScript
    sameSite: "strict", // CSRF protection
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};

module.exports = {
  hashPassword,
  comparePassword,
  resetPasswordOtp,
  generateAccessToken,
};
