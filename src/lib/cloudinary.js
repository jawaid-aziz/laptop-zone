import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "ddormxjjr",
  api_key: "399343757767651",
  api_secret: "qgHUhtBaMTYl69OMOst1hgE7_6g",
  secure: true, // ensures HTTPS
});

export default cloudinary;
