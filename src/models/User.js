import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: "Email is required!" },
  date: { type: Date, default: Date.now },
  kakaoId: Number,
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  emailVerified: { type: Boolean, required: true, default: false },
  verificationKey: { type: String, required: true },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", userSchema);

export default model;
