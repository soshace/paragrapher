"use strict";

import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";

import { readDocuments } from "../../../redux/actions";
import { ReduxState } from "../../../redux/reducers";
import { Document } from "../../../models";

interface Props {
  readDocuments({ offset, limit }: { offset?: number; limit?: number; }): void;
  documents: Document[];
  loading: boolean;
}

class DocumentsList extends React.Component <Props, void> {

  componentDidMount() {
    this.props.readDocuments({});
  }

  render() {
    return (
      <Row>

      </Row>
    );
  }

}

function mapStateToProps({ documents }: ReduxState) {
  const { list, loading } = documents;
  return { documents: list, loading };
}
export default connect(mapStateToProps, { readDocuments })(DocumentsList);
