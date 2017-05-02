"use strict";

import { createStore, compose, combineReducers, applyMiddleware, GenericStoreEnhancer } from "redux";
import thunk from "redux-thunk";
import createPromiseMiddleware from "redux-promise-middleware";

import { state } from "./reducers";
import { START, SUCCESS, FAIL } from "./constants";

const promiseMiddleware = createPromiseMiddleware({ promiseTypeSuffixes: [START, SUCCESS, FAIL] });

interface ComposeArg {
  (): void;
}

let args: GenericStoreEnhancer[] = [
  applyMiddleware(promiseMiddleware, thunk)
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
  return combineReducers({ ...reducers });
}
