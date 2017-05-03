"use strict";

import * as React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import { DocumentsList } from "./";
import { init as initHistoryWrapper } from "../redux/actions/RouterActions";

interface Props {
  initHistoryWrapper(): void;
}

class ApplicationRouter extends React.Component <Props, void> {

  componentDidMount() {
    this.props.initHistoryWrapper();
  }

  render() {
    return (
      <BrowserRouter key={ Math.random() }>
        <Switch>
          <Route path="/app/documents" component={ DocumentsList } />
          <Route path="/app/documents/:documentId/paragraphs" />
          <Route path="/app/paragraphs/:paragraphId" />
          <Route>
            <Redirect to="/app/documents" />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

}


export default connect(null, { initHistoryWrapper })(ApplicationRouter);
