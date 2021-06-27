const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const DevMode = process.env.Node_ENV === "development";

module.exports = [
  {
    name: "client",
    target: "web",
    entry: resolve(__dirname, "../src/client/index.jsx"),

    devtool: "source-map",
    resolve: {
      extensions: ["*", ".js", ".jsx"],
      modules: [resolve("node_modules"), resolve("src/client")],
    },
    module: {
      rules: [
        {
          test: /\.js(x?)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif|ttf|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "assets",
                publicPath: "assets",
                name: "[name].[hash].[ext]",
                emitFile: true,
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          loader: "url-loader",
          options: {
            limit: "100000",
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          enforce: "pre",
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
          options: {
            emitError: false,
          },
        },
      ],
    },
    output: {
      path: resolve(__dirname, "../dist/public"),
      filename: DevMode ? "bundle.js" : "bundle.[contenthash].js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        favicon: "./public/favicon.ico",
        template: "./public/index.html",
      }),
    ],
  },
  {
    name: "server",
    target: "node",
    entry: resolve(__dirname, "../src/server/server.js"),
    devtool: "source-map",
    externals: [nodeExternals()],
    resolve: {
      extensions: ["*", ".js"],
      modules: [resolve("node_modules"), resolve("src/server")],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif|ttf|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                publicPath: "public",
                outputPath: "assets",
                name: "[name].[hash].[ext]",
                emitFile: true,
              },
            },
          ],
        },
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
          options: {
            emitError: false,
          },
        },
      ],
    },
    output: {
      path: resolve(__dirname, "../dist/"),
      filename: "bundle.js",
    },
  },
];
