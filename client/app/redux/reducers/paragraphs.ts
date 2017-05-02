"use strict";

import {
  READ,
  SAVE,
  START,
  PARAGRAPHS,
  PARAGRAPH,
  SUCCESS,
  FAIL,
  join
} from "../constants";
import { Paragraph, Action } from "../../models";

export interface State {
  list: Paragraph[];
  loading: boolean;
};

export const defaultState: State = {
  list: [],
  loading: true
};

const ACTION_HANDLERS = {

  [join(READ, PARAGRAPHS, START)]: function(state: State, action: Action<Paragraph[]>): State {
    return { loading: true, list: [] };
  },

  [join(READ, PARAGRAPHS, SUCCESS)]: function(state: State, action: Action<Paragraph[]>): State {
    const list = action.payload.map(function(paragraph) {
      return paragraph.toJSON();
    });
    return { loading: false, list };
  },

  [join(READ, PARAGRAPHS, FAIL)]: function(state: State, action: Action<Error>): State {
    return { ...state, loading: false };
  }

};

export function paragraphsReducer(state: State = defaultState, action: Action<Paragraph[] | Error>): State {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};
