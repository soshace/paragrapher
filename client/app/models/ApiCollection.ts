"use strict";

import { pick } from "underscore";
import axios from "axios";

import { CurrentUser } from "./";

export interface Params {
  id: string;
  created_at: Date;
  modified_at: Date;
}

export class ApiCollection {

  static fields: string[];
  static baseUrl: string;

  id: string;
  created_at: Date;
  modified_at: Date;

  constructor(params: Params) {
    this.id = params.id;
    this.created_at = params.created_at;
    this.modified_at = params.modified_at;
  }

  static create(body: any) {
    const config = { headers: CurrentUser.getAuthHeader() };
    return axios.post(`${CONFIG.backendUri}/api/${this.baseUrl}/`, body, config)
    .then(({ data }: { data: Params}) => {
      return new (<typeof ApiCollection>this.prototype.constructor)(data);
    });
  }

  static _find(options: { page?: number }) {
    const query = { params: { ...options, format: "json" }, headers: CurrentUser.getAuthHeader() };
    return axios.get(`${CONFIG.backendUri}/api/${this.baseUrl}/`, query)
    .then(({ data }: { data: any}) => {
      const nextPage = data.next_id;
      const previousPage = data.previous_id;
      const list = data.results.map((instance: any) => {
        return new (<typeof ApiCollection>this.prototype.constructor)(instance);
      });

      return { nextPage, previousPage, list };
    });
  }


  toJSON() {
    return pick(this, (<typeof ApiCollection>this.constructor).fields);
  }

};
