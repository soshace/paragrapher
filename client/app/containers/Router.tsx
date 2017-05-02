"use strict";

import * as React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import {
} from "./";
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
        { <Route path="/app/documents" /> }
        { <Route path="/app/documents/:documentId/paragraphs" /> }
        { <Route path="/app/paragraphs/:paragraphId" /> }
      </BrowserRouter>
    );
  }

}


export default connect(null, { initHistoryWrapper })(ApplicationRouter);
