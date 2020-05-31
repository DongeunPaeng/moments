import Video from "../models/Video";
import User from "../models/User";

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
