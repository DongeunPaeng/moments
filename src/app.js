import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import router from "./routers/router";

const app = express();

const PORT = process.env.PORT || 4000;
const handleListening = () => {
  console.log(`✅ Listening on: ${PORT}`);
};

app.listen(PORT, handleListening);

app.use(helmet());
app.set("view engine", "pug");
app.set("views", path.resolve(__dirname, "views"));
app.use("/dist", express.static(path.join("../../dist"))); // 여기에 뭔가 문제가 있음
app.use(morgan("dev"));
app.use(compression());
app.use(bodyParser.json()); // meaning?
app.use(bodyParser.urlencoded({ extended: true })); // meaning?

app.use("/", router);
