const {
  uploadSingleImage,
  deleteImage,
} = require("../middleware/cloudinary.js");
const Banner = require("../model/banner.js");
const { asyncHandler } = require("../services/async.handler.js");

const createOrUpdateBanner = asyncHandler(async (req, res) => {
  const { heading, subHeading, description } = req.body;
  console.log("req.body", req.body);

  let imagePath = null;
  const title = `banner_${Date.now()}`;

  let banner = await Banner.findOne();

  if (req.file) {
    if (banner && banner.imageUrl) {
      await deleteImage(banner.imageUrl);
    }
    imagePath = await uploadSingleImage(req.file.buffer, title);
  }

  if (banner) {
    banner.heading = heading;
    banner.subHeading = subHeading;
    banner.description = description;
    if (imagePath) {
      banner.imageUrl = imagePath;
    }
    await banner.save();
    return res.status(200).json({
      message: "Banner updated successfully",
      data: banner,
    });
  }

  banner = await Banner.create({
    imageUrl: imagePath,
    heading,
    subHeading,
    description,
  });

  return res.status(201).json({
    message: "Banner created successfully",
    data: banner,
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
