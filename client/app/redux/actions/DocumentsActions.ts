"use strict";

import {
  READ,
  SAVE,
  DOCUMENTS,
  DOCUMENT,
  join
} from "../constants";
import { Document } from "../../models";

export function readDocuments(options: { limit?: number, offsset? : number }) {
  return { type: join(READ, DOCUMENTS), payload: Document.find(options) };
};

export function createDocument(document: Document) {
  document = new Document(document);
  return { type: join(SAVE, DOCUMENT), payload: document.save() };
};
