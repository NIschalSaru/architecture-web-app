// const cloudinary = require("cloudinary").v2;
// const ApiError = require("../errors/ApiError");
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// function extractPublicIdFromCloudinaryURL(url, folderName) {
//   try {
//     const array = url.split(folderName);
//     const pid = array.splice(-1);
//     const path = pid[0].split(".")[0];

//     return folderName + path;
//   } catch (error) {
//     console.error("Error extracting path:", error);
//     return null;
//   }
// }

// const folderName = "uploads";
// // Function to upload image in base64 format to Cloudinary and store the URL in the database
// function uploadAndStoreImage(req, res, next) {
//   const { imageUrl, title } = req.body;
//   try {
//     const imageBuffer = Buffer.from(imageUrl, "base64");
//     cloudinary.uploader
//       .upload_stream(
//         { resource_type: "image", folder: folderName, public_id: title },
//         (error, result) => {
//           if (error) {
//             console.error("Error uploading image:", error);
//             return res.status(500).json({ error: "Error uploading image" });
//           } else {
//             console.log("Image uploaded successfully");
//             req.body.imageUrl = result.secure_url;
//             next();
//           }
//         }
//       )
//       .end(imageBuffer);
//   } catch (error) {
//     console.error("Unexpected error:", error);
//     res
//       .status(500)
//       .json({ error: "Unexpected error occurred while uploading image" });
//   }
// }

// async function uploadAndStoreImageArray(imageUrl, title) {
//   return new Promise((resolve, reject) => {
//     try {
//       // Decode base64 image data
//       const imageBuffer = Buffer.from(imageUrl, "base64");
//       // Upload image to Cloudinary
//       cloudinary.uploader
//         .upload_stream(
//           { resource_type: "image", folder: folderName, public_id: title },
//           (error, result) => {
//             if (error) {
//               console.error("Error uploading image:", error);
//               reject("Error uploading image");
//             } else {
//               console.log("Image uploaded successfully");
//               resolve(result.secure_url);
//             }
//           }
//         )
//         .end(imageBuffer);
//     } catch (error) {
//       console.error("Unexpected error:", error);
//       reject("Unexpected error occurred while uploading image");
//     }
//   });
// }

// async function deleteImage(imageUrl) {
//   try {
//     const iamgePublicId = extractPublicIdFromCloudinaryURL(
//       imageUrl,
//       folderName
//     );

//     let resp = await cloudinary.uploader.destroy(
//       iamgePublicId,
//       (error, result) => {
//         if (error) {
//           console.error("Error deleting image:", error);
//           return false;
//         }
//         console.log("Image deleted successfully:", result);
//         return true;
//       }
//     );
//     return resp;
//   } catch (error) {
//     console.error("Unexpected error:", error);
//     throw new Error("Unexpected error occurred while deleting image");
//   }
// }
// module.exports = { uploadAndStoreImage, uploadAndStoreImageArray, deleteImage };
