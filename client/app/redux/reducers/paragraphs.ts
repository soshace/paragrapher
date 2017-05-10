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
import { Paragraph, Action, Page } from "../../models";

export interface State extends Page<Paragraph> {
  loading: boolean;
};


export const defaultState: State = {
  list: [],
  loading: true,
  pagesCount: 0,
  currentPage: 0
};

const ACTION_HANDLERS = {

  [join(READ, PARAGRAPHS, START)]: function(state: State): State {
    return { ...state, loading: true, list: [] };
  },

  [join(READ, PARAGRAPHS, SUCCESS)]: function(state: State, action: Action<Page<Paragraph>>): State {
    const { currentPage, pagesCount } = action.payload;
    const list = action.payload.list.map(function(paragraph) {
      return paragraph.toJSON();
    });
    return { loading: false, list, currentPage, pagesCount };
  },

  [join(READ, PARAGRAPHS, FAIL)]: function(state: State, action: Action<Error>): State {
    return { ...state, loading: false };
  },

  [join(SAVE, PARAGRAPH, SUCCESS)]: function(state: State, action: Action<Paragraph>): State {
    const list = state.list.map(function(paragraph) {
      if(paragraph.id == action.payload.id) {
        return action.payload.toJSON();
      } else {
        return paragraph;
      }
    });
    return { ...state, loading: false, list };
  }

};

export function paragraphsReducer(state: State = defaultState, action: Action<Page<Paragraph> | Paragraph | Error>): State {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};
