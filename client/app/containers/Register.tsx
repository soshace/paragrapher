"use strict";

import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { History } from "history";
import { createBrowserHistory } from "history";
import { Row, Col, FormControl, Button } from "react-bootstrap";

import { FieldGroup, Loading } from "../components";
import { register } from "../redux/actions";
import { ReduxState } from "../redux/reducers";
import { CurrentUser } from "../models";

interface Props {
  currentUser: CurrentUser;
  loading: boolean;
  readCurrentUser(): void;
  register(username: string, password: string, email: string): void;
}

interface State {
  username: string;
  password: string;
  email: string;
  usernameTouched?: boolean;
  passwordTouched?: boolean;
  emailTouched?: boolean;
}

class Register extends React.Component <Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { username: "", password: "", email: "" };
  }

  onEmailChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const email = event.target.value;
    this.setState({ email, emailTouched: true });
  }

  onUsernameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const username = event.target.value;
    this.setState({ username, usernameTouched: true });
  }

  onPasswordChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const password = event.target.value;
    this.setState({ password, passwordTouched: true });
  }

  register = () => {
    const { username, password, email } = this.state;
    this.props.register(username, password, email);
  }


  render() {
    const { currentUser } = this.props;
    if(currentUser) {
      return (<Redirect to="/app/documents" />);
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
      return (<Loading message="Loading user..." />);
    }
    const { username, password, email, usernameTouched, passwordTouched, emailTouched } = this.state;
    return (
      <form>
        <FieldGroup
          id="email"
          validationState={ emailTouched && email == "" ? "error" : null }
          label="Email"
        >
          <FormControl
            componentClass="input"
            value={ email }
            type="email"
            placeholder="Enter email"
            onChange={ this.onEmailChange }
          />
          <FormControl.Feedback />
        </FieldGroup>
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
            value={ password }
            type="password"
            placeholder="Enter password"
            onChange={ this.onPasswordChange }
          />
          <FormControl.Feedback />
        </FieldGroup>
        <Row>
          <Col xs={ 6 }>
            <Button onTouchTap={ this.register }>
              Register
            </Button>
          </Col>
        </Row>
      </form>
    );
  }

}

function mapStateToProps({ currentUser }: ReduxState) {
  const { loading, profile } = currentUser;
  return { loading, currentUser: profile };
}

export default connect(mapStateToProps, { register })(Register);
