"use strict";

import apiRouter from "./api";

export default function(app) {
  app.use("/api", apiRouter());
};

