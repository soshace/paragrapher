"use strict";

import { pick } from "underscore";
import axios from "axios";

import { ApiCollection } from "./";

interface Params {
  _id?: string;
  id?: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Document extends ApiCollection {

  static fields = ["id", "title", "createdAt", "updatedAt"];

  static find(options: { limit?: number; offset?: number }) {
    return super.find("documents", options);
  }

  static create(text: string) {
    return axios.post("/api/documents", { text })
    .then(({ data }: { data: Params}) => {
      return new Document(data);
    });
  }

  id: string;
  title: string;

  constructor(params: Params) {
    super(params);
    this.id = params._id || params.id;
    this.title = params.title;
  }

};
