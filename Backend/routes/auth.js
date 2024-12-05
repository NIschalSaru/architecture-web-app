const express = require("express");
const AuthController = require("../controllers/auth.controller.js");
const router = express.Router();
const { upload } = require("../middleware/multer.middleware.js");
const ProtectRoute = require("../middleware/protect.route.js");

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.post("/logout", ProtectRoute, AuthController.logout);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);
router.put(
  "/edit-profile/:id",
  ProtectRoute,
  upload.single("profile-image"),
  AuthController.editProfile
);

module.exports = router;
