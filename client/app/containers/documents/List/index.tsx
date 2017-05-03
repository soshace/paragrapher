"use strict";

import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import { readDocuments } from "../../../redux/actions";
import { ReduxState } from "../../../redux/reducers";
import { Document } from "../../../models";
import "./style.less";

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
        { this.renderMain() }
      </Row>
    );
  }

  renderMain() {
    const { loading, documents } = this.props;
    if(loading) {
      return "Loading...";
    }
    return (
      <Col xs={ 6 } xsOffset={ 3 }>
        {
          documents.map(function(document) {
            return (
              <Row  key={ document.id } className="document" >
                <Link to={ `/app/documents/${document.id}/paragraphs` }>
                  { document.title }
                </Link>
              </Row>
            );
          })
        }
      </Col>
    );
  }

}

function mapStateToProps({ documents }: ReduxState) {
  const { list, loading } = documents;
  return { documents: list, loading };
}
export default connect(mapStateToProps, { readDocuments })(DocumentsList);
