import path from "path";
const webpackMode = process.env.WEBPACK_ENV ?? "development";

const config = {
  mode: webpackMode,
  target: "electron-main",
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  externals: ["fsevents"],
  entry: {
    main: "./src/main/index.ts",
    preload: "./src/main/preload.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "./",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
};

export default config;
