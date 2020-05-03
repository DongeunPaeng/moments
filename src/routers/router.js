import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Main Page!", message: "Hi there!" });
});

export default router;
