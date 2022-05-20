import { useEffect, useState } from "react";
import { HubConnectionState } from "@microsoft/signalr";
import Paragraph from "../components/Paragraph";

/**
 *
 * @param props List of all paragraphs component
 */
export default function ParagraphList(props) {
  const { connection, documentId, user } = props;
  const [paragraphs, setParagraphs] = useState(props.paragraphs);
  const [paragraphItems, setParagraphItems] = useState(props.paragraphItems);

  /**
   * Constructor
   */
  useEffect(() => {    
    if (props.connection && props.connection.state  !== HubConnectionState.Connected) {
      connection.on("ListenForCreateParagraph", listenForCreateParagraph);
      connection.on("ListenForDeleteParagraph", listenForDeleteParagraph);
      connection.on("ResortParagraphs", sortParagraphs);
    }
  });

  /**
   * Listen for deletion of a paragraph
   * @param {object} paragraphId
   */
   const listenForDeleteParagraph = (paragraphId) => {
    setParagraphs(paragraphs.filter((paragraph) => paragraph.id !== paragraphId));

    setParagraphItems((paragraphItems.filter((paragraph) => paragraph.props.paragraph.id !== paragraphId)));
  };
  
  /**
   * Listen for creation of a paragraph
   * @param {object} paragraph
   */
  const listenForCreateParagraph = (paragraph) => {
    const paragraphItem = <Paragraph
            connection={connection}
            documentId={documentId}
            paragraph={paragraph}
            text={paragraph.text}
            position={paragraph.position}
            user={user}
            key={paragraph.id}
            // onDelete={deleteParagraph}
          />
    setParagraphItems(paragraphItems.concat(paragraphItem));
    setParagraphs(paragraphs.concat(paragraph));
    sortParagraphs();
  };

  /**
   * Sort all paragraphs according to their position
   */
  const sortParagraphs = () => {
    console.log("sortParagraphs");
    const sorted = [...paragraphItems].sort((a, b) => b.props.paragraph.position < a.props.paragraph.position ? 1 : -1);    
    setParagraphItems(sorted);
  };

  return (    
    <div className="paragraphs">
      {paragraphItems != null && (
        <ul>
          {paragraphItems}
        </ul>
      )}
    </div>
  );
}
