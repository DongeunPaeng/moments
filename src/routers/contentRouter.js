import express from "express";
import { getUpload, postUpload } from "../controllers/contentController";
import multer from "multer";

const contentRouter = express.Router();
const upload = multer({ dest: "src/uploads/videos/" });

contentRouter.get("/upload", getUpload);
contentRouter.post("/upload", upload.single("content"), postUpload);

export default contentRouter;