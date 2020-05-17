import crypto from "crypto";
import nodemailer from "nodemailer";
import passport from "passport";
import User from "../models/User";

export const home = (req, res) => {
  res.render("home", { title: "home" });
};

export const getJoin = (req, res) => {
  res.render("join", { title: "join" });
};

export const postJoin = async (req, res) => {
  const {
    body: { email, password, password2 },
  } = req;
  if (password !== password2) {
    res.render("join", {
      title: "join",
      message: "Failed to confirm password.",
    });
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
            message: `An email for verification sent to ${email}`,
          });
        }
      });
    } catch (error) {
      console.log(error);
      res.render("join", {
        title: "join",
        message: "oops! something went wrong...",
      });
    }
  }
};

export const getConfirmEmail = async (req, res) => {
  try {
    const user = await User.findOne({ verificationKey: req.query.key });
    user.emailVerified = true;
    user.save();
    await req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  } catch (err) {
    console.log(err);
    res.render("join", { title: "join", message: "There was an error!" });
  }
};

export const getLogin = (req, res) => {
  res.render("login", { title: "login" });
};

export const getLogout = (req, res) => {
  req.logout();
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
      console.log("start trying");
      if (user.emailVerified !== true) {
        console.log(`you're email is not verified`);
        res.render("wait", {
          title: "wait",
          message: `An email for verification sent to ${email}`,
        });
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
      res.redirect("/login");
    }
  }
};

export const postLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
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
  console.log(oldPassword, newPassword, newPassword2);
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
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};
