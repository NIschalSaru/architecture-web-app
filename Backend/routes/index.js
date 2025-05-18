const express = require("express");
const router = express.Router();
const bannerRoutes = require("./banner.js");
const testimonialRoutes = require("./testimonial.js");
const authRoutes = require("./auth.js");
const contactUsRoutes = require("./contactUs.js");
const projectTypeRoutes = require("./project.js");

router.use("/banner", bannerRoutes);
router.use("/testimonial", testimonialRoutes);
router.use("/auth", authRoutes);
router.use("/send-mail", contactUsRoutes);
router.use("/project-type", projectTypeRoutes);

module.exports = router;
