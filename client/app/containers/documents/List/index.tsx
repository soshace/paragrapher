"use strict";

import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Pagination } from "react-bootstrap";

import { Loading } from "../../../components";
import { readDocuments } from "../../../redux/actions";
import { ReduxState } from "../../../redux/reducers";
import { Document, CurrentUser } from "../../../models";
import { NewDocument } from "../";
import "./style.less";

interface Props {
  readDocuments(user: CurrentUser, options: { page?: number }): void;
  documents: Document[];
  loading: boolean;
  previousPage: number;
  nextPage: number;
  currentUser: CurrentUser;
}

class DocumentsList extends React.Component <Props, void> {

  componentDidMount() {
    const { currentUser } = this.props;
    this.props.readDocuments(currentUser, {});
  }

  render() {
    return (
      <Row className="documents">
        <NewDocument />
        <Col xs={ 6 } xsOffset={ 3 } className="documents__main">
          { this.renderMain() }
        </Col>
      </Row>
    );
  }

  changePage = (eventKey: any) => {
    const { currentUser } = this.props;
    this.props.readDocuments(currentUser, { page: eventKey });
  }

  renderMain() {
    const { loading, documents } = this.props;
    if(loading) {
      return (<Loading message="Loading documents..." />);
    }
    return (
      <div className="documents__list-container">
        <div className="documents__list">
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
        </div>
        { this.renderPager() }
      </div>
    );
  }

  renderPager() {
    const { nextPage, previousPage } = this.props;
    if(!nextPage && !previousPage) {
      return (<div></div>);
    }
    const activePage = nextPage ? nextPage - 1 : previousPage + 1;
    const maxButtons = nextPage ? nextPage : activePage;
    return (
      <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={ nextPage }
        maxButtons={ maxButtons }
        activePage={ activePage }
        onSelect={ this.changePage }
      />
    );
  }

}

function mapStateToProps({ documents, currentUser }: ReduxState) {
  const { list, loading, previousPage, nextPage } = documents;
  const { profile } = currentUser;
  return { documents: list, loading, previousPage, nextPage, currentUser: profile };
}
export default connect(mapStateToProps, { readDocuments })(DocumentsList);
