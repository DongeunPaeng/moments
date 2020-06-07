import crypto from "crypto";
import emailValidator from "email-validator";
import nodemailer from "nodemailer";
import passport from "passport";
import passwordValidator from "password-validator";
import User from "../models/User";
import Video from "../models/Video";

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .symbols()
  .has()
  .not()
  .spaces();

export const getKakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async (_, __, profile, done) => {
  const {
    _json: {
      kakao_account: { email },
    },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return done(null, user);
    } else {
      const newUser = await User.create({
        email,
      });
      return done(null, newUser);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getJoin = (req, res) => {
  res.render("join", { title: "join" });
};

export const postJoin = async (req, res) => {
  const {
    body: { email, password, password2 },
  } = req;
  if (password !== password2) {
    req.flash("error", "error: passwordMismatch");
    res.render("join", { title: "join" });
  } else {
    if (emailValidator.validate(email) !== true) {
      req.flash("error", "error: wrongEmail");
      res.render("join", { title: "join" });
    } else if (passwordSchema.validate(password) !== true) {
      req.flash("error", "error: weakPassword");
      res.render("join", { title: "join" });
    } else {
      try {
        const key_one = crypto.randomBytes(256).toString("hex").substr(100, 5);
        const key_two = crypto
          .randomBytes(256)
          .toString("base64")
          .substr(50, 5);
        const verificationKey = key_one + key_two;
        const url = `http://${req.get(
          "host"
        )}/confirmEmail?key=${verificationKey}`;

        const user = await User({
          email,
          emailVerified: false,
          verificationKey,
        });
        await User.register(user, password);

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
          },
        });

        const message = {
          from: process.env.MAIL_USERNAME,
          to: email,
          bcc: "dylan.paeng@deering.co",
          subject: "Welcome to moments!",
          html: `<p>Hi ${email}, nice to meet you!<p><br>Please click url below to verify your email!<br>${url}`, // decorate later (font, center-align)
        };

        transporter.sendMail(message, function (err, info) {
          if (err) {
            console.log(err);
            res.render("join", { title: "join" });
          } else {
            res.render("wait", {
              title: "wait",
            });
          }
        });
        req.flash("success", "E-mail has been successfully sent!");
      } catch (error) {
        req.flash("error", `error: ${error.name}`);
        res.render("join", { title: "join" });
      }
    }
  }
};

export const getConfirmEmail = async (req, res) => {
  const key = req.originalUrl.split("=")[1];
  try {
    const user = await User.findOne({ verificationKey: key });
    user.emailVerified = true;
    user.save();
    req.flash("success", "Nice to meet you!");
    await req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  } catch (err) {
    req.flash("error", "Verification failed...");
    res.render("join", { title: "join" });
  }
};

export const getLogin = (req, res) => {
  res.render("login", { title: "login" });
};

export const getLogout = (req, res) => {
  req.logout();
  req.flash("info", "See you later!");
  res.redirect("/");
};

export const postConfirmEmail = async (req, res, next) => {
  const {
    body: { email },
  } = req;
  if (emailValidator.validate(email) !== true) {
    req.flash("error", "error: wrongEmail");
    res.redirect("/login");
  } else {
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "Email not found");
      res.redirect("/login");
    } else {
      try {
        if (user.emailVerified !== true) {
          req.flash("error", "Email not found");
          res.render("wait", { title: "wait" });
        } else {
          next();
        }
      } catch (err) {
        console.log(err);
        req.flash("error", "Something went wrong...");
        res.redirect("/login");
      }
    }
  }
};

export const postLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  successFlash: "Welcome!",
  failureFlash: "Please check your email or password",
});

export const detail = (req, res) => {
  if (!req.user) {
    res.redirect("/");
  } else {
    res.render("detail", { title: "detail" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.user.id);
    await Video.findOneAndRemove({ creator: req.user.id });
    req.flash("info", "hope to see you again!");
    res.status(200);
  } catch (err) {
    req.flash("error", err);
    res.status(400);
  } finally {
    res.end();
  }
};

export const getChangePassword = (req, res) => {
  res.render("changePassword", { title: "detail" });
};

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword2 },
  } = req;
  if (
    !passwordSchema.validate(newPassword) ||
    !passwordSchema.validate(newPassword2)
  ) {
    req.flash("error", "error: weakPassword");
    res.render("changePassword", { title: "detail" });
  } else {
    try {
      if (newPassword !== newPassword2) {
        res.redirect("/users/change-password");
      } else {
        const user = await User.findById(req.user.id);
        user.changePassword(oldPassword, newPassword, (err) => {
          if (err) {
            req.flash("error", "Incorrect current password");
            console.log(err);
          }
          req.flash("success", "Password updated!");
          res.render("changePassword", { title: "detail" });
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export const getMyVideos = async (req, res) => {
  const videos = await Video.find({ creator: req.user.id })
    .sort({ _id: -1 })
    .populate("creator");
  res.render("myvideos", { videos });
};
