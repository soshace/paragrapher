"use strict";

import {
  READ,
  SAVE,
  DOCUMENTS,
  DOCUMENT,
  join
} from "../constants";
import { Document, CurrentUser } from "../../models";

export function readDocuments(options: { page?: number }) {
  return { type: join(READ, DOCUMENTS), payload: Document.find(options) };
};

export function createDocument(text: string, user: CurrentUser) {
  return { type: join(SAVE, DOCUMENT), payload: Document.create(text, user) };
};
