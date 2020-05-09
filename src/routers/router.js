import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { title: "home", message: "Home!" });
});

export default router;
