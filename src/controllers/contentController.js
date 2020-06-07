import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

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
    file: { filename },
    body: { title, description, tags },
  } = req;
  try {
    const newVideo = await Video.create({
      title,
      description,
      tags,
      fileUrl: "videos/".concat(filename),
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
      req.flash("success", "Video deleted successfully");
      res.redirect("back");
    }
  } catch (err) {
    req.flash("error", "Access denied");
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
    const video = await Video.findOne({ fileUrl: `videos/${url}` });
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
    const video = await Video.findOne({ fileUrl: `videos/${url}` });
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
    req.flash("success", "Updated!");
    res.redirect("back");
  } catch (err) {
    console.log(err);
    req.flash("error", "Can't update...");
    res.redirect("back");
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
    req.flash("success", "Leave a comment!");
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
    const video = await Video.findById(id);
    const user = await User.findById(req.user.id);
    const newComment = await Comment.create({
      text: comment,
      writer: user,
      video,
    });
    video.comment.push(newComment);
    video.save();
    user.comment.push(newComment);
    user.save();
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
