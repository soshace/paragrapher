"use strict";

import { pick } from "underscore";
import axios from "axios";

import { Collection } from "./";

interface Params {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
}

export class Document extends Collection {

  static fields = ["id, title", "createdAt", "updatedAt"];
  static collection = "documents";

  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;

  constructor(params: Params) {
    super(params);
    this.id = params.id;
    this.title = params.title;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

};
