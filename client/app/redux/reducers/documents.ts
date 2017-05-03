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
  loading: boolean;
  error?: Error;
  form: {
    saving: boolean;
  }
};


export const defaultState: State = {
  list: [],
  loading: true,
  form: {
    saving: false
  }
};

const ACTION_HANDLERS = {

  [join(READ, DOCUMENTS, START)]: function(state: State): State {
    return { ...state, loading: true, error: null, list: [] };
  },

  [join(READ, DOCUMENTS, SUCCESS)]: function(state: State, action: Action<Document[]>): State {
    const list = action.payload.map(function(document) {
      console.log(document);
      console.log(document.toJSON());
      return document.toJSON();
    })
    return { ...state, loading: false, list };
  },

  [join(READ, DOCUMENTS, FAIL)]: function(state: State, action: Action<Error>): State {
    return { ...state, loading: false, error: action.payload };
  },

  [join(SAVE, DOCUMENT, START)]: function(state: State): State {
    return { ...state, form: { saving: true } };
  },

  [join(SAVE, DOCUMENT, SUCCESS)]: function(state: State, action: Action<Document[]>): State {
    return { ...state, form: { saving: false } };
  },

  [join(SAVE, DOCUMENT, FAIL)]: function(state: State, action: Action<Error>): State {
    return { ...state, form: { saving: false } };
  }

};

export function documentsReducer(state: State = defaultState, action: Action<Document[] | Error>): State {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action): state;
};
