"use strict";

import {
  READ,
  SAVE,
  DOCUMENTS,
  DOCUMENT,
  join
} from "../constants";
import {  } from "../../models";

export function readDocuments(limit: number, offsset: number) {
  return { type: join(READ, DOCUMENTS) };
};
