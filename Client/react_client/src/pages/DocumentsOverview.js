import React, { Component } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
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
    this.userProvider = props.userProvider;
    this.state = {
      documents: [],
      documentName: "",
      addDocumentPopup: false,
      loginPopup: false
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
    if(!this.userProvider.getUser()){
      this.userProvider.setUser(uuidv4())
    }
    this.api
      .createDocument({ Owner: this.userProvider.getUser(), Name: this.state.documentName })
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
            userProvider = {this.userProvider}
            trigger={this.state.loginPopup} 
            setTrigger={() => this.setState({loginPopup: false})}>
          </LoginPopup>
          <AddDocumentPopup  
            onChange={(value) => {this.changeDocumentName(value);}} 
            trigger={this.state.addDocumentPopup} 
            setTrigger={() => this.setState({addDocumentPopup: false})}
            createDoc = {() => this.createDocument()}>
          </AddDocumentPopup>
        </div>
        <div className="documents">
          {this.state.documents.map((document) => (
              <div key={document.id} className="card">
                <Link
                      to={"/documents/" + document.id}
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
