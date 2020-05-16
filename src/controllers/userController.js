import nodemailer from "nodemailer"
import passport from "passport"
import User from "../models/User";

export const home = (req, res) => {
  res.render("home", { title: "home" });
};

export const getJoin = (req, res) => {
  res.render("join", { title: "join" });
});

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
      await User.register(user, password); // passport-local-mongoose does this?

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
});

export const getConfirmEmail = async (req, res) => {
  try {
    const user = await User.findOne({ verificationKey: req.query.key });
    user.emailVerified = true;
    user.save();
    res.render("welcome", {
      title: "welcome",
      message: `Nice to meet you ${user.email}!`,
    });
  } catch (err) {
    console.log(err);
    res.render("join", { title: "join", message: "There was an error!" });
  }
});

export const getLogin = (req, res) => {
  res.render("login", { title: "login" });
});

export const getLogout = (req, res) => {
  req.logout();
  res.redirect("/");
});

export const postLogin =
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/",
  })
);