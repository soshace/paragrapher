"use strict";

import { pick } from "underscore";
import axios from "axios";

import { ApiCollection } from "./";

interface Params {
  _id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
}

export class Document extends ApiCollection {

  static fields = ["id", "title", "createdAt", "updatedAt"];

  static find(options: { limit?: number; offset?: number }) {
    return super.find("documents", options);
  }

  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;


  constructor(params: Params) {
    super(params);
    this.id = params._id;
    this.title = params.title;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

};
