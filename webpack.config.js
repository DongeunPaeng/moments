const path = require("path");
const ExtractCSS = require("mini-css-extract-plugin");

const ENTRY_FILE = path.resolve("src/assets", "main.js"); // 원래대로 고치기
const OUTPUT_DIR = path.resolve("dist"); // 원래대로 고치기

const config = {
  entry: ENTRY_FILE,
  mode: "development",
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.css$/i,
        use: [ExtractCSS.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [new ExtractCSS({ filename: "style.css" })],
};

module.exports = config;
