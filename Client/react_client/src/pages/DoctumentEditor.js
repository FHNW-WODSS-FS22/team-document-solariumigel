import { useEffect, useState } from "react";
import { HubConnectionState } from "@microsoft/signalr";
import { Link, useParams  } from "react-router-dom";
import ParagraphList from "../components/ParagraphList";
import Paragraph from "../components/Paragraph";

/**
 * Editor component
 */
export default function DoctumentEditor(props) {
  const { api, connectionBuilder } = props;
  const [connection, setConnection] = useState();
  const [document, setDocument] = useState();
  const [user, setUser] = useState();
  const { id } = useParams();

  /**
   * Constructor
   */
  useEffect(() => {
    setConnection(connectionBuilder.buildConnection());
  }, []);

  useEffect(()  => {
    if(api)
    {
      api.getDocument(id).then(doc => {
        setDocument(doc);
      });
    }
  }, [api]);

  useEffect(() => {
    if(connection && connection.state  !== HubConnectionState.Connected)
    {
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
    connection.send("CreateParagraph", api.selected.id, user);
  };

  /**
   * Listen for document
   * @param {object} paragraphId
   */
  const listenForDocument = (userId) => {
    setUser(userId)
  };

  /**
 * Delete a paragraph
 * @param {object} paragraphId
 */
  const deleteParagraph = (paragraphId) => {
    connection.send("DeleteParagraph", document.id, paragraphId);
  };

  const ConverToItems = () => {
    console.log("ConverToItems")
    const sorted = document.paragraph.sort((a, b) => { return a.position > b.position ? 1 : -1});
    const sortedItems = sorted.map(paragraph => {
      return <Paragraph
        connection={connection}
        documentId={document.id}
        paragraph={paragraph}
        text={paragraph.text}
        position={paragraph.position}
        user={user}
        key={paragraph.id}
        onDelete={deleteParagraph}
      />
    })
    return sortedItems;
  }

  const NavigateBack = () => {
    connection.send("RemoveFromDocument", api.selected.id, user);
    connection.stop();
  }

  return (
    <div>
      {document != null && (
        <div>
          <div className="top">
            <div className="topLeft">
              <Link className="backArrow" onClick={NavigateBack} to={"/"}></Link>
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
            paragraphs={document.paragraph}
            paragraphItems={ConverToItems()}
          />
        </div>
      )}
    </div>
  );
}
