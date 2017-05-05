"use strict";

import { pick } from "underscore";
import axios from "axios";

import { ApiCollection, Params as ApiCollectionParams } from "./";

interface Choice { text: string }

interface Params extends ApiCollectionParams {
  slug: string;
  question: string;
  my_vote: Choice[];
  choices: Choice[];
}

export class Paragraph extends ApiCollection {

  static fields = ["id", "question", "score", "created_at", "modified_at", "scored"];

  static find(documentId: string, options: { page?: number }) {
    options = { ...options, in_collections__parent: documentId };
    return super.find("questions", options);
  }

  slug: string;
  question: string;
  my_vote: Choice[];
  choices: Choice[];

  constructor(params: Params) {
    super(params);
    this.slug = params.slug;
    this.question = params.question;
    this.my_vote = params.my_vote;
    this.choices = params.choices;

  }

  toggleLike(like: boolean) {
    // localStorage[this.id] = true;
    // return axios.put(`/api/paragraphs/${this.id}`, { like })
    // .then(({ data }: { data: Params}) => {
    //   return new Paragraph(data);
    // });
  }

};
