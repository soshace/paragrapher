"use strict";

import * as React from "react";
import { connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { History } from "history";
import { createBrowserHistory } from "history";

import { Login, Register, App } from "./";
import { init as initHistoryWrapper } from "../redux/actions/RouterActions";
import { ReduxState } from "../redux/reducers";
import { CurrentUser } from "../models";

interface Props {
  currentUser?: CurrentUser;
  initHistoryWrapper(history: History): void;
}

class ApplicationRouter extends React.Component <Props, void> {

  history: History;

  constructor(props: Props) {
    super(props);
    this.history = createBrowserHistory();
  }

  componentDidMount() {
    this.props.initHistoryWrapper(this.history);
  }

  render() {
    return (
      <Router key={ Math.random() } history={ this.history } >
        <Switch>
          <Route exact path="/register" component={ Register } />
          <Route exact path="/login" component={ Login } />
          <Route>
            <App />
          </Route>
        </Switch>
      </Router>
    );
  }

}

export default connect(null, { initHistoryWrapper })(ApplicationRouter);
