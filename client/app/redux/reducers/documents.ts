"use strict";

import {
  READ,
  SAVE,
  START,
  DOCUMENTS,
  DOCUMENT,
  SUCCESS,
  FAIL,
  join
} from "../constants";
import {  Document, Action } from "../../models";

export interface State {
  list: Document[];
  nextPage: number;
  previousPage: number;
  loading: boolean;
  error?: Error;
  form: {
    saving: boolean;
  }
};

export const defaultState: State = {
  list: [],
  nextPage: null,
  previousPage: null,
  loading: true,
  form: {
    saving: false
  }
};

interface Page {
  list: Document[];
  previousPage: number;
  nextPage: number;
}

const ACTION_HANDLERS = {

  [join(READ, DOCUMENTS, START)]: function(state: State): State {
    return { ...state, loading: true, error: null, list: [] };
  },

  [join(READ, DOCUMENTS, SUCCESS)]: function(state: State, action: Action<Page>): State {
    const { nextPage, previousPage } = action.payload;
    const list: Document[] = action.payload.list.map(function(document) {
      return document.toJSON();
    })
    .sort(function(documentA, documentB) {
      return documentA.created_at < documentB.created_at ? 1 : -1;
    });
    return { ...state, loading: false, list, previousPage, nextPage };
  },

  [join(READ, DOCUMENTS, FAIL)]: function(state: State, action: Action<Error>): State {
    return { ...state, loading: false, nextPage: 0, list: [] };
  },

  [join(SAVE, DOCUMENT, START)]: function(state: State): State {
    return { ...state, form: { saving: true } };
  },

  [join(SAVE, DOCUMENT, SUCCESS)]: function(state: State, action: Action<Document>): State {
    const list = [ ...state.list ];
    list.unshift(action.payload.toJSON());
    return { ...state, list, form: { saving: false } };
  },

  [join(SAVE, DOCUMENT, FAIL)]: function(state: State, action: Action<Error>): State {
    return { ...state, form: { saving: false } };
  }

};

export function documentsReducer(state: State = defaultState, action: Action<Page | Error | Document>): State {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action): state;
};
