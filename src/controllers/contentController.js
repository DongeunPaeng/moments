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
    body: { title, description },
  } = req;
  try {
    const newVideo = await Video.create({
      title,
      description,
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
  } = req;
  try {
    const video = await Video.findByIdAndDelete(id);
    await User.findOneAndUpdate(
      { videos: video.id },
      { $pull: { videos: video.id } }
    );
    req.flash("success", "Video deleted successfully");
    res.redirect("/users/my-videos");
  } catch (err) {
    console.log(err);
    req.flash("error", "Failed to delete your video...");
  }
};
