"use strict";

import {
  GEOLOCATION,
  READ,
  SAVE,
  START,
  SUCCESS,
  FAIL,
  join
} from "../constants";
import { Place } from "../../models";

export interface State {
  loading: boolean;
  place: Place;
  message?: string;
}

export const defaultState: State = {
  loading: false,
  place: null
};

const ACTION_HANDLERS = {

  [join(READ, GEOLOCATION, START)]: function(state, action) {
    return ({ ...state, loading: true, message: "Getting your geo location..." });
  },

  [join(READ, GEOLOCATION, SUCCESS)]: function(state, action) {
    return ({ ...state, loading: false, place: action.payload });
  },

  [join(READ, GEOLOCATION, FAIL)]: function(state, action) {
    return ({ ...state, loading: false, place: null });
  }

};

export function geolocationReducer(state = defaultState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
};
