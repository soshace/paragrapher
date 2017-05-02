"use strict";

export function handleRoute(Controller, method) {
  return function(req, res) {
    const controller = new Controller(req, res);
    controller[method]();
  };
};
