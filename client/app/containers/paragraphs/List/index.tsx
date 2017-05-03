"use strict";

import * as React from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import * as Swipeable from "react-swipeable";

import { readParagraphs, changeLocation, toggleParagraphLike } from "../../../redux/actions";
import { ReduxState } from "../../../redux/reducers";
import { Paragraph } from "../../../models";
import {  } from "../";
import "./style.less";

interface Props {
  paragraphs: Paragraph[];
  loading: boolean;
  match: { params: { documentId: string } };
  paragraphId?: string;
  readParagraphs(documentId: string, options: { limit?: number, offset?: number }): void;
  toggleParagraphLike(paragraph: Paragraph, like: boolean): void;
  changeLocation(url: string): void;
}

class ParagraphsList extends React.Component <Props, void> {

  paragraphRefs: any;

  constructor(props: Props) {
    super(props);
    this.paragraphRefs = {};
  }

  componentDidMount() {
    const { documentId } = this.props.match.params;
    this.props.readParagraphs(documentId, {});
  }

  componentDidUpdate(prevProps: Props) {
    const { paragraphId } = this.props;
    const paragraphRef = this.paragraphRefs[paragraphId];
    if(paragraphId && paragraphRef) {
      paragraphRef.focus();
    }
  }

  onKeyDown(i: number, event: React.KeyboardEvent<HTMLDivElement>) {
    const { paragraphs } = this.props;
    const { key } = event;
    switch (key) {
      case "ArrowUp":
        this.moveToParagraph(paragraphs[ i - 1 ]);
        break;
      case "ArrowDown":
        this.moveToParagraph(this.paragraphRefs[paragraphs[ i + 1 ].id]);
        break;
      case "ArrowLeft":
        this.toggleParagraphLike(paragraphs[i], false);
        break;
      case "ArrowRight":
        this.toggleParagraphLike(paragraphs[i], true);
        break;
    }
  }

  swipe = (paragraph: Paragraph, deltaX: number) => {
    this.props.toggleParagraphLike(paragraph, deltaX > 0);
  }

  toggleParagraphLike(paragraph: Paragraph, like: boolean) {
    this.props.toggleParagraphLike(paragraph, like);
  }

  moveToParagraph(paragraph: Paragraph) {
    const { documentId } = this.props.match.params;
    this.props.changeLocation(`/app/documents/${documentId}/paragraphs#${paragraph.id}`);
  }

  render() {
    return (
      <Row>
        { this.renderMain() }
      </Row>
    );
  }

  renderMain() {
    const { documentId } = this.props.match.params;
    const { loading, paragraphs } = this.props;
    if(loading) {
      return "Loading...";
    }
    return (
      <Row className="paragraphs-list">
        <Col xs={ 3 }>
          <Link to="/app/documents">
            Back to documents
          </Link>
        </Col>
        <Col xs={ 6 }>
          {
            paragraphs.map((paragraph, i) => {
              return (
                <Row key={ paragraph.id } className="paragraph-wrapper">
                  <Swipeable onSwiped={ (e: any, deltaX: number) => this.swipe(paragraph, deltaX) } >
                    <div
                      id={ paragraph.id }
                      tabIndex={ i }
                      onKeyDown={ this.onKeyDown.bind(this, i) }
                      ref={ (row: HTMLDivElement) => { this.paragraphRefs[paragraph.id] = row; } }
                      className="paragraph"
                    >
                      <Link to={ `/app/documents/${documentId}/paragraphs#${paragraph.id}` }>
                        { paragraph.text }
                      </Link>
                    </div>
                  </Swipeable>
                  <div className={ paragraph.scored ? "scored" : "" }>
                    Score: { paragraph.score }
                  </div>
                </Row>
              );
            })
          }
        </Col>
      </Row>
    );
  }

}

function mapStateToProps({ paragraphs, router }: ReduxState) {
  const { list, loading } = paragraphs;
  const hash = router.location.hash;
  const result: any = { paragraphs: list, loading };
  if(hash != "" && hash.length > 1) {
    result.paragraphId = hash.substr(1);
  }
  return result;
}
const mapDispatchToProps = { changeLocation, readParagraphs, toggleParagraphLike };
export default connect(mapStateToProps, mapDispatchToProps)(ParagraphsList);
