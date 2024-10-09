import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// import dotenv from "dotenv";

// dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadImageOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return;
    const result = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath);
    return result;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.log("Error occure in cloudinary file", error);
    return null;
  }
};

export { uploadImageOnCloudinary };
