import { useEffect, useState } from "react";
import { HubConnectionState } from "@microsoft/signalr";
import { Link, useParams } from "react-router-dom";
import ParagraphList from "../components/ParagraphList";
import Paragraph from "../components/Paragraph";

/**
 * Editor component
 */
export default function DoctumentEditor(props) {
  const { api, connectionBuilder, documentProvider, userProvider } = props;
  const [connection, setConnection] = useState();
  const [document, setDocument] = useState();
  const [, setUser] = useState();
  const [, setDocumentUsers] = useState([]);
  const { id } = useParams();

  /**
   * Constructor
   */
  useEffect(() => {
    setConnection(connectionBuilder.buildConnection());
  }, [connectionBuilder]);

  useEffect(() => {
    if (api) {
      api.getDocument(id).then((doc) => {
        documentProvider.setDocument(doc);
        setDocument(doc);
      });
    }
  }, [api, documentProvider, id]);

  useEffect(() => {
    if (connection && connection.state !== HubConnectionState.Connected) {
      connection.on("SetCurrentUser", setCurrentUser);
      connection.on("SetUserId", setUserId);
      connection.on("UnSetUserId", unSetUserId);

      connection.start().then(() => {
        if (userProvider.getUser()) {
          connection.send(
            "AddToDocumentWithUser",
            documentProvider.getDocument().id,
            userProvider.getUser()
          );
        } else {
          connection.send("AddToDocument", documentProvider.getDocument().id);
        }
      });
    }
  }, [document]);

  /**
   * Create a new paragraph
   */
  const createParagraph = () => {
    connection.send(
      "CreateParagraph",
      documentProvider.getDocument().id,
      userProvider.getUser()
    );
  };

  /**
   * Listen for document
   * @param {object} paragraphId
   */
  const setCurrentUser = (user) => {
    userProvider.setUser(user);
    documentProvider.setDocumentUser([user]);
    setUser(user);
  };

  const setUserId = (user) => {
    documentProvider.addUser(user);
    setDocumentUsers(documentProvider.getUsers());
  };

  const unSetUserId = (user) => {
    documentProvider.removeUser(user);
    setDocumentUsers(documentProvider.getUsers());
  };

  /**
   * Delete a paragraph
   * @param {object} paragraphId
   */
  const deleteParagraph = (paragraphId) => {
    connection.send("DeleteParagraph", document.id, paragraphId);
  };

  const ConverToItems = () => {
    if (documentProvider.hasParagraphs() === false) {
      return;
    }
    const sorted = documentProvider.getParagraphs().sort((a, b) => {
      return a.position > b.position ? 1 : -1;
    });
    const sortedItems = sorted.map((paragraph) => {
      return (
        <Paragraph
          connection={connection}
          documentId={document.id}
          paragraph={paragraph}
          text={paragraph.text}
          position={paragraph.position}
          userProvider={userProvider}
          documentProvider={documentProvider}
          key={paragraph.id}
          onDelete={deleteParagraph}
        />
      );
    });

    documentProvider.setParagraphItems(sortedItems);
    return sortedItems;
  };

  const NavigateBack = () => {
    connection.send(
      "RemoveFromDocument",
      documentProvider.getDocument().id,
      userProvider.getUser()
    );
    documentProvider.setDocumentUser([]);
    connection.off();
    connection.stop();
  };

  return (
    <div>
      {document != null && (
        <div>
          <div className="top">
            <div className="topLeft">
              <Link
                className="backArrow"
                onClick={NavigateBack}
                to={"/"}
              ></Link>
              <div className="documentTitle">{document.name}</div>
              <button
                className="addParagraph"
                onClick={() => createParagraph()}
              ></button>
            </div>
            <div className="rightTop">
              <p>Document Owner: {document.owner}</p>
              <p className="userName">User: {userProvider.getUser()}</p>
            </div>
          </div>
          <div className="userLeft">
            <ul>
              {documentProvider.getUsers() &&
                documentProvider.getUsers().map((u) => <p key={u}>{u}</p>)}
            </ul>
          </div>
          <div className={Math.random()}>
            <ParagraphList
              connection={connection}
              documentProvider={documentProvider}
              userProvider={userProvider}
              paragraphItems={ConverToItems()}
              onDeleteParagraph={deleteParagraph}
            />
          </div>
        </div>
      )}
    </div>
  );
}
