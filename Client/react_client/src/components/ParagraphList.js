import { useEffect, useState } from "react";
import { HubConnectionState } from "@microsoft/signalr";
import Paragraph from "../components/Paragraph";

/**
 *
 * @param props List of all paragraphs component
 */
export default function ParagraphList(props) {
  const { connection, onDeleteParagraph, documentProvider, userProvider} = props;
  const [paragraphItems, setParagraphItems] = useState(props.paragraphItems);

  /**
   * Constructor
   */
  useEffect(() => {    
    if (props.connection && props.connection.state  !== HubConnectionState.Connected) {
      connection.on("ListenForCreateParagraph", listenForCreateParagraph);
      connection.on("ListenForDeleteParagraph", listenForDeleteParagraph);
      connection.on("ResortParagraphs", resortParagraphs);
    }
  });

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
    const sorted = documentProvider.getParagraphItems().sort((a, b) => b.props.paragraph.position < a.props.paragraph.position ? 1 : -1);
    setParagraphItems(sorted);
  }

  /**
   * Sort all paragraphs according to their position
   */
  const resortParagraphs = () => {
    console.log("resortParagraphs")
    sortParagraphs()
  };

  return (    
    <div className="paragraphs">
      {paragraphItems && documentProvider.getParagraphItems() != null && (
        <ul>
          {documentProvider.getParagraphItems()}
        </ul>
      )}
    </div>
  );
}
