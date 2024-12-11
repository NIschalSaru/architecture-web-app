const User = require("../model/user.js");
const {
  hashPassword,
  comparePassword,
  generateAccessToken,
  resetPasswordOtp,
  generateResetPasswordToken,
} = require("../services/auth.service.js");
const SignupValidator = require("../validators/validator.js");
const { asyncHandler } = require("../services/async.handler.js");
const EmailService = require("../services/email.service.js");
const jwt = require("jsonwebtoken");

const signup = asyncHandler(async (req, res) => {
  const validator = new SignupValidator(req);
  const errors = await validator.validate();

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const { fullName, phoneNumber, password, gender, email, role } = req.body;

  const hashedPassword = await hashPassword(password);
  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?userName=${phoneNumber}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?phoneNumber=${phoneNumber}`;

  const newUser = await User.create({
    fullName,
    phoneNumber,
    password: hashedPassword,
    gender,
    role,
    profileImage: gender === "male" ? boyProfilePic : girlProfilePic,
    email,
  });

  const payload = { id: newUser.id, email: newUser.email };
  const token = await generateAccessToken(payload, res);

  res.status(201).json({
    id: newUser.id,
    fullName: newUser.fullName,
    email: newUser.email,
    Token: token,
    message: "User created successfully",
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const payload = { id: user.id, email: user.email };
  const token = await generateAccessToken(payload, res);

  res.status(200).json({
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    profilePic: user.profilePic,
    message: "Login successful",
  });
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("authToken", "", { maxAge: 0 });
  res.status(200).json({ message: "Logout successful" });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { otp, hashedOtp } = await resetPasswordOtp();
  const ResetTokenExpiry = Date.now() + 5 * 60 * 1000;
  const token = await generateResetPasswordToken(user.email, otp);

  try {
    const resetPasswordLink = `http://localhost:5000/api/architecture-web-app/auth/reset-password?token=${token}`;

    const sentEmail = await EmailService.sendMail(
      user.email,
      "OTP for Password Reset",
      `Click the link below to reset your password:\n\n${resetPasswordLink}`
    );

    if (sentEmail) {
      user.passwordResetToken = hashedOtp;
      user.passwordResetTokenExpiry = ResetTokenExpiry;
      await user.save();
      res.status(200).json({ message: "Reset password OTP sent successfully" });
    }
  } catch (error) {
    console.error("Email sending error:", error.message);
    res.status(500).json({ message: "Failed to send email" });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email, otp } = decoded;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isOTPCorrect = await comparePassword(otp, user.passwordResetToken);
    const isTokenExpired = user.passwordResetTokenExpiry < Date.now();

    if (!isOTPCorrect || isTokenExpired) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    user.password = await hashPassword(password);
    user.passwordResetToken = null;
    user.passwordResetTokenExpiry = null;
    user.passwordChangedAt = Date.now();
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid or expired token." });
  }
});

const editProfile = asyncHandler(async (req, res) => {
  const validator = new SignupValidator(req);
  const errors = await validator.validate();

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const userId = req.params.id;
  const { fullName, phoneNumber, email, password, confirmPassword, gender } =
    req.body;

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const updatedFields = {};

  if (fullName) updatedFields.fullName = fullName;
  if (phoneNumber) updatedFields.phoneNumber = phoneNumber;
  if (email) updatedFields.email = email;
  if (gender) updatedFields.gender = gender;

  if (req.file) {
    updatedFields.profileImage = `/uploads/${req.file.filename}`;
  }

  if (password || confirmPassword) {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    updatedFields.password = await hashPassword(password);
  }

  const updatedUser = await user.update(updatedFields);

  res.status(200).json({
    id: updatedUser.id,
    fullName: updatedUser.fullName,
    message: "Data updated successfully",
  });
});

module.exports = {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  editProfile,
};
