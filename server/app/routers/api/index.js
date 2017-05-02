"use strict";

import express from "express";

import documentsRouter from "./documents";
import paragraphsRouter from "./paragraphs";
import { handleRoute } from "./helpers";

export default function() {
  const apiRouter = express.Router();
  apiRouter.use("/api/documents", documentsRouter());
  apiRouter.use("/api/paragraphs", paragraphsRouter());
  return apiRouter;
};

