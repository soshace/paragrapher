"use strict";

import { pick } from "underscore";
import axios from "axios";

import { ApiCollection, Params as ApiCollectionParams, CurrentUser, Paragraph } from "./";

interface Params extends ApiCollectionParams {
  name: string;
  questions_link: string;
}

export class Document extends ApiCollection {

  static baseUrl = "question_collections";
  static collectionItemsUrl = "question_collection_items";
  static fields = ["id", "name", "created_at", "modified_at", "questions_link"];

  static find(options: { page?: number }) {
    return super._find(options);
  }

  static create(text: string) {
    const paragraphTexts = text.split(/[\n\r]{2,}/g);
    const name = text.substr(0, 50);
    const body = { name, question_count: paragraphTexts.length };
    let document: Document;
    return super.create(body)
    .then((_document: Document) => {
      document = _document;
      const promises = paragraphTexts.map(function(paragraphText) {
        return Paragraph.create(paragraphText.trim());
      });
      return Promise.all(promises);
    })
    .then(function(paragraphs: Paragraph[]) {
      const promises = paragraphs.map(function(paragraph) {
        const config = { headers: CurrentUser.getAuthHeader() };
        const content_object: any = null;
        const item = { parent: document.id, content_object, type: "Q", object_id: paragraph.id };
        return axios.post(`${CONFIG.backendUri}/api/${Document.collectionItemsUrl}/`, item, config);
      });
      return Promise.all(promises);
    })
    .then(function() {
      return document;
    });
  }

  name: string;
  questions_link: string;

  constructor(params: Params) {
    super(params);
    this.name = params.name;
    this.questions_link = params.questions_link;
  }

};
