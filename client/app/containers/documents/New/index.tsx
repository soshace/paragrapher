"use strict";

import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, FormGroup, FormControl, Button } from "react-bootstrap";

import { createDocument } from "../../../redux/actions";
import { ReduxState } from "../../../redux/reducers";
import { Document, CurrentUser } from "../../../models";
import "./style.less";

interface Props {
  createDocument(text: string, user: CurrentUser): void;
  loading: boolean;
  currentUser: CurrentUser;
}

interface State {
  text: string;
  valid: boolean;
}

class NewDocument extends React.Component <Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { text: "", valid: true };
  }

  onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    const valid = text != "";
    this.setState({ text, valid });
  }

  getValidationState() {
    return this.state.valid ? "success" : "error";
  }

  save = (event: React.TouchEventHandler<HTMLButtonElement>) => {
    const { text } = this.state;
    const { currentUser } = this.props;
    if(text == "") {
      this.setState({ valid: false });
    } else {
      this.props.createDocument(text, currentUser);
      this.setState({ text: "" });
    }
  }

  render() {
    return (
      <Row  className="new-document">
        <Col xs={ 6 } xsOffset={ 3 }>
          { this.renderMain() }
        </Col>
      </Row>
    );
  }

  renderMain() {
    const { loading } = this.props;
    if(loading) {
      return "Saving...";
    }
    return (
      <form>
        <FormGroup
          controlId="newDocumentText"
          validationState={ this.getValidationState() }
        >
          <FormControl
            componentClass="textarea"
            value={ this.state.text }
            placeholder="Enter text"
            onChange={ this.onChange }
          />
          <FormControl.Feedback />
        </FormGroup>
        <Button onTouchTap={ this.save }>
          Publish
        </Button>
      </form>
    );
  }

}

function mapStateToProps({ documents, currentUser }: ReduxState) {
  const { saving } = documents.form;
  const { profile } = currentUser;
  return { loading: saving, currentUser: profile };
}
export default connect(mapStateToProps, { createDocument })(NewDocument);
