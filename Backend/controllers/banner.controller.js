const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");
const Banner = require("../model/banner.js");
const { asyncHandler } = require("../services/async.handler.js");
const { uploadSingleImage, deleteImage } = require("../services/cloudinary.js");

const createOrUpdateBanner = asyncHandler(async (req, res) => {
  const { heading, subHeading, description } = req.body;
  let imagePath = null;
  let imageUrl = null;
  const banner = await Banner.findOne();
  const uploadedImage = req.files?.image?.[0];
  if (uploadedImage) {
    if (banner) {
      if (banner.filepath) {
        const sanitizedPath = banner.filepath.replace(/^\/+/, "");
        const oldLocalPath = path.join(
          __dirname,
          "..",
          "storage",
          sanitizedPath
        );
        if (fs.existsSync(oldLocalPath)) {
          fs.unlinkSync(oldLocalPath);
        }
      }
      if (banner.imageUrl) {
        try {
          await deleteImage(banner.imageUrl);
        } catch (err) {
          console.error("Cloudinary deletion failed:", err.message);
        }
      }
    }
    const folderName = dayjs().format("YYYYMMDD");
    imagePath = `/uploads/${folderName}/${uploadedImage.filename}`;
    const fullLocalPath = path.join(__dirname, "..", "storage", imagePath);
    try {
      const fileBuffer = fs.readFileSync(fullLocalPath);
      imageUrl = await uploadSingleImage(fileBuffer, uploadedImage.filename);
    } catch (err) {
      return res.status(500).json({
        message: "Cloudinary upload failed",
        error: err.message,
      });
    }
  }
  if (banner) {
    banner.heading = heading;
    banner.subHeading = subHeading;
    banner.description = description;
    if (imagePath) {
      banner.filepath = imagePath;
      banner.filename = uploadedImage.filename;
    }
    if (imageUrl) {
      banner.imageUrl = imageUrl;
    }
    await banner.save();
    return res.status(200).json({
      message: "Banner updated successfully",
      data: banner,
    });
  }
  const newBanner = await Banner.create({
    heading,
    subHeading,
    description,
    filename: uploadedImage?.filename || null,
    filepath: imagePath || null,
    imageUrl: imageUrl || null,
  });
  return res.status(201).json({
    message: "Banner created successfully",
    data: newBanner,
  });
});

const getBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findOne();
  if (banner) {
    return res.status(200).json({ success: true, data: banner });
  } else {
    return res
      .status(404)
      .json({ success: false, message: "No recent banner found" });
  }
});

module.exports = {
  createOrUpdateBanner,
  getBanner,
};
