"use strict";

import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import { readParagraphs } from "../../../redux/actions";
import { ReduxState } from "../../../redux/reducers";
import { Paragraph } from "../../../models";
import {  } from "../";
import "./style.less";

interface Props {
  paragraphs: Paragraph[];
  loading: boolean;
  match: { params: { documentId: string } };
  readParagraphs(documentId: string, options: { limit?: number, offset?: number }): void;
}

class ParagraphsList extends React.Component <Props, void> {

  componentDidMount() {
    const { documentId } = this.props.match.params;
    this.props.readParagraphs(documentId, {});
  }

  render() {
    return (
      <Row>
        { this.renderMain() }
      </Row>
    );
  }

  renderMain() {
    const { loading, paragraphs } = this.props;
    if(loading) {
      return "Loading...";
    }
    return (
      <Col xs={ 6 } xsOffset={ 3 }>
        {
          paragraphs.map(function(paragraph) {
            return (
              <Row  key={ paragraph.id } className="paragraph" >
                <Link to={ `/app/paragraphs/${paragraph.id}/paragraphs` }>
                  { paragraph.text }
                </Link>
              </Row>
            );
          })
        }
      </Col>
    );
  }

}

function mapStateToProps({ paragraphs }: ReduxState) {
  const { list, loading } = paragraphs;
  return { paragraphs: list, loading };
}
export default connect(mapStateToProps, { readParagraphs })(ParagraphsList);
