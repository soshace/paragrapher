"use strict";

import express from "express";
import path from "path";
import morgan from "morgan";
import _ from "underscore";
import bodyParser from "body-parser";

import packageJson from "../../package.json";
import Logger from "./modules/logger";
import configureWebpack from "../../client/webpack.config";
import router from "./routers";

let config;
let webpackConfig;

class Application {

  static init(_config) {
    config = _config;
    webpackConfig = configureWebpack(this.config.env);
    global.logger = new Logger(this.name, console);
    const app = express();
    morgan.token("req-body", function (req, res) {
      return JSON.stringify(req.body || {});
    });
    app.use(morgan(`[:date[iso]] WARN: ":method :url :req-body :status ":user-agent" - :response-time ms`, {
      skip: function(req, res) {
        return res.statusCode < 400;
      }
    }));
    app.use("/api", bodyParser.json());
    if(this.config.env == "local") {
      this.initWebpack(app);
    } else {
      app.use(webpackConfig.output.publicPath, express.static(webpackConfig.output.path));
    }
    router(app);
    const indexHtmlPath = path.resolve("public/index.html");
    app.get("/", function(req, res) {
      res.redirect("/app");
    });
    app.get("/app/*", function(req, res) {
      res.sendFile(indexHtmlPath);
    });
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(app);
      }, 1);
    });
  }

  static initWebpack(app) {
    const webpack = require("webpack");
    const compiler = webpack(webpackConfig);
    app.use(require("webpack-dev-middleware")(compiler, {
      publicPath: webpackConfig.output.publicPath,
      hot: true
    }));
    app.use(require("webpack-hot-middleware")(compiler, {
      reload: true
    }));
  }

  static get config() {
    return config;
  }

  static get name() {
    return packageJson.name;
  }

}

export default Application;
