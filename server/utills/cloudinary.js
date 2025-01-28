const cloudinary = require("cloudinary").v2;
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImageToCloudinary = async (file, quality = "auto") => {
  if (!file || !file.tempFilePath) {
    throw new Error(
      "Invalid file input. Ensure 'file.tempFilePath' is provided."
    );
  }

  const transformation = [
    { width: 1920, height: 1080, crop: "limit" },
    { quality: quality },
    { fetch_format: "auto" },
  ];

  const options = {
    resource_type: "auto",
    quality,
    transformation,
  };

  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return result.secure_url;
  } catch (error) {
    console.error(
      `Failed to upload file to Cloudinary. File: ${file.tempFilePath}`,
      error
    );
    throw error;
  }
};

exports.deleteFileFromCloudinary = async (fileUrl) => {
  try {
    if (!fileUrl || !fileUrl.includes("/upload/")) {
      throw new Error("Invalid Cloudinary URL format");
    }

    const url = fileUrl.split("/");
    const publicId = url.pop().split(".")[0];
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error.message);
    throw error;
  }
};
