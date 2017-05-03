"use strict";

"use strict";

import { pick } from "underscore";
import axios from "axios";

export class ApiCollection {

  static fields: string[];

  constructor(params: any) {

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
