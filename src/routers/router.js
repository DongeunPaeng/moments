import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { title: "home" });
});

router.get("/join", (req, res) => {
  res.render("join", { title: "join" });
});

router.post("/join", (req, res) => {
  const {
    body: { email, password, password2 },
  } = req;
  if (password !== password2) {
    res.render("join", { message: "Failed to confirm password." });
  } else {
    try {
      console.log(email, password, password2);
    } catch (error) {
      console.log(error);
    } finally {
      res.redirect("/");
    }
  }
});

export default router;
