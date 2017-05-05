"use strict";

import { pick } from "underscore";
import axios from "axios";

import { ApiCollection, Params as ApiCollectionParams, CurrentUser } from "./";

interface Choice { text: string }

interface Params extends ApiCollectionParams {
  slug: string;
  question: string;
  my_vote: Choice[];
  votes: Choice[];
}

export class Paragraph extends ApiCollection {

  static baseUrl = "questions";
  static fields = ["id", "question", "votes", "my_vote", "created_at", "modified_at", "slug"];

  static find(documentId: string, options: { page?: number }) {
    options = { ...options, in_collections__parent: documentId };
    return super._find(options);
  }

  static create(question: string) {
    const tags: any[] = [];
    const body = { question, tags };
    return super.create(body)
  }

  slug: string;
  question: string;
  my_vote: Choice[];
  votes: Choice[];

  constructor(params: Params) {
    super(params);
    this.slug = params.slug;
    this.question = params.question;
    this.my_vote = params.my_vote;
    this.votes = params.votes;
    if(!params.votes) {
      params.votes = [{ text: "like" }, { text: "dislike" }];
    }
  }

  toggleLike(like: boolean) {
    const body = { value: like ? 5 : 1, object_id: this.id };
    const config = { headers: CurrentUser.getAuthHeader() };
    return axios.put(`/api/paragraphs/${this.id}`, body, config)
    .then(({ data }: { data: Params}) => {
      return new Paragraph(data);
    });
  }

};
