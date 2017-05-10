"use strict";

import { pick } from "underscore";
import axios from "axios";

import { ApiCollection, Params as ApiCollectionParams, CurrentUser, Page } from "./";

interface Choice { text: string }

interface Params extends ApiCollectionParams {
  slug: string;
  question: string;
  my_vote: Choice[];
  score: number;
}

export class Paragraph extends ApiCollection {

  static baseUrl = "questions";
  static votesUrl = "question_votes";
  static fields = ["id", "question", "score", "my_vote", "created_at", "modified_at", "slug"];

  static find(documentId: string, options: { page?: number }) {
    options = { ...options, in_collections__parent: documentId, publish: false };
    let page: Page<Paragraph>;
    return super._find(options)
    .then(function(paragraphsPage: Page<Paragraph>) {
      page = paragraphsPage;
      const promises = paragraphsPage.list.map(function(paragraph) {
        return paragraph.populateVotes();
      });
      return Promise.all(promises);
    })
    .then(function(paragraphs: Paragraph[]) {
      page.list = paragraphs;
      return page;
    });
  }

  static create(question: string) {
    const tags: any[] = [];
    const body = { question, tags, publish: false };
    return super.create(body)
  }

  slug: string;
  question: string;
  my_vote: Choice[];
  score: number;

  constructor(params: Params) {
    super(params);
    this.slug = params.slug;
    this.question = params.question;
    this.my_vote = params.my_vote;
    this.score = params.score;
    if(!params.score) {
      this.score = 0;
    }
  }

  toggleLike(like: boolean) {
    const body = { value: like ? 5 : 1, object_id: this.id };
    const config = { headers: CurrentUser.getAuthHeader() };
    if(this.my_vote.length > 0) {
      return;
    }
    return axios.post(`${CONFIG.backendUri}/api/${Paragraph.votesUrl}/`, body, config)
    .then(({ data }: { data: Params}) => {
      this.score += like ? 1 : -1;
      return this;
    });
  }

  populateVotes(page?: number): any {
    const params: any = { format: "json", object: this.id  };
    if(typeof page == "number") {
      params.page = page;
    }
    return axios.get(`${CONFIG.backendUri}/api/${Paragraph.votesUrl}/`, { params })
    .then(({ data }: { data: any}) => {
      this.score = data.results.reduce((currentValue: number, vote: any) => {
        return currentValue + (vote.value == 5 ? 1 : -1);
      }, 0);
      console.log(this.score);
      if(data.next_id) {
        return this.populateVotes(data.next_id);
      }
      return this;
    });
  }

};
