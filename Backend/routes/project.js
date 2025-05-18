const router = require("express").Router();
const {
  createProjectType,
  getAllProjectTypes,
  updateProjectType,
  deleteProjectType,
  updateStatus,
} = require("../controllers/project/projectType.controller.js");
const ProtectRoute = require("../middleware/protect.route.js");

//Project Type Routes
router.post("/", ProtectRoute, createProjectType);
router.get("/", getAllProjectTypes);
router.put("/:id", ProtectRoute, updateProjectType);
router.delete("/:id", ProtectRoute, deleteProjectType);
// router.put("/:id", ProtectRoute, updateStatus);

module.exports = router;
