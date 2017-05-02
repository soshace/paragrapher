"use strict";

import { LOCATION_CHANGE, EMPTY_EVENT } from "../constants";

let history: any;

export function changeLocation(location: string, replace?: boolean) {
  if(!history) {
    throw new Error("History wrapper isn't initiated");
  }
  if(replace) {
    history.replace(location);
  } else {
    history.push(location);
  }
  return { type: "EMPTY_EVENT" };
};

export function back() {
  if(!history) {
    throw new Error("History wrapper isn't initiated");
  }
  history.goBack();
  return { type: EMPTY_EVENT };
};

export function init(_history) {
  return function(dispatch) {
    history = _history;
    history.listen(function(location, action) {
      dispatch({ type: LOCATION_CHANGE, location });
    });
  };
};
