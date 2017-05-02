"use strict";

import mongoose from "mongoose";

import ApplicationController from "../application";

class DocumentsController extends ApplicationController {

  index() {
    const Document = mongoose.model("Document");
    const { query } = this.req;
    const options = {};
    if("offset" in query) {
      options.skip = query.offset;
    }
    if("limit" in query) {
      options.limit = query.limit;
    }
    Document.find({}, options)
    .then((documents) => {
      this.res.json(documents);
    })
    .catch((err) => {
      this.res.status(500).json({ message: err.message || err });
    });
  }

  create() {
    const Document = mongoose.model("Document");
    console.log(this.req.body)
    const { text } = this.req.body;

    Document.createDocument(text)
    .then((document) => {
      this.res.json(document);
    })
    .catch((err) => {
      this.res.status(500).json({ message: err.message || err });
    });
  }

}

export default DocumentsController;
