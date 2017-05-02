"use strict";

"use strict";

import { pick } from "underscore";
import axios from "axios";

export class ApiCollection {

  static fields: string[];

  static find(url: string, options: { limit?: number; offset?: number }) {
    return axios.get(`/api/${url}`, { params: options })
    .then((result) => {
      console.log(result);
    });
  }

  toJSON() {
    return pick(this, this.constructor.fields);
  }

};
