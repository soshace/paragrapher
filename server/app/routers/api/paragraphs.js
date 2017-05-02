"use strict";

import express from "express";

import { handleRoute } from "../helpers";
import { ParagraphsController } from "../../../app/controllers";

export default function() {
  const paragraphsRouter = express.Router();
  paragraphsRouter.put("/:id", handleRoute(ParagraphsController, "update"));
  return paragraphsRouter;
};


