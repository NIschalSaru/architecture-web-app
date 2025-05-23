const {
  uploadSingleImage,
  deleteImage,
} = require("../middleware/cloudinary.js");
const Banner = require("../model/banner.js");
const { asyncHandler } = require("../services/async.handler.js");

const createOrUpdateBanner = asyncHandler(async (req, res) => {
  const { heading, subHeading } = req.body;
  let imagePath = null;
  let title = `banner_${Date.now()}`;

  let result = await Banner.findOne();

  if (req.file) {
    if (result && result.imageUrl) {
      await deleteImage(result.imageUrl);
    }
    imagePath = await uploadSingleImage(req.file.buffer, title);
  }

  if (result) {
    result.heading = heading;
    result.subHeading = subHeading;
    if (imagePath) {
      result.imageUrl = imagePath;
    }
    await result.save();
    return res.status(200).json({
      message: "Banner updated successfully",
      data: result,
    });
  }

  result = await Banner.create({
    imageUrl: imagePath,
    heading,
    subHeading,
  });

  return res.status(201).json({
    message: "Banner created successfully",
    data: result,
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

// const getAllBanners = asyncHandler(async (req, res) => {
//   const banners = await Banner.findAll();
//   if (!banners) {
//     return res.status(400).json({ error: "Data not found" });
//   }

//   res.status(200).json({
//     message: "Data fetched successfully",
//     data: banners,
//   });
// });

// const getBannersById = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const banner = await Banner.findByPk(id);

//   if (!banner) {
//     return res.status(404).json({ error: "Data not found!" });
//   }

//   return res.status(200).json({
//     message: "Data fetched successfully",
//     data: banner,
//   });
// });

// const updateBanner = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { imageUrl, heading, subHeading } = req.body;
//   const banner = await Banner.findByPk(id);
//   if (!banner) {
//     return res.status(404).json({ success: false, message: "Data not found" });
//   }
//   const update = await banner.update({
//     imageUrl,
//     heading,
//     subHeading,
//   });
//   return res.status(update ? 200 : 400).json({
//     message: update ? "Data updated successfully" : "Update failed",
//   });
// });

// const deleteBanner = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const banner = await Banner.findByPk(id);

//     if (!banner) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Internal Server Error!" });
//     }
//     // let imageDeleteFromCloud = await deleteImage(banner.imageUrl);
//     // if (!imageDeleteFromCloud) {
//     //   return res
//     //     .status(404)
//     //     .json({ success: false, message: "Banner not found" });
//     // }
//     await banner.destroy();
//     return res
//       .status(200)
//       .json({ success: true, message: "Data deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting banner:", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error" });
//   }
// };

// module.exports = {
//   createOrUpdateBanner,
//   //   getAllBanners,
//   //   getRecentBanner,
//   //   getBannersById,
//   //   updateBanner,
//   //   deleteBanner,
// };
