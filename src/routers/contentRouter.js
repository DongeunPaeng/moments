import aws from "aws-sdk";
import express from "express";
import multer from "multer";
import multers3 from "multer-s3";
import {
  getUpload,
  postUpload,
  deleteVideo,
  getEditVideo,
  postView,
  postUpdate,
  postTagsUpdate,
  videoDetail,
  addComment,
  deleteComment,
} from "../controllers/contentController";

const contentRouter = express.Router();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

const upload = multer({
  storage: multers3({
    s3,
    bucket: "momentsproject",
    contentType: multers3.AUTO_CONTENT_TYPE,
    acl: "public-read",
  }),
});

contentRouter.get("/upload", getUpload);
contentRouter.post("/upload", upload.single("content"), postUpload);
contentRouter.get("/delete-video/:id", deleteVideo);
contentRouter.get("/edit-video/:id", getEditVideo);
contentRouter.post("/:url/view", postView);
contentRouter.post("/:url/update", postUpdate);
contentRouter.post("/:id/tagsupdate", postTagsUpdate);
contentRouter.get("/:id/detail", videoDetail);
contentRouter.post("/:id/addComment", addComment);
contentRouter.post("/:id/deleteComment", deleteComment);

export default contentRouter;
