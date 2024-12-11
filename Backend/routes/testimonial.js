const router = require("express").Router();
const {
  createTestimonial,
  getAllTestimonials,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonial.controller.js");
const ProtectRoute = require("../middleware/protect.route.js");

router.post("/", ProtectRoute, createTestimonial);
router.get("/", ProtectRoute, getAllTestimonials);
// router.get('/:id', getTestimonialById);
router.put("/:id", ProtectRoute, updateTestimonial);
router.delete("/:id", ProtectRoute, deleteTestimonial);

module.exports = router;
