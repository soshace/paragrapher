"use strict";

import * as React from "react";
import { connect } from "react-redux";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import { History } from "history";
import { createBrowserHistory } from "history";

import { DocumentsList, ParagraphsList } from "./";
import { init as initHistoryWrapper } from "../redux/actions/RouterActions";

interface Props {
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
          <Route exact path="/app/documents" component={ DocumentsList } />
          <Route path="/app/documents/:documentId/paragraphs" component={ ParagraphsList } />
          <Route path="/app/paragraphs/:paragraphId" />
          <Route>
            <Redirect to="/app/documents" />
          </Route>
        </Switch>
      </Router>
    );
  }

}


export default connect(null, { initHistoryWrapper })(ApplicationRouter);
