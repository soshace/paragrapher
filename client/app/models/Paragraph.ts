"use strict";

import { pick } from "underscore";
import axios from "axios";

import { ApiCollection } from "./";

interface Params {
  id?: string;
  _id?: string;
  text: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Paragraph extends ApiCollection {

  static fields = ["id", "text", "score", "createdAt", "updatedAt", "scored"];

  static find(documentId: string, options: { limit?: number; offset?: number }) {
    return super.find(`documents/${documentId}/paragraphs`, options);
  }

  id: string;
  text: string;
  score: number;
  scored: boolean;

  constructor(params: Params) {
    super(params);
    this.id = params.id || params._id;
    this.text = params.text;
    this.score = params.score;
    try {
      this.scored = JSON.parse(localStorage[this.id]);
    } catch(e) {
      this.scored = false;
    }
  }

  toggleLike(like: boolean) {
    if(this.scored) {
      return Promise.resolve(this);
    }
    localStorage[this.id] = true;
    return axios.put(`/api/paragraphs/${this.id}`, { like })
    .then(({ data }: { data: Params}) => {
      return new Paragraph(data);
    });
  }

};
