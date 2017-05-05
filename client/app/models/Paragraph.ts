"use strict";

import { pick } from "underscore";
import axios from "axios";

import { ApiCollection, Params as ApiCollectionParams, CurrentUser } from "./";

interface Choice { text: string }

interface Params extends ApiCollectionParams {
  slug: string;
  question: string;
  my_vote: Choice[];
  choices: Choice[];
}

export class Paragraph extends ApiCollection {

  static baseUrl = "questions";
  static fields = ["id", "question", "choices", "my_vote", "created_at", "modified_at", "slug"];

  static find(documentId: string, options: { page?: number }) {
    options = { ...options, in_collections__parent: documentId };
    return super._find(options);
  }

  static create(question: string, user: CurrentUser) {
    const tags: any[] = [];
    const body = { question, tags };
    return super.create(body, user)
  }

  static tryToCreateParagraph() {

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
    if(!params.choices) {
      params.choices = [{ text: "like" }, { text: "dislike" }];
    }
  }

  toggleLike(like: boolean) {
    // localStorage[this.id] = true;
    // return axios.put(`/api/paragraphs/${this.id}`, { like })
    // .then(({ data }: { data: Params}) => {
    //   return new Paragraph(data);
    // });
  }

};
