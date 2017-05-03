"use strict";

import { LOCATION_CHANGE, SUCCESS, join } from "../constants";

import { Location } from "../../models"

export interface State {
  location: Location;
}

interface Action {
  location: Location;
  type: string;
}

export const defaultState: State = {
  location: {
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
    key: ""
  }
};

const ACTION_HANDLERS = {
  [LOCATION_CHANGE]: function(state: State, action: Action) {
    return { ...state, location: action.location };
  }

};

export function routerReducer(state = defaultState, action: Action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
};
