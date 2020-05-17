import express from "express";
import {
  detail,
  deleteUser,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/detail", detail);
userRouter.get("/delete", deleteUser);
userRouter.get("/change-password", getChangePassword);
userRouter.post("/change-password", postChangePassword);

export default userRouter;
