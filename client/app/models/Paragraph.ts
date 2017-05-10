"use strict";

import { pick } from "underscore";
import axios from "axios";

import { ApiCollection, Params as ApiCollectionParams, CurrentUser, Page } from "./";

interface Choice { text: string }

interface Params extends ApiCollectionParams {
  slug: string;
  question: string;
  my_vote: Choice[];
  votes: Choice[];
}

export class Paragraph extends ApiCollection {

  static baseUrl = "questions";
  static votesUrl = "question_votes";
  static fields = ["id", "question", "votes", "my_vote", "created_at", "modified_at", "slug"];

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
    .then(function(paragraphs) {
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
    return axios.post(`${CONFIG.backendUri}/api/${Paragraph.votesUrl}/`, body, config)
    .then(({ data }: { data: Params}) => {
      return new Paragraph(data);
    });
  }

  populateVotes(page?: number): any {
    const params: any = { format: "json", object_id: this.id  };
    if(typeof page == "number") {
      params.page = page;
    }
    return axios.get(`${CONFIG.backendUri}/api/${Paragraph.votesUrl}/`, { params })
    .then(({ data }: { data: any}) => {
      this.votes = data.results.map(function(vote: any) {
        if(vote.value == 5) {
          return 1;
        } else {
          return 0;
        }
      });
      if(data.next_id) {
        return this.populateVotes(data.next_id);
      }
      return this;
    });
  }

};
