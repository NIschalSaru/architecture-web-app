const multer = require("multer");
// const fs = require("fs");

// const uploadDirectory = "./public/uploads";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log("Saving file to:", uploadDirectory);
//     return cb(null, "./public/uploads");
//   },
//   filename: function (req, file, cb) {
//     console.log("Processing file:", file.originalname);
//     return cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "application/pdf" ||
//     file.mimetype === "application/msword" ||
//     file.mimetype ===
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//   ) {
//     return cb(null, true);
//   } else {
//     return cb(
//       new Error(
//         "Invalid file type. Only JPG, JPEG, PNG, PDF, DOC, DOCX are allowed."
//       ),
//       false
//     );
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
// });

// module.exports = { upload };

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    return cb(null, true);
  },
});

const multipleFileUpload = upload.array("images", 5);
// router.post("/multiple", ProtectRoute, multipleFileUpload, createMultipleTestimonials); for multiple file upload

module.exports = { upload, multipleFileUpload };
