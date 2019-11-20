const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname),
    filename: "dist/index.js"
  },
  resolve: {
    extensions: [".js"]
  },
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.(js)$/,
      include: [path.resolve(__dirname, 'src/js')],
      loaders: ["babel-loader"],
      exclude: /node_modules/
    }]
  }
};