const router = require("express").Router();
const {
  createOrUpdateBanner,
  getBanner,
} = require("../controllers/banner.controller.js");
const ProtectRoute = require("../middleware/protect.route.js");
const {
  upload,
  multipleFileUpload,
} = require("../middleware/multer.middleware.js");

router.post("/", ProtectRoute, upload.single("imageUrl"), createOrUpdateBanner);
router.get("/", getBanner);
// router.get("/:id", ProtectRoute, getBannersById);
// router.put("/:id", ProtectRoute, updateBanner);
// router.delete("/:id", ProtectRoute, deleteBanner);

module.exports = router;
