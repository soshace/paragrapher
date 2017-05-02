"use strict";

import mongoose from "mongoose";

import ApplicationController from "../application";

class ParagraphsController extends ApplicationController {

  index() {
    const Paragraph = mongoose.model("Paragraph");
    const { query } = this.req;
    const options = {};
    if("offset" in query) {
      options.skip = query.offset;
    }
    if("limit" in query) {
      options.limit = query.limit;
    }

    Paragraph.find({ document: this.req.params.id }, options)
    .then((paragraphs) => {
      this.res.json(paragraphs);
    })
    .catch((err) => {
      this.res.status(500).json({ message: err.message || err });
    });
  }

  update() {
    const Paragraph = mongoose.model("Paragraph");
    if(!("like" in this.req.body)) {
      res.status(403).json(new Error("Parameter like is missed"));
      return;
    }
    const { like } = this.req.body;

    Paragraph.findOne(id)
    .then((paragraph) => {
      paragraph.score += like ? 1 : -1;
      return paragraph.save();
    })
    .then(() => {
      this.res.json(paragraph);
    })
    .catch((err) => {
      this.res.status(500).json({ message: err.message || err });
    });
  }

}

export default ParagraphsController;
