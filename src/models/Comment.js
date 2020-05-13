import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: { type: String, required: "No Text Submitted" },
  date: { type: Date, default: Date.now },
  writer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  video: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
});

const model = mongoose.model("Comment", commentSchema);
export default model;
