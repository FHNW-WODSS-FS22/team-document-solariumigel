import React, { Component } from "react";
import { Link } from "react-router-dom";
import ParagraphList from "../components/ParagraphList";

/**
 * Editor component
 */
class DoctumentEditor extends Component {
  /**
   * Constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.api = props.api;
    this.connectionBuilder = props.connectionBuilder;
    this.state = {
      connection: null,
      document: this.props.api.selected,
      user: null,
    };
  }

  /**
   * Called when component did mount
   */
  componentDidMount() {
    this.createConnection();
  }

  /**
   * Create connection to hub through singalR
   */
  createConnection() {
    this.setState(
      {
        connection: this.connectionBuilder.buildConnection(),
      },
      () => {
        this.state.connection.start().then(() => {
          this.state.connection.send("AddToDocument", this.api.selected.id);
          this.state.connection.on("SetUserId", this.listenForDocument);
        });
      }
    );
  }

  listenForDocument(userId, document) {
    this.setState({ user: userId });
  }

  render() {
    return (
      <div>
        <Link to={"/"}>back to the overview</Link>
        {this.state.document != null && (
          <div>
            Document name: {this.state.document.name}
            <br />
            Document Owner: {this.state.document.owner}
            <br />
            Current User: {this.state.user}
            <br />
            <br />
            <ParagraphList
              connection={this.state.connection}
              documentId={this.state.document.id}
              paragraphs={this.state.document.paragraph}
            />
          </div>
        )}
      </div>
    );
  }
}

export default DoctumentEditor;
