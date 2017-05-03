"use strict";

const merge = require("merge");

const commonSettings = require("./common.json");

const env = process.env.NODE_ENV || "local";
const settings = merge.recursive(require(`./${env}.json`), commonSettings);

class Config {

  constructor() {
    for(let key in settings) {
      if(process.env[key]) {
        settings[key] = process.env[key];
      }
      Object.defineProperty(this, key, {
        value: settings[key],
        writable: false,
        configurable: false,
        enumerable: false
      });
    }

  }

  get env() {
    return env;
  }

  toString() {
    return JSON.stringify(settings);
  }

}

module.exports = Config;
