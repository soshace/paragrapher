"use strict";

import express from "express";

import apiRouter from "./api";

export default function(app) {
  const appRouter = express.Router();
  app.use("/api", apiRouter());
};

