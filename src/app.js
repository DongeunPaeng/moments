import "./db";
import bodyParser from "body-parser";
import compression from "compression";
import dotenv from "dotenv";
import express from "express";
import flash from "express-flash";
import session from "express-session";
import helmet from "helmet";
import mongoose from "mongoose";
import mongostore from "connect-mongo";
import morgan from "morgan";
import passport from "passport";
import "./passport";
import path from "path";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import contentRouter from "./routers/contentRouter";
dotenv.config();

const app = express();
const cookiestore = mongostore(session);

const PORT = process.env.PORT || 4000;
const handleListening = () => {
  console.log(`✅ Listening on: ${PORT}`);
};

app.listen(PORT, handleListening);

app.use(helmet());
app.set("view engine", "pug");
app.set("views", path.resolve(__dirname, "views"));
app.use("/dist", express.static(path.resolve(__dirname, "../dist")));
app.use(express.static("src/uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(compression());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new cookiestore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.siteName = "moments";
  res.locals.loggedUser = req.user || null;
  next();
});

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/contents", contentRouter);
