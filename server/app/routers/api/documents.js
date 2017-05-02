"use strict";

import express from "express";

import { handleRoute } from "../helpers";
import { DocumentsController, ParagraphsController } from "../../../app/controllers";

export default function() {
  const documentsRouter = express.Router();
  documentsRouter.get("/", handleRoute(DocumentsController, "index"));
  documentsRouter.post("/", handleRoute(DocumentsController, "create"));
  documentsRouter.get("/:id/paragraphs", handleRoute(ParagraphsController, "index"));
  return documentsRouter;
};

