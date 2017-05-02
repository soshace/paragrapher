"use strict";

import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createPromiseMiddleware from "redux-promise-middleware";
import { reactReduxFirebase, firebaseStateReducer } from "react-redux-firebase";
import { createEpicMiddleware } from "redux-observable";
import { createResponsiveStateReducer, responsiveStoreEnhancer } from "redux-responsive";

import rootEpic from "./epics";
import { state } from "./reducers";
import { START, SUCCESS, FAIL } from "./constants";

const epicMiddleware = createEpicMiddleware(rootEpic);
const promiseMiddleware = createPromiseMiddleware({ promiseTypeSuffixes: [START, SUCCESS, FAIL] });
const responsiveReducer = createResponsiveStateReducer({
  xs: 360,
  s: 375,
  m: 414,
  l: 640,
  xl: 1099
})
const firebaseConfig = CONFIG.firebase;
firebaseConfig.apiKey = CONFIG.gapi.apiKey;
let args: any[] = [
  reactReduxFirebase(firebaseConfig, {
    userProfile: "users", profileParamsToPopulate: ["channels:channels"]
  }),
  responsiveStoreEnhancer,
  applyMiddleware(promiseMiddleware, thunk, epicMiddleware)
];
if(process.env.NODE_ENV == "local") {
  const DevTools = require("../containers/DevTools").getDevTools();
  args.push(DevTools.instrument());
}

const enhancer = compose(...args);

export default function configureStore() {
  const reducer = createReducer();
  const store = createStore(reducer, state, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept("./reducers", function() {
      store.replaceReducer(createReducer())
    });
  }

  return store;
};

function createReducer() {
  const reducers = require("./reducers").reducers;
  return combineReducers({ ...reducers, firebase: firebaseStateReducer, responsive: responsiveReducer });
}
