import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddDocumentPopup from "../components/AddDocumentPopup";
import LoginPopup from "../components/LoginPopup";

/**
 * Overview Component
 */
class DocumentsOverview extends Component {
  /**
   * Constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.api = props.api;
    this.state = {
      documents: [],
      user: "",
      documentName: "",
      addDocumentPopup: false,
      loginPopup: false,
    };
  }

  /**
   * Called when component did mount
   */
  componentDidMount() {
    this.fetchDocuments();
  }

  /**
   * Fetch all documents
   */
  fetchDocuments() {
    this.api.fetchDocuments().then(() => {
      this.setState({ documents: [...this.api.documents] });
    });
  }

  /**
   * Create a new document
   */
  createDocument() {
    this.api
      .createDocument({ Owner: this.state.user, Name: this.state.documentName })
      .then(() => {
        this.setState({ documents: [...this.api.documents] });
      });
  }

  /**
   * Delete a document
   * @param {object} documentId
   */
  deleteDocument(documentId) {
    this.api.deleteDocument(documentId).then(() => {
      this.setState({ documents: [...this.api.documents] });
    });
  }

  changeDocumentName(value){
    this.setState({ documentName: value})
  }

  changeUserName(value){
    this.setState({ user: value})
  }

  render() {
    return (
      <div>
        <div className="top">
          <div className="topLeft">
            <h1 className="documentTitle">
                Documents
            </h1>
            <button className="addDocument" onClick={() => this.setState({addDocumentPopup: true})}>
            </button> 
          </div>
          <div className="rightTop">
            <button className="user" onClick={() => this.setState({loginPopup: true})}>
            </button>
          </div>
        </div>
        <div className="documentContent">
        <LoginPopup
                onChange={(value) => {this.changeUserName(value);}} 
                trigger={this.state.loginPopup} 
                setTrigger={() => this.setState({loginPopup: false})}
                >
                </LoginPopup>
          <AddDocumentPopup  
            onChange={(value) => {this.changeDocumentName(value);}} 
            trigger={this.state.addDocumentPopup} 
            setTrigger={() => this.setState({addDocumentPopup: false})}
            createDoc = {() => this.createDocument({Owner: this.state.user, Name: this.state.documentName })}
          >
          </AddDocumentPopup>
        </div>
        <div className="documents">
          {this.state.documents.map((document) => (
              <div key={document.id} className="card">
                <Link
                      to={"/documents/" + document.id}
                      state={{user: this.state.user}}
                      onClick={() => (this.api.selected = document)}
                      style={{ textDecoration: 'none' }}
                  >
                  <img className="docImg" src="https://picsum.photos/400"/>
                  <div>
                    <div className="docName"> {document.name}</div>
                    <div className="docOwner"> Owner: {document.owner}</div>
                  </div>
                  </Link>
                  <button className="deleteBtn" onClick={(e) => this.deleteDocument(document.id)}>
                  </button>
              </div>
          ))}
        </div>
      </div>
    );
  }
}

export default DocumentsOverview;
