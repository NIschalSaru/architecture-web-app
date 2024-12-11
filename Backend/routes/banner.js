const router = require("express").Router();
const {
  createOrUpdateBanner,
  getBannersById,
  updateBanner,
  deleteBanner,
  getRecentBanner,
} = require("../controllers/banner.controller.js");
const ProtectRoute = require("../middleware/protect.route.js");

// const { uploadAndStoreImage } = require("../helper/utils/cloudinary");

router.post("/", ProtectRoute, createOrUpdateBanner);
// router.get("/", ProtectRoute, getRecentBanner);
// router.get("/:id", ProtectRoute, getBannersById);
// router.put("/:id", ProtectRoute, updateBanner);
// router.delete("/:id", ProtectRoute, deleteBanner);

module.exports = router;
