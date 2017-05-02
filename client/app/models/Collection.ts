"use strict";

"use strict";

import { pick } from "underscore";
import axios from "axios";

export class Collection {

  static collection: string;
  static fields: string[];

  static find(limit?: number, offset?: number) {
    axios.get(this.collection, { params: { limit, offset } })
    .then((result) => {
      console.log(result);
    });
  }

  toJSON() {
    return pick(this, this.constructor.fields);
  }

};
