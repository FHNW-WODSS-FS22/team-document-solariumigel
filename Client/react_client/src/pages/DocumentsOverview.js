import React, { Component } from "react";
import { Link } from "react-router-dom";

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
      user: "Hans Muster",
      documentName: "Datei-265",
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

  render() {
    return (
      <div>
        <div>
          <p>
            User:{" "}
            <input
              value={this.state.user}
              onChange={(e) => this.setState({ user: e.target.value })}
            />
          </p>
        </div>
        <input
          value={this.state.documentName}
          onChange={(e) => this.setState({ documentName: e.target.value })}
        />
        <button onClick={() => this.createDocument()}>Add new Document</button>
        <br />
        <br />
        Anzahl Dokumente: {this.state.documents.length}
        <br />
        <table>
          <tr>
            <th>Name</th>
            <th></th>
            <th>Owner</th>
            <th></th>
          </tr>
          {this.state.documents.map((document) => (
            <tr key={document.id}>
              <td>
                <Link
                  to={"/documents/" + document.id}
                  state={{ user: this.state.user }}
                  onClick={() => (this.api.selected = document)}
                >
                  {document.name}
                </Link>
              </td>
              <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
              <td>{document.owner}</td>
              <td>
                <button onClick={() => this.deleteDocument(document.id)}>
                  delete
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default DocumentsOverview;
