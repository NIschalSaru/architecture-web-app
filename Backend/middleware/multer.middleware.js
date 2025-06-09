const multer = require("multer");
const path = require("path");
const fs = require("fs");
const dayjs = require("dayjs");
const crypto = require("crypto");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const folderName = dayjs().format("YYYYMMDD");
//     const folderPath = path.join(__dirname, `../storage/uploads/${folderName}`);

//     try {
//       fs.mkdirSync(folderPath, { recursive: true });
//       cb(null, folderPath);
//     } catch (err) {
//       cb(err);
//     }
//   },

//   filename: function (req, file, cb) {
//     const timestamp = dayjs().format("YYYYMMDDHHmmss");
//     const ext = path.extname(file.originalname);
//     const randomStr = crypto.randomBytes(6).toString("hex");
//     const filename = `${timestamp}_${randomStr}${ext}`;
//     cb(null, filename);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "image/jpeg",
//     "image/png",
//     "image/gif",
//     "image/webp",
//     "application/pdf",
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   ];

//   if (!allowedTypes.includes(file.mimetype)) {
//     return cb(new Error("Only image and document files are allowed"), false);
//   }

//   cb(null, true);
// };

// const limits = {
//   fileSize: 5 * 1024 * 1024,
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits,
// });

// const uploadImages = upload.fields([
//   { name: "image", maxCount: 1 },
//   { name: "gallery", maxCount: 10 },
//   { name: "file", maxCount: 1 },
//   { name: "documents", maxCount: 5 },
// ]);

// module.exports = { uploadImages };



// 1. Define max sizes per field (in bytes)
const MAX_SIZES = {
  image: 2 * 1024 * 1024, // 2MB
  gallery: 2 * 1024 * 1024, // 2MB per image
  file: 5 * 1024 * 1024, // 5MB
  documents: 5 * 1024 * 1024, // 5MB per document
  video: 50 * 1024 * 1024, // 50MB
};

// 2. Define allowed MIME types per field
const allowedTypes = {
  image: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  gallery: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  file: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  documents: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  video: ["video/mp4"],
};

// 3. Setup multer disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderName = dayjs().format("YYYYMMDD");
    const folderPath = path.join(__dirname, `../storage/uploads/${folderName}`);

    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },

  filename: function (req, file, cb) {
    const timestamp = dayjs().format("YYYYMMDDHHmmss");
    const ext = path.extname(file.originalname);
    const randomStr = crypto.randomBytes(6).toString("hex");
    const filename = `${timestamp}_${randomStr}${ext}`;
    cb(null, filename);
  },
});

// 4. File filter (type checking only — size validated later)
const fileFilter = (req, file, cb) => {
  const field = file.fieldname;
  const mimetype = file.mimetype;

  const isValid = allowedTypes[field]?.includes(mimetype);
  if (!isValid) {
    return cb(new Error(`Invalid file type for field "${field}"`), false);
  }

  cb(null, true);
};

// 5. Global limit to avoid abuse (optional — large enough to fit the biggest file)
const limits = {
  fileSize: 100 * 1024 * 1024, // 100MB
};

// 6. Multer setup
const upload = multer({
  storage,
  fileFilter,
  limits,
});

// 7. Upload fields config
const uploadImages = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "gallery", maxCount: 10 },
  { name: "file", maxCount: 1 },
  { name: "documents", maxCount: 5 },
  { name: "video", maxCount: 1 },
]);

// 8. Post-upload size validation middleware
const validateFileSizes = (req, res, next) => {
  const checkSize = (fieldName, maxSize) => {
    const files = req.files[fieldName] || [];
    for (let file of files) {
      const stats = fs.statSync(file.path);
      if (stats.size > maxSize) {
        return `${fieldName} file "${file.originalname}" exceeds ${
          maxSize / 1024 / 1024
        }MB limit`;
      }
    }
    return null;
  };

  const errors = Object.entries(MAX_SIZES)
    .map(([field, max]) => checkSize(field, max))
    .filter(Boolean);

  if (errors.length > 0) {
    return res.status(400).json({ message: errors[0] });
  }

  next();
};

module.exports = { uploadImages, validateFileSizes };
