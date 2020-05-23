import crypto from "crypto";
import nodemailer from "nodemailer";
import passport from "passport";
import User from "../models/User";
import Video from "../models/Video";

export const getJoin = (req, res) => {
  res.render("join", { title: "join" });
};

export const postJoin = async (req, res) => {
  const {
    body: { email, password, password2 },
  } = req;
  if (password !== password2) {
    req.flash("error", "Passwords don't match!");
    res.render("join", { title: "join" });
  } else {
    try {
      const key_one = crypto.randomBytes(256).toString("hex").substr(100, 5);
      const key_two = crypto.randomBytes(256).toString("base64").substr(50, 5);
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
          res.redirect("join");
        } else {
          res.render("wait", {
            title: "wait",
          });
        }
      });
      req.flash("success", "E-mail has been successfully sent!");
    } catch (error) {
      console.log(error);
      req.flash("error", "Something went wrong...");
      res.render("join", { title: "join" });
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
  const user = await User.findOne({ email });
  if (!user) {
    res.render("join", { message: "Join now!" });
  } else {
    try {
      if (user.emailVerified !== true) {
        req.flash("error", "Email not found"); // nothing comes up!
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
    req.flash("info", "Hope to see you again!");
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

export const getChangePassword = (req, res) => {
  res.render("changePassword");
};

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword2 },
  } = req;
  try {
    if (newPassword !== newPassword2) {
      res.redirect("/users/change-password");
    } else {
      const user = await User.findById(req.user.id);
      user.changePassword(oldPassword, newPassword, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    req.flash("success", "Password updated!");
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

export const getMyVideos = async (req, res) => {
  const videos = await Video.find({ creator: req.user.id })
    .sort({ _id: -1 })
    .populate("creator");
  res.render("myvideos", { videos });
};
