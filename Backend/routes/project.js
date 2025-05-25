const router = require("express").Router();
const {
  createProjectType,
  getAllProjectTypes,
  updateProjectType,
  deleteProjectType,
} = require("../controllers/project/projectType.controller.js");

const {
  createProject,
  updateProject,
  deleteProject,
  getClientByProjectTypeId,
  getProjectByClientId,
  deleteMediaById,
} = require("../controllers/project/project.controller.js");
const ProtectRoute = require("../middleware/protect.route.js");
const { uploadImages } = require("../middleware/multer.middleware.js");

// Project Type Routes
router.post("/project-types/", ProtectRoute, createProjectType);
router.get("/project-types/", getAllProjectTypes);
router.put("/project-types/:id", ProtectRoute, updateProjectType);
router.delete("/project-types/:id", ProtectRoute, deleteProjectType);

// Project Routes
router.post("/", ProtectRoute, uploadImages, createProject);
router.put("/:id", ProtectRoute, uploadImages, updateProject);
router.delete("/:id", ProtectRoute, deleteProject);
router.delete("/media/:id", ProtectRoute, deleteMediaById);
router.get("/get-clients/:project_type_id", getClientByProjectTypeId);
router.get("/get-project/:client_id", getProjectByClientId);

module.exports = router;
