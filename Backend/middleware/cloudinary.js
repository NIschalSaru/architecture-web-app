const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const folderName = "uploads";

async function uploadSingleImage(fileBuffer, title) {
  if (!fileBuffer) {
    throw new Error("File buffer is required for upload.");
  }

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          folder: folderName,
          public_id: title,
        },
        (error, result) => {
          if (error) {
            console.error("Error uploading image:", error.message);
            return reject("Failed to upload image.");
          }
          console.log("Image uploaded successfully:", result.secure_url);
          resolve(result.secure_url);
        }
      )
      .end(fileBuffer);
  });
}

// Function to upload multiple images using file buffers
async function uploadMultipleImages(files) {
  if (!Array.isArray(files) || files.length === 0) {
    throw new Error("Invalid input. An array of file is required.");
  }

  const uploadPromises = files.map((file, index) => {
    const title = `image_${Date.now()}_${index + 1}`;
    return uploadSingleImage(file.buffer, title);
  });

  return Promise.all(uploadPromises);
}

function extractPublicIdFromCloudinaryURL(url, folderName) {
  try {
    if (!folderName.endsWith("/")) {
      folderName += "/";
    }

    const publicId = url.split(folderName)[1].split(".")[0];
    return folderName + publicId;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
}

async function deleteImage(imageUrl) {
  try {
    const iamgePublicId = extractPublicIdFromCloudinaryURL(
      imageUrl,
      folderName
    );

    let resp = await cloudinary.uploader.destroy(
      iamgePublicId,
      (error, result) => {
        if (error) {
          console.error("Error deleting image:", error);
          return false;
        }
        console.log("Image deleted successfully:", result);
        return true;
      }
    );
    return resp;
  } catch (error) {
    throw error;
  }
}

module.exports = { uploadSingleImage, uploadMultipleImages, deleteImage };
