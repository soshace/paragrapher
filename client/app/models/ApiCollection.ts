"use strict";

"use strict";

import { pick } from "underscore";
import axios from "axios";

interface Params {
  createdAt: Date;
  updatedAt: Date;
}

export class ApiCollection {

  static fields: string[];

  createdAt: Date;
  updatedAt: Date;

  constructor(params: Params) {
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  static find(url: string, options: { limit?: number; offset?: number }) {
    return axios.get(`/api/${url}`, { params: options })
    .then(({ data }: { data: any[]}) => {
      return data.map((instance) => {
        return new (<typeof ApiCollection>this.prototype.constructor)(instance);
      });
    });
  }

  toJSON() {
    return pick(this, (<typeof ApiCollection>this.constructor).fields);
  }

};
