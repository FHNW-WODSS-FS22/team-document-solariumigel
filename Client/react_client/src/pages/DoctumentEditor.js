import { useEffect, useState } from "react";
import { HubConnectionState } from "@microsoft/signalr";
import { Link, useParams  } from "react-router-dom";
import ParagraphList from "../components/ParagraphList";
import Paragraph from "../components/Paragraph";

/**
 * Editor component
 */
export default function DoctumentEditor(props) {
  const { api, connectionBuilder, documentProvider, userProvider } = props;
  const [connection, setConnection] = useState();
  const [document, setDocument] = useState();
  const [paragraphs, setParagraphs] = useState();
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
        documentProvider.setDocument(doc)
        setDocument(doc)
      });
    }
  }, [api]);

  useEffect(() => {
    if(connection && connection.state !== HubConnectionState.Connected)
    {
      connection.start().then(() => {
        if(userProvider.getUser()){
          connection.send("AddToDocumentWithUser", api.selected.id, userProvider.getUser());
        }
        else{
          connection.send("AddToDocument", api.selected.id);
        }
        
        connection.on("SetUserId", listenForDocument);
        connection.on("ListenForCreateParagraph", listenForCreateParagraph);
        connection.on("ListenForDeleteParagraph", listenForDeleteParagraph);
      });
    }
  }, [connection]);

  /**
 * Listen for deletion of a paragraph
 * @param {object} paragraphId
 */
  const listenForDeleteParagraph = (paragraphId) => {
    documentProvider.removeParagraph(paragraphId)
    setParagraphs(documentProvider.getParagraphs())
  };
  
  /**
   * Listen for creation of a paragraph
   * @param {object} paragraph
   */
  const listenForCreateParagraph = (paragraph) => {
    documentProvider.addParagraph(paragraph)
    /setParagraphs(documentProvider.getParagraphs())
  };


  /**
   * Create a new paragraph
   */
  const createParagraph = () => {
    connection.send("CreateParagraph", api.selected.id, userProvider.getUser());
  };

  /**
   * Listen for document
   * @param {object} paragraphId
   */
  const listenForDocument = (user) => {
    userProvider.setUser(user);
    setUser(user);
  };

  /**
 * Delete a paragraph
 * @param {object} paragraphId
 */
  const deleteParagraph = (paragraphId) => {
    connection.send("DeleteParagraph", document.id, paragraphId);
  };

  const onChange  = (paragraphId) => {
    documentProvider.removeParagraph(paragraphId)
    setParagraphs(documentProvider.getParagraphs())
  }

  const ConverToItems = () => {
    if(documentProvider.hasParagraphs() == false)
    {
      return;
    }
    const sorted = documentProvider.getParagraphs().sort((a, b) => { return a.position > b.position ? 1 : -1});
    const sortedItems = sorted.map(paragraph => {
      return <Paragraph
        connection={connection}
        documentId={document.id}
        paragraph={paragraph}
        text={paragraph.text}
        position={paragraph.position}
        userProvider={userProvider}
        key={paragraph.id}
        onDelete={deleteParagraph}
      />
    })
    return sortedItems;
  }

  const NavigateBack = () => {
    connection.send("RemoveFromDocument", api.selected.id, userProvider.getUser());
    connection.off();
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
              <p className="userName">User: {userProvider.getUser()}</p>
            </div>
          </div>
          <div className="userLeft">adfasdfasdf</div>
          <div className={Math.random()}>
            <ParagraphList
              connection={connection}
              documentId={document.id}
              documentProvider={documentProvider}
              userProvider={userProvider}
              paragraphItems={ConverToItems()}
              onDeleteParagraph={deleteParagraph}
              onChange={onChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
