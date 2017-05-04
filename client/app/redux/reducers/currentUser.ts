"use strict";

import {
  READ,
  SAVE,
  START,
  FAIL,
  SUCCESS,
  CURRENT_USER,
  LOG_IN,
  join
} from "../constants";
import { CurrentUser, Action } from "../../models";

export interface State {
  profile?: CurrentUser;
  loading: boolean;
};

export const defaultState: State = { loading: false };

const ACTION_HANDLERS = {

  [join(READ, CURRENT_USER, START)]: function(state: State): State {
    return { ...state, loading: true, profile: null };
  },

  [join(READ, CURRENT_USER, SUCCESS)]: function(state: State, action: Action<CurrentUser>): State {
    return { ...state, loading: false, profile: action.payload };
  },

  [join(READ, CURRENT_USER, FAIL)]: function(state: State): State {
    return { ...state, loading: false };
  }

};

export function currentUserReducer(state: State = defaultState, action: Action<CurrentUser>): State {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action): state;
};
