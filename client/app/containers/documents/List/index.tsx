"use strict";

import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Pagination } from "react-bootstrap";

import { readDocuments } from "../../../redux/actions";
import { ReduxState } from "../../../redux/reducers";
import { Document, CurrentUser } from "../../../models";
import { NewDocument } from "../";
import "./style.less";

interface Props {
  readDocuments(user: CurrentUser, options: { page?: number }): void;
  documents: Document[];
  loading: boolean;
  currentPage: number;
  pagesCount: number;
  currentUser: CurrentUser;
}

class DocumentsList extends React.Component <Props, void> {

  componentDidMount() {
    const { currentUser } = this.props;
    this.props.readDocuments(currentUser, {});
  }

  render() {
    return (
      <Row>
        <NewDocument />
        <Col xs={ 6 } xsOffset={ 3 } className="documents-list">
          { this.renderMain() }
        </Col>
      </Row>
    );
  }

  changePage = (eventKey: any) => {
    this.props.readDocuments({ page: eventKey });
  }

  renderMain() {
    const { loading, documents } = this.props;
    if(loading) {
      return "Loading...";
    }
    return (
      <div className="documents-list" >
        {
          documents.map(function(document: Document) {
            return (
              <Row  key={ document.id } className="document" >
                <Link to={ `/app/documents/${document.id}/paragraphs` }>
                  { document.name }
                </Link>
              </Row>
            );
          })
        }
        { this.renderPager() }
      </div>
    );
  }

  renderPager() {
    const { pagesCount, currentPage } = this.props;
    if(!(pagesCount > 0)) {
      return (<div></div>);
    }
    return (
      <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={ pagesCount }
        maxButtons={ 5 }
        activePage={ currentPage }
        onSelect={ this.changePage }
      />
    );
  }

}

function mapStateToProps({ documents, currentUser }: ReduxState) {
  const { list, loading, currentPage, pagesCount } = documents;
  const { profile } = currentUser;
  return { documents: list, loading, currentPage, pagesCount, currentUser: profile };
}
export default connect(mapStateToProps, { readDocuments })(DocumentsList);
