const path = require("path");
const ExtractCSS = require("mini-css-extract-plugin");

const ENTRY_FILE = path.resolve("./src/assets", "main.js");
const OUTPUT_DIR = path.resolve(__dirname, "dist", "assets");

const config = {
  entry: ENTRY_FILE,
  mode: "development",
  output: {
    path: OUTPUT_DIR,
    filename: "main.js",
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
