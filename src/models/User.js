import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  date: { type: Date, default: Date.now },
  kakaoId: Number,
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", userSchema);

export default model;
