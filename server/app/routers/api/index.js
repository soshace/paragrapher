"use strict";

import express from "express";

import documentsRouter from "./documents";
import paragraphsRouter from "./paragraphs";

export default function() {
  const apiRouter = express.Router();
  apiRouter.use("/documents", documentsRouter());
  apiRouter.use("/paragraphs", paragraphsRouter());
  return apiRouter;
};

