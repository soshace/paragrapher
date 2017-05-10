"use strict";

import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 1,
    maxLenght: 50
  }
}, {
  timestamps: true
});

schema.statics.createDocument = function(text) {
  const title = text.substr(0, 50);
  const document = new Document({ title });
  const Paragraph = mongoose.model("Paragraph");
  return document.save()
  .then(function() {
    return Promise.all(text.split(/[\n\r]{2,}/g).map(function(paragraphText) {
      const paragraph = new Paragraph({ text: paragraphText, document: document._id });
      return paragraph.save();
    }));
  })
  .then(function(result) {
    console.log(result);
    return document;
  });
};

const Document = mongoose.model("Document", schema);

