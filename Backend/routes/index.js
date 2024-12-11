const express = require("express");
const router = express.Router();

const bannerRoutes = require("./banner.js");
const testimonialRoutes = require("./testimonial.js");
const authRoutes = require("./auth.js");
// const mailRoutes = require("./sendMailRoutes");

router.use("/banner", bannerRoutes);
router.use("/testimonial", testimonialRoutes);
router.use("/auth", authRoutes);
// router.use("/email", mailRoutes);

// const {getAllFields} = require("../controller/homePageController");
// router.get("/home", getAllFields);

module.exports = router;
