"use strict";

import * as React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import { History } from "history";

import { DocumentsList, ParagraphsList } from "./";
import { CurrentUser } from "../models";
import { ReduxState } from "../redux/reducers";

interface Props {
  currentUser: CurrentUser;
  pathname: string;
}

class App extends React.Component <Props, void> {

  render() {
    const { currentUser } = this.props;
    if(!currentUser) {
      return (<Redirect to="/login" />);
    }
    return (
      <Switch>
        <Route exact path="/app/documents" component={ DocumentsList } />
        <Route path="/app/documents/:documentId/paragraphs" component={ ParagraphsList } />
      </Switch>
    );
  }

}


function mapStateToProps({ currentUser, router }: ReduxState) {
  const { profile } = currentUser;
  const { pathname } = router.location;
  return { currentUser: profile, pathname };
}


export default connect(mapStateToProps)(App);
