import express from "express";
import {
  getUpload,
  postUpload,
  deleteVideo,
  getEditVideo,
  postView,
} from "../controllers/contentController";
import multer from "multer";

const contentRouter = express.Router();
const upload = multer({ dest: "src/uploads/videos/" });

contentRouter.get("/upload", getUpload);
contentRouter.post("/upload", upload.single("content"), postUpload);
contentRouter.get("/delete-video/:id", deleteVideo);
contentRouter.get("/edit-video/:id", getEditVideo);
contentRouter.post("/:url/view", postView);

export default contentRouter;
