const router = require("express").Router();
const {
  createTestimonial,
  getAllTestimonials,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonial.controller.js");
const ProtectRoute = require("../middleware/protect.route.js");
const {
  upload,
  multipleFileUpload,
} = require("../middleware/multer.middleware.js");

router.post("/", ProtectRoute, upload.single("imageUrl"), createTestimonial);
router.get("/", getAllTestimonials);
// router.get('/:id', getTestimonialById);
router.put("/:id", ProtectRoute, upload.single("imageUrl"), updateTestimonial);
router.delete("/:id", ProtectRoute, deleteTestimonial);

module.exports = router;
