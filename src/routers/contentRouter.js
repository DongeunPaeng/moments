import express from "express";
import {
  getUpload,
  postUpload,
  deleteVideo,
} from "../controllers/contentController";
import multer from "multer";

const contentRouter = express.Router();
const upload = multer({ dest: "src/uploads/videos/" });

contentRouter.get("/upload", getUpload);
contentRouter.post("/upload", upload.single("content"), postUpload);
contentRouter.get("/delete-video/:id", deleteVideo);

export default contentRouter;
