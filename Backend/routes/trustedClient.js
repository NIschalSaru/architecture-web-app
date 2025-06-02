const router = require("express").Router();
const {
  createTrustedClient,
  getAllTrustedClients,
  updateTrustedClient,
  deleteTrustedClient,
} = require("../controllers/trustedClient.controller.js");
const ProtectRoute = require("../middleware/protect.route.js");
const { uploadImages } = require("../middleware/multer.middleware.js");

router.post("/", ProtectRoute, uploadImages, createTrustedClient);
router.get("/", getAllTrustedClients);
router.put("/:id", ProtectRoute, uploadImages, updateTrustedClient);
router.delete("/:id", ProtectRoute, deleteTrustedClient);

module.exports = router;
