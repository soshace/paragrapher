"use strict";

import path from "path";
import webpack from "webpack";

import configureWebpack from "./client/webpack.config";

const env = process.env.NODE_ENV;
if(!env) {
  throw new Error("Specify environment variable NODE_ENV");
}

const webpackConfig = configureWebpack();
const compiler = webpack(webpackConfig);
promisify(compiler.run.bind(compiler))
.then(function(stats) {
  console.log(stats.toString("minimal"));
  process.exit(0);
})
.catch(function(err) {
  throw err;
});

function promisify(func, ...args) {
  return new Promise(function(resolve, reject) {
    func(...args, function(err, ...result) {
      if(err) {
        reject(err);
      } else {
        resolve(...result);
      }
    });
  });
}
