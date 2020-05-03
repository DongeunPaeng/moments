const path = require("path");
const ExtractCSS = require("mini-css-extract-plugin");

const ENTRY_FILE = path.resolve(__dirname, "src", "app.js");
const OUTPUT_DIR = path.resolve(__dirname, "dist");

const config = {
  entry: ENTRY_FILE,
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  module: {
    rules: [
      // Tailwind CSS 용으로 나중에 바꾸어야 함
      {
        test: /\.css$/i,
        use: [ExtractCSS.loader, "css-loader"],
      },
    ],
  },
  plugins: [new ExtractCSS()],
};

module.exports = config;
