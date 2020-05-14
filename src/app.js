import "./db";
import bodyParser from "body-parser";
import compression from "compression";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import path from "path";
import router from "./routers/router";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;
const handleListening = () => {
  console.log(`✅ Listening on: ${PORT}`);
};

app.listen(PORT, handleListening);

app.use(helmet());
app.set("view engine", "pug");
app.set("views", path.resolve(__dirname, "views"));
app.use("/dist", express.static(path.resolve(__dirname, "../dist")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(compression());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false, // what does this mean?
    saveUninitialized: true, // what does this mean?
    cookie: { secure: true }, // what does this mean?
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.siteName = "moments";
  next();
});

app.use("/", router);
