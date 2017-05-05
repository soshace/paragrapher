"use strict";

import { pick } from "underscore";
import axios from "axios";

import { ApiCollection, Params as ApiCollectionParams } from "./";

interface Params extends ApiCollectionParams {
  desc: string;
  questions_link: string;
}

export class Document extends ApiCollection {

  static fields = ["id", "desc", "created_at", "modified_at", "questions_link"];

  static find(options: { page?: number }) {
    return super.find("question_collections", options);
  }

  static create(text: string) {
    return axios.post("/api/documents", { text })
    .then(({ data }: { data: Params}) => {
      return new Document(data);
    });
  }

  desc: string;
  questions_link: string;

  constructor(params: Params) {
    super(params);
    this.desc = params.desc;
    this.questions_link = params.questions_link;
  }

};
