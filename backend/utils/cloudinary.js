import cloudinary from "cloudinary"
import dotenv from "dotenv"
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.CLOUD_KEY,
});

console.log("cloud_name =>" , cloudinary.config().cloud_name);
console.log("api_key =>" , cloudinary.config().api_key);
console.log("api_secret =>" , cloudinary.config().api_secret);


const cloudinaryUploadImg = async (fileToUploads) => {
  console.log("fileToUploads =>", fileToUploads);
  return new Promise((resolve) => {
    cloudinary.uploader.upload(fileToUploads, (result) => {
      
      console.log("result =>", result);
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};
const cloudinaryDeleteImg = async (fileToDelete) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(fileToDelete, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};

export { cloudinaryUploadImg, cloudinaryDeleteImg };
