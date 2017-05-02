"use strict";

import { LOCATION_CHANGE, LOGOUT, SUCCESS, join } from "../constants";

export interface State {
  location: {
    pathname: string;
    state?: any;
    search: string;
    hash: string;
    key: string;
  };
}

export const defaultState: State = {
  location: {
    pathname: "/",
    search: "",
    hash: "",
    key: ""
  }
};

const ACTION_HANDLERS = {
  [LOCATION_CHANGE]: function(state, action) {
    return { ...state, location: action.location };
  }

};

export function routerReducer(state = defaultState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
};
