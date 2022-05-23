import { useEffect, useState } from "react";
import { HubConnectionState } from "@microsoft/signalr";
import Paragraph from "../components/Paragraph";

/**
 *
 * @param props List of all paragraphs component
 */
export default function ParagraphList(props) {
  const { connection, onDeleteParagraph, documentProvider, userProvider} = props;
  const [paragraphhtmlItems, setParagraphhtmlItems] = useState(props.paragraphItems);

  /**
   * Constructor
   */
  useEffect(() => {    
    if (connection) {
      connection.on("ListenForCreateParagraph", listenForCreateParagraph);
      connection.on("ListenForDeleteParagraph", listenForDeleteParagraph);
      connection.on("ResortParagraphs", resortParagraphs);
    }
    return() => {
      connection.off("ListenForCreateParagraph");
      connection.off("ListenForDeleteParagraph");
      connection.off("ResortParagraphs");
    }
  }, [connection]);

  /**
   * Listen for deletion of a paragraph
   * @param {object} paragraphId
   */
   const listenForDeleteParagraph = (paragraphId) => {
    documentProvider.removeParagraph(paragraphId)
    documentProvider.removeParagraphItem(paragraphId)
    sortParagraphs();
  };
  
  /**
   * Listen for creation of a paragraph
   * @param {object} paragraph
   */
  const listenForCreateParagraph = (paragraph) => {
    const paragraphItem = (<Paragraph
            connection={connection}
            documentId={documentProvider.getDocument().id}
            paragraph={paragraph}
            documentProvider={documentProvider}
            text={paragraph.text}
            position={paragraph.position}
            userProvider={userProvider}
            key={paragraph.id}
            onDelete={(id) => onDeleteParagraph(id)}/>)
    documentProvider.addParagraph(paragraph);
    documentProvider.addParagraphItem(paragraphItem);
    sortParagraphs();
  };

  const sortParagraphs = () => {
    const sorted = documentProvider.getParagraphItems().slice(0).sort((a, b) => a.props.paragraph.position > b.props.paragraph.position ? 1 : -1);
    documentProvider.setParagraphItems(sorted)
    setParagraphhtmlItems(sorted);
  }

  /**
   * Sort all paragraphs according to their position
   */
  const resortParagraphs = () => {
    sortParagraphs()
  };

  return (    
    <div className="paragraphs">
      {paragraphhtmlItems != null && (
        <ul>
          {documentProvider.getParagraphItems()}
        </ul>
      )}
    </div>
  );
}
