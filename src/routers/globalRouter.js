import express from "express";
import passport from "passport";
import {
  getJoin,
  postJoin,
  getKakaoLogin,
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
globalRouter.get("/auth/kakao", getKakaoLogin);
globalRouter.get(
  "/auth/kakao/callback",
  passport.authenticate("kakao", {
    successRedirect: "/",
    failureRedirect: "/login",
    successFlash: "Welcome!",
    failureFlash: "Can't log you in...",
  })
);
globalRouter.get("/confirmEmail", getConfirmEmail);
globalRouter.get("/login", getLogin);
globalRouter.get("/logout", getLogout);
globalRouter.post("/login", postConfirmEmail, postLogin);

export default globalRouter;
