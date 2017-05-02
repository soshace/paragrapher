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
        {this.renderRoutes()}
      </BrowserRouter>
    );
  }

  renderRoutes() {
    return (
      <div>
        {/* <Route path="/login" component={ Login }/> */}
        {/* <Route path="/oauth-callback" component={ OAuthCallback }/> */}
        {/* <Route path="/complete-profile" component={ CompleteProfile } /> */}
        {/* <Route path="/welcome" component={ Welcome } /> */}
        {/* <Route path="/app" component={ App } /> */}
      </div>
    );
  }

}


export default connect(null, { initHistoryWrapper })(ApplicationRouter);
