import express from "express";
import {
  home,
  getJoin,
  postJoin,
  getConfirmEmail,
  getLogin,
  getLogout,
  postConfirmEmail,
  postLogin,
} from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", getJoin);
globalRouter.post("/join", postJoin);
globalRouter.get("/confirmEmail", getConfirmEmail);
globalRouter.get("/login", getLogin);
globalRouter.get("/logout", getLogout);
globalRouter.post("/login", postConfirmEmail, postLogin);

export default globalRouter;
