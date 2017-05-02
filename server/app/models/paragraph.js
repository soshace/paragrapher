"use strict";

import mongoose from "mongoose";

const schema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minLength: 1
  },
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true
  },
  score: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

mongoose.model("Paragraph", schema);

