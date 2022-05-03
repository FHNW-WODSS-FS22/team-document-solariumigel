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
  const [paragraphs, setParagraphs] = useState();

  /**
   * Constructor
   */
  useEffect(() => {
    setConnection(connectionBuilder.buildConnection());
  }, []);

  useEffect(() => {
    if (api) {
      setDocument(api.selected);
      setParagraphs(api.selected.paragraph);
    }
    if (connection) {
      connection.start().then(() => {
        connection.send("AddToDocument", api.selected.id);
        connection.on("SetUserId", listenForDocument);
      });
    }
  }, [connection]);


  /**
   * Create a new paragraph
   */
  const createParagraph = () => {
    connection.send("CreateParagraph", api.selected.id, user, paragraphs.length);
  };

  /**
   * Listen for document
   * @param {object} paragraphId
   */
  const listenForDocument = (userId) => {
    // this.setState({ user: userId });
  };
  
  return (
    <div>
      {document != null && (
        <div>
          <div className="top">
            <div className="topLeft">
              <Link className="backArrow" to={"/"}></Link>
              <div className="documentTitle">{document.name}</div>
              <button className="addParagraph" onClick={() => createParagraph()}></button>
            </div>
            <div className="rightTop">
              <p>Document Owner: {document.owner}</p>
              <p className="userName">User: {user}</p>
            </div>
          </div>
          <ParagraphList
            connection={connection}
            documentId={document.id}
            user={user}
            paragraphs={paragraphs}
          />
        </div>
      )}
    </div>
  );
}
