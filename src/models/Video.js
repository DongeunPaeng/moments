import mongoose from "mongoose";

const Schema = mongoose.Schema;

const videoSchema = new Schema({
  title: { type: String, required: "Title is missing" },
  description: { type: String },
  views: { type: Number, default: 0 },
  fileUrl: { type: String, required: "File URL is missing" },
  date: { type: Date, default: Date.now },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const model = mongoose.model("Video", videoSchema);
export default model;
