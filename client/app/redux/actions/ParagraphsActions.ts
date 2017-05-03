"use strict";

import {
  READ,
  SAVE,
  PARAGRAPHS,
  PARAGRAPH,
  join
} from "../constants";
import { Paragraph } from "../../models";

export function readParagraphs(documentId: string, limit: number, offsset: number) {
  return { type: join(READ, PARAGRAPHS), payload: Paragraph.find(documentId, {}) };
};
