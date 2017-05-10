"use strict";

import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { parse } from "query-string";
import { History } from "history";
import { createBrowserHistory } from "history";
import { Row, Col, FormControl, Button } from "react-bootstrap";

import { FieldGroup, Loading } from "../components";
import { readCurrentUser, login } from "../redux/actions";
import { ReduxState } from "../redux/reducers";
import { CurrentUser } from "../models";

interface Props {
  currentUser: CurrentUser;
  loading: boolean;
  redirect: string;
  readCurrentUser(): void;
  login(username: string, password: string): void;
}

interface State {
  username: string;
  password: string;
  usernameTouched?: boolean;
  passwordTouched?: boolean;
}

class Login extends React.Component <Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  componentDidMount() {
    const { currentUser } = this.props;
    if(!currentUser) {
      this.props.readCurrentUser();
    }
  }

  onUsernameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const username = event.target.value;
    this.setState({ username, usernameTouched: true });
  }

  onPasswordChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const password = event.target.value;
    this.setState({ password, passwordTouched: true });
  }

  login = () => {
    const { username, password } = this.state;
    this.props.login(username, password);
  }


  render() {
    const { currentUser, redirect } = this.props;
    if(currentUser) {
      return (<Redirect to={ redirect } />);
    } else {
      return (
        <Col xs={ 6 } xsOffset={ 3 }>
          { this.renderMain() }
        </Col>
      )
    }
  }

  renderMain() {
    const { loading, currentUser } = this.props;
    if(loading) {
      return (<Loading message="Logging in..." />);
    }
    const { username, password, usernameTouched, passwordTouched } = this.state;
    return (
      <form>
        <FieldGroup
          id="username"
          validationState={ usernameTouched && username == "" ? "error" : null }
          label="Username"
        >
          <FormControl
            componentClass="input"
            value={ username }
            placeholder="Enter username"
            onChange={ this.onUsernameChange }
          />
          <FormControl.Feedback />
        </FieldGroup>
        <FieldGroup
          id="password"
          validationState={ passwordTouched && password == "" ? "error" : null }
          label="Password"
        >
          <FormControl
            componentClass="input"
            type="password"
            value={ password }
            placeholder="Enter password"
            onChange={ this.onPasswordChange }
          />
          <FormControl.Feedback />
        </FieldGroup>
        <Row>
          <Col xs={ 6 }>
            <Button onTouchTap={ this.login }>
              Login
            </Button>
          </Col>
          <Col xs={ 6 }>
            <span>
              Don't have an account yet?
            </span>
            <Link to="/register">
              Register!
            </Link>
          </Col>
        </Row>
      </form>
    );
  }

}

function mapStateToProps({ currentUser, router }: ReduxState) {
  const { loading, profile } = currentUser;
  const search = parse(location.search);
  const redirect = search && search.redirect_uri ? search.redirect_uri : "/app/documents";
  return { loading, currentUser: profile, redirect };
}

export default connect(mapStateToProps, { readCurrentUser, login })(Login);
