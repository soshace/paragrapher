"use strict";

import * as React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { Grid } from "react-bootstrap";


import { Router } from "./";

class Root extends React.Component<any, any> {

  renderDebug() {
    const  DevTools = require("./DevTools").getDevTools();

    return (
      <Provider store={ this.props.store }>
        <Grid>
          <Router />
          <DevTools />
        </Grid>
      </Provider>
    );
  }

  render() {
    if(process.env.NODE_ENV == "local") {
      return this.renderDebug();
    } else {
      return (
        <Provider store={ this.props.store }>
          <Grid>
            <Router />
          </Grid>
        </Provider>
      );
    }
  }

}

export default Root;
