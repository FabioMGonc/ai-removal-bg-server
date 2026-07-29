import express from "express";
import { removeBGImage } from "../controllers/ImageController.js";
import authUser from "../middlewares/auth.js";
import upload from "../middlewares/Multer.js";

const imageRouter = express.Router();

imageRouter.post("/remove-bg",authUser,upload.single("image"),removeBGImage);

export default imageRouter;
