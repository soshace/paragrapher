"use strict";

import { createBrowserHistory } from "history";
import { LOCATION_CHANGE, EMPTY_EVENT } from "../constants";
import { Dispatch } from "redux";
import { Location } from "../../models";

const browserHistory = createBrowserHistory();

export function changeLocation(url: string, replace?: boolean) {
  if(replace) {
    browserHistory.replace(url);
  } else {
    browserHistory.push(url);
  }
  return { type: "EMPTY_EVENT" };
};

export function back() {
  browserHistory.goBack();
  return { type: EMPTY_EVENT };
};

export function init() {
  return function(dispatch: Dispatch<{}>) {
    browserHistory.listen(function(location: Location) {
      dispatch({ type: LOCATION_CHANGE, location });
    });
  };
};
