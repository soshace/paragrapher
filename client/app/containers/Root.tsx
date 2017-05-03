"use strict";

import * as React from "react";
import { Store } from "redux";
import { Provider } from "react-redux";
import { Grid } from "react-bootstrap";

import { Router } from "./";
import { ReduxState } from "../redux/reducers";

interface Props {
  store: Store<ReduxState>
}

class Root extends React.Component<Props, void> {

  renderDebug() {
    const  DevTools = require("./DevTools").getDevTools();

    return (
      <Provider store={ this.props.store }>
        <Grid fluid>
          <Router />
          <DevTools />
        </Grid>
      </Provider>
    );
  }

  render() {
    if(process.env.NODE_ENV == "local") {
      return this.renderDebug();
    }
    return (
      <Provider store={ this.props.store }>
        <Grid fluid>
          <Router />
        </Grid>
      </Provider>
    );
  }

}

export default Root;
