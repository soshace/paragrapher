"use strict";

const path = require("path");
const webpack = require("webpack");
const Config = require(path.resolve("config"));

const hmr = [
  "react-hot-loader/patch",
  "webpack-hot-middleware/client?noInfo=false"
];

let mainEntry = [ path.resolve("client/app/index.tsx") ];

let vendorEntry = [
  "babel-polyfill",
  "react",
  "react-dom",
  "redux",
  "react-redux",
  "react-router"
];

let localPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
];

const config = new Config();

module.exports = function(env) {
  if(!env) {
    env = process.env.NODE_ENV || "local";
  }
  let plugins = [
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify(env) }),
    new webpack.optimize.CommonsChunkPlugin({ name: ['vendor'] })
  ];
  let tsConfigPath;
  if(env == "local") {
    plugins = plugins.concat(localPlugins);
    mainEntry = mainEntry.concat(hmr);
    vendorEntry = vendorEntry.concat(hmr);
  }
  return {
    entry: {
      main: mainEntry,
      vendor: vendorEntry
    },
    output: {
      filename: "[name].js",
      path: path.resolve("public/build"),
      sourceMapFilename: "[file].map",
      publicPath: "/build/"
    },
    resolve: {
      extensions: [".jsx", ".ts", ".tsx", ".js"]
    },
    devtool: "local" == env || "development" == env ? "source-map" : undefined,
    module: {
      loaders: [
        {
          test: /\.[tj]sx?$/,
          loaders: ["awesome-typescript-loader?tsconfig=" + "./"],
          include: path.resolve("client/app")
        }, {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" },
          ]
        }, {
          test: /\.less$/,
          use: [
            "style-loader",
            { loader: "css-loader", options: { importLoaders: 1 } },
            "less-loader"
          ],
          include: [path.resolve("client/styles"), path.resolve("client/app")]
        }
      ]
    },
    plugins: plugins
  };
};
