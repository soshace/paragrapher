"use strict";

import { LOCATION_CHANGE, EMPTY_EVENT } from "../constants";
import { Dispatch } from "redux";
import { History } from "history";
import { Location } from "../../models";

let history: History;

export function changeLocation(url: string, replace?: boolean) {
  if(!history) {
    throw new Error("History wrapper isn't initiated");
  }
  if(replace) {
    history.replace(url);
  } else {
    history.push(url);
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

interface Action {
  type: string;
  location: Location;
}

export function init(_history: History) {
  return function(dispatch: Dispatch<Action>) {
    history = _history;
    history.listen(function(location, action) {
      dispatch({ type: LOCATION_CHANGE, location });
    });
  };
};
