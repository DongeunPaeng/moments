const path = require("path");
const ExtractCSS = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

const ENTRY_FILE = path.resolve(__dirname, "src/assets/js", "main.js");
const OUTPUT_DIR = path.resolve(__dirname, "dist");

const config = {
  entry: ENTRY_FILE,
  mode: "development",
  target: "node",
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [ExtractCSS.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [new ExtractCSS({ filename: "style.css" })],
};

module.exports = config;
