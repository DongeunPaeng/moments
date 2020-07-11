import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";
import Fuse from "fuse.js";

export const home = async (req, res) => {
  try {
    const videos = await Video.find().sort({ _id: -1 }).populate("creator");
    res.render("home", { title: "home", videos });
  } catch (error) {
    console.log(error);
  }
};

export const getUpload = (req, res) => {
  res.render("upload", { title: "upload" });
};

export const postUpload = async (req, res) => {
  const {
    file: { location },
    body: { title, description, tags },
  } = req;
  try {
    const newVideo = await Video.create({
      title,
      description,
      tags,
      fileUrl: location,
      creator: req.user.id,
    });
    await User.findById(req.user.id).then((user) => {
      user.videos.push(newVideo.id);
      user.save();
    });
    res.redirect("/");
  } catch (error) {
    req.flash("error", "Can't upload your video...");
    console.log(error);
    res.render("upload");
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
    user,
  } = req;
  try {
    const video = await Video.findById(id).populate("creator");
    if (!user || user.id !== video.creator.id) {
      req.flash("error", "Access denied");
      res.redirect("/");
    } else {
      await Video.findByIdAndRemove(id);
      await User.findOneAndUpdate(
        { videos: video.id },
        { $pull: { videos: video.id } }
      );
      await Comment.deleteMany({ video: video.id });
      req.flash("success", "Video deleted successfully");
      res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

export const getEditVideo = async (req, res) => {
  res.send("edit video");
};

export const postView = async (req, res) => {
  const {
    params: { url },
  } = req;
  try {
    const video = await Video.findOne({
      fileUrl: `https://momentsproject.s3.ap-northeast-2.amazonaws.com/${url}`,
    });
    video.views++;
    video.save();
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(400);
  } finally {
    res.end();
  }
};

export const postUpdate = async (req, res) => {
  const {
    params: { url },
    body: { newContent, type },
  } = req;
  try {
    const video = await Video.findOne({
      fileUrl: `https://momentsproject.s3.ap-northeast-2.amazonaws.com/${url}`,
    });
    video[type] = newContent;
    video.save();
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(400);
  } finally {
    res.end();
  }
};

export const postTagsUpdate = async (req, res) => {
  const {
    params: { id },
    body: { tags },
  } = req;
  try {
    const video = await Video.findByIdAndUpdate(id, {
      tags,
    });
    video.save();
    res.status(200);
  } catch (err) {
    console.log(err);
    req.flash("error", "Can't update...");
    res.status(400);
  } finally {
    res.end();
  }
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id).populate("creator");
    const comment = await Comment.find({ video })
      .sort({ _id: -1 })
      .populate("writer");
    res.render("videoDetail", { title: "video", video, comment });
  } catch (err) {
    console.log(err);
    req.flash("error", "Oops! Something happened...");
    res.redirect("/");
  }
};

export const addComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
  } = req;
  try {
    const user = await User.findById(req.user.id);
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      writer: user,
      video,
    });
    video.update({ $push: { comment: newComment } });
    user.update({ $push: { comment: newComment } });
    res.send(newComment);
    res.status(200);
  } catch (err) {
    res.status(400);
    console.log(err);
  } finally {
    res.end();
  }
};

export const deleteComment = async (req, res) => {
  const {
    params: { id },
    body: { commentId },
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { comment: commentId },
    });
    await Video.findByIdAndUpdate(id, {
      $pull: { comment: commentId },
    });
    await Comment.findByIdAndRemove(commentId);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.status(400);
  } finally {
    res.end();
  }
};

export const search = async (req, res) => {
  const {
    query: { search },
  } = req;
  try {
    const allVideos = await Video.find().populate("creator");
    const options = {
      includeScore: true,
      findAllMatches: true,
      threshold: 1.0,
      distance: 1000,
      keys: ["title", "tags", "description", "comment"],
    };
    const fuse = new Fuse(allVideos, options);
    const result = fuse.search(search);
    res.render("search", { title: "search", result });
  } catch (err) {
    console.log(err);
    req.flash("error", "Search failed");
    res.redirect("/");
  }
};
