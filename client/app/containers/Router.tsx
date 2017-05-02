"use strict";

import * as React from "react";
import { connect } from "react-redux";
import { Router, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Paper from "material-ui/Paper";
import { Flex, Item } from "react-flex";
import Uranium from "uranium";

import {
  ErrorMessage,
  Login,
  OAuthCallback,
  CompleteProfile,
  Welcome,
  App
} from "./";
import { Loading, SplashScreen } from "../components";
import { loadApplication } from "../redux/actions";
import { init as initHistoryWrapper } from "../redux/actions/RouterActions";

import theme from "../theme";

const style = {
  root: {
    minHeight: "100%",
    width: "100%",
  },
  wrapper: {
    width: "100%"
  }

};

class ApplicationRouter extends React.Component <any, any> {

  componentDidMount() {
    this.props.initHistoryWrapper(this.props.history);
    this.props.loadApplication();
  }

  render() {
    return (
      <Router key={ Math.random() } history={ this.props.history }>
        <MuiThemeProvider muiTheme={ getMuiTheme(theme) }>
          <Flex column wrap={ false } css={ style.root } alignItems="stretch">
            { this.renderRoutes() }
            <ErrorMessage />
          </Flex>
        </MuiThemeProvider>
      </Router>
    );
  }

  renderRoutes() {
    if(this.props.loading) {
      return (
        <SplashScreen loading message="Loading application"/>
      );
    }
    return (
      <Flex column wrap={ false } flex={ 1 } alignItems="stretch" css={ style.wrapper }>
        <Route path="/login" component={ Login }/>
        <Route path="/oauth-callback" component={ OAuthCallback }/>
        <Route path="/complete-profile" component={ CompleteProfile } />
        <Route path="/welcome" component={ Welcome } />
        <Route path="/app" component={ App } />
      </Flex>
    );
  }

}

const mapDispatchToProps = { loadApplication, initHistoryWrapper };

function mapStateToProps(state) {
  const { loading } = state.application;
  return { loading };
}

export default connect(mapStateToProps, mapDispatchToProps)(Uranium(ApplicationRouter));
