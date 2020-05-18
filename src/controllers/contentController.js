import Video from "../models/Video";

export const getUpload = (req, res) => {
  res.render("upload", { title: "upload" });
};

export const postUpload = (req, res) => {
  const {
    file: { destination, filename },
    body: { title, description },
  } = req;
  console.log(destination, filename, title, description);
  res.render("upload");
};
