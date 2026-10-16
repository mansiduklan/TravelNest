const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} =  require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_Key,
    api_secret: process.env.CLOUD_API_Secret
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "travelnest_store",
    allowedFormats: ["png","jpg","jpeg"],
  },
});

module.exports = {
    cloudinary, storage
}