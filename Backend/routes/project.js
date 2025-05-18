const router = require("express").Router();
const {
  createProjectType,
  getAllProjectTypes,
  updateProjectType,
  deleteProjectType,
  updateStatus,
} = require("../controllers/project/projectType.controller.js");

const {
  createProject,
  updateProject,
  deleteProject,
  getClientByProjectTypeId,
  getProjectByClientId,
} = require("../controllers/project/project.controller.js");
const ProtectRoute = require("../middleware/protect.route.js");

// Project Type Routes
router.post("/project-types/", ProtectRoute, createProjectType);
router.get("/project-types/", getAllProjectTypes);
router.put("/project-types/:id", ProtectRoute, updateProjectType);
router.delete("/project-types/:id", ProtectRoute, deleteProjectType);

// Project Routes
router.post("/", ProtectRoute, createProject);
router.put("/:id", ProtectRoute, updateProject);
router.delete("/:id", ProtectRoute, deleteProject);
router.get("/get-clients/:project_type_id", getClientByProjectTypeId);
router.get("/get-project/:client_id", getProjectByClientId);

module.exports = router;
