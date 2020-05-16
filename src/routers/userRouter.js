import express from "express";
import { detail, deleteUser } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/detail", detail);
userRouter.get("/delete/:id", (req, res) => {
  console.log(
    `user with an id of ${req.params.id} requested to delete himself/herself` // this is not working properly. What's wrong?
  );
});

export default userRouter;
