"use strict";

import * as React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import Uranium from "uranium";

import { Router } from "./";

const style = {
  height: "100%",
  width: "100%"
};

class Root extends React.Component<any, any> {

  renderDebug() {
    const  DevTools = require("./DevTools").getDevTools();

    return (
      <Provider store={ this.props.store }>
        <div css={ style }>
          <Router history={ this.props.history } />
          <DevTools />
        </div>
      </Provider>
    );
  }

  render() {
    if(process.env.NODE_ENV == "local") {
      return this.renderDebug();
    } else {
      return (
        <Provider store={ this.props.store }>
          <div css={ style }>
            <Router history={ this.props.history } />
          </div>
        </Provider>
      );
    }
  }

}

export default Uranium(Root);
