import express from "express";
import {
  getJoin,
  postJoin,
  getConfirmEmail,
  getLogin,
  getLogout,
  postConfirmEmail,
  postLogin,
} from "../controllers/userController";
import { home } from "../controllers/contentController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", getJoin);
globalRouter.post("/join", postJoin);
globalRouter.get("/confirmEmail", getConfirmEmail);
globalRouter.get("/login", getLogin);
globalRouter.get("/logout", getLogout);
globalRouter.post("/login", postConfirmEmail, postLogin);

export default globalRouter;
