"use strict";

import {
  READ,
  SAVE,
  DOCUMENTS,
  DOCUMENT,
  join
} from "../constants";
import { Document, CurrentUser } from "../../models";

export function readDocuments(user: CurrentUser, options: { page?: number }) {
  return { type: join(READ, DOCUMENTS), payload: Document.find(user, options) };
};

export function createDocument(text: string) {
  return { type: join(SAVE, DOCUMENT), payload: Document.create(text) };
};
