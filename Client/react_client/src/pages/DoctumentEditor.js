import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ParagraphList from "../components/ParagraphList";

/**
 * Editor component
 */
export default function DoctumentEditor(props) {
  const { api, connectionBuilder } = props;
  const [connection, setConnection] = useState();
  const [document, setDocument] = useState();
  const { user } = useLocation().state;

  /**
   * Constructor
   */
  useEffect(() => {
    setConnection(connectionBuilder.buildConnection());
  }, []);

  useEffect(() => {
    if (api) {
      setDocument(api.selected);
    }
    if (connection) {
      connection.start().then(() => {
        connection.send("AddToDocument", document.id);
        connection.on("SetUserId", listenForDocument);
      });
    }
  }, [connection]);

  /**
   * Listen for document
   * @param {object} paragraphId
   */
  const listenForDocument = (userId) => {
    // this.setState({ user: userId });
  };

  return (
    <div>
      <Link to={"/"}>back to the overview</Link>
      {document != null && (
        <div>
          <p>Document name: {document.name}</p>
          <p>Document Owner: {document.owner}</p>
          <p>Current User: {user}</p>
          <ParagraphList
            connection={connection}
            documentId={document.id}
            user={user}
            paragraphs={document.paragraph}
          />
        </div>
      )}
    </div>
  );
}
