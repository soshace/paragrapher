"use strict";

import { pick } from "underscore";
import axios from "axios";

export interface Params {
  id: string;
  created_at: Date;
  modified_at: Date;
}

export class ApiCollection {

  static fields: string[];

  id: string;
  created_at: Date;
  modified_at: Date;

  constructor(params: Params) {
    this.id = params.id;
    this.created_at = params.created_at;
    this.modified_at = params.modified_at;
  }

  static find(url: string, options: { page?: number }) {
    return axios.get(`${CONFIG.backendUri}/api/${url}/`, { params: { ...options, format: "json" } })
    .then(({ data }: { data: any}) => {
      const pagesCount = data.count;
      const currentPage = data.previous_id || 1;
      const list = data.results.map((instance: any) => {
        return new (<typeof ApiCollection>this.prototype.constructor)(instance);
      });
      return { currentPage, pagesCount, list };
    });
  }

  toJSON() {
    return pick(this, (<typeof ApiCollection>this.constructor).fields);
  }

};
