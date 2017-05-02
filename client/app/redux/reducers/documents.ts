"use strict";

import { findIndex } from "underscore";

import {
  READ,
  SAVE,
  START,
  DOCUMENTS,
  SUCCESS,
  FAIL,
  join
} from "../constants";
import { } from "../../models";

export interface State {
  list: any[];
  loading: boolean;
  saving: boolean;
};

export const defaultState: State = {
  list: [],
  loading: true,
  saving: false,
};

const ACTION_HANDLERS = {

  [join(READ, CONVERSATIONS, SUCCESS)]: function(state: State, action): State {
    return { ...state, loading: false };
  },

  [join(CREATE, CONVERSATION, START)]: function(state: State, action): State {
    const request = { sending: true, error: null, conversation: null };
    return { ...state, request };
  },

  [join(CREATE, CONVERSATION, SUCCESS)]: function(state: State, action): State {
    const request = { sending: false, error: null, conversation: action.payload };
    return { ...state, request };
  },

  [join(CREATE, CONVERSATION, FAIL)]: function(state: State, action): State {
    const request = { sending: false, error: action.payload, conversation: null };
    return { ...state, request };
  },

  [join(SAVE, CONVERSATION, START)]: function(state: State, action): State {
    const show = { loading: true, id: state.show.id };
    return { ...state, show };
  },

  [join(SAVE, CONVERSATION, SUCCESS)]: function(state: State, action): State {
    const show = { loading: false, id: state.show.id };
    return { ...state, show };
  },

  [join(SAVE, CONVERSATION, FAIL)]: function(state: State, action): State {
    const show = { loading: false, error: action.payload, id: state.show.id };
    return { ...state, show };
  },

  [join(CONVERSATION, ADDED, SUCCESS)]: function(state: State, action): State {
    const list = [ ...state.list ];
    list.push(action.payload);
    return { ...state, list, loading: false };
  },

  [join(CONVERSATION, UPDATED, SUCCESS)]: function(state: State, action): State {
    const list = [ ...state.list ];
    const index = findIndex(state.list, function(conversation) {
      return conversation.id == action.payload.id;
    });
    list.splice(index, 1, action.payload);
    return { ...state, list };
  },

  [join(CONVERSATION, DESTROYED)]: function(state: State, action): State {
    const list = state.list;
    const index = findIndex(list, function(conversation) {
      return conversation.id == action.payload;
    });
    list.splice(index, 1);
    return { ...state, list };
  },

  [join(SHOW, CONVERSATION)]: function(state: State, action): State {
    const show = { id: action.payload.id, loading: false };
    return { ...state, show };
  },

  [join(SEARCH, CONVERSATIONS, START)]: function(state: State): State {
    const search = { loading: true, list: [] };
    return { ...state, search };
  },

  [join(SEARCH, CONVERSATIONS, SUCCESS)]: function(state: State, action): State {
    const search = { loading: false, list: action.payload };
    return { ...state, search };
  }

};

export function conversationsReducer(state: State = defaultState, action): State {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
};
