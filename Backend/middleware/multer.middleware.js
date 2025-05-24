const multer = require("multer");
const path = require("path");
const fs = require("fs");
const dayjs = require("dayjs");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderName = dayjs().format("YYYYMMDD");
    const folderPath = path.join(__dirname, `../storage/uploads/${folderName}`);

    try {
      fs.mkdirSync(folderPath, { recursive: true });
      cb(null, folderPath);
    } catch (err) {
      cb(err);
    }
  },

  filename: function (req, file, cb) {
    const timestamp = dayjs().format("YYYYMMDDHHmmss");
    const ext = path.extname(file.originalname);
    const randomStr = crypto.randomBytes(6).toString("hex");
    const filename = `${timestamp}_${randomStr}${ext}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"), false);
  }
  cb(null, true);
};

const limits = {
  fileSize: 2 * 1024 * 1024,
};

const upload = multer({
  storage,
  fileFilter,
  limits,
});

const uploadImages = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "gallery", maxCount: 10 },
]);

module.exports = { uploadImages };
