"use strict";

import { pick } from "underscore";
import axios from "axios";

import { ApiCollection } from "./";

interface Params {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
}

export class Paragraph extends ApiCollection {

  static fields = ["id, title", "createdAt", "updatedAt"];

  static find(documentId: string, options: { limit?: number; offset?: number }) {
    return super.find(`documents/${documentId}/paragraphs`, options);
  }

  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;

  constructor(params: Params) {
    super();
    this.id = params.id;
    this.title = params.title;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

};
