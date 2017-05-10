"use strict";

import * as React from "react";
import { Modal } from "react-bootstrap";

import "./style.less";

interface Props {
  message: string;
}

class Loading extends React.Component <Props, void> {

  render() {
    return (
      <Modal show id="loading">
        <Modal.Header>
          <Modal.Title>Loading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="body" > { this.props.message } </p>
        </Modal.Body>
      </Modal>
    );
  }

}

export default Loading;

