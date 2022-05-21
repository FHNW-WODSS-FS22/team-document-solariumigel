import { useEffect, useState } from "react";
import { HubConnectionState } from "@microsoft/signalr";
import Paragraph from "../components/Paragraph";

/**
 *
 * @param props List of all paragraphs component
 */
export default function ParagraphList(props) {
  const { connection, documentId, onDeleteParagraph, onChange, documentProvider, userProvider} = props;
  const [paragraphItems, setParagraphItems] = useState(props.paragraphItems);

  /**
   * Constructor
   */
  useEffect(() => {    
    if (props.connection && props.connection.state  !== HubConnectionState.Connected) {
      console.log("useEffect")
      connection.on("ListenForCreateParagraph", listenForCreateParagraph);
      connection.on("ListenForDeleteParagraph", listenForDeleteParagraph);
      connection.on("ResortParagraphs", resortParagraphs);
    }
  });

  // useEffect(() => {
  //   console.log("dafdadf")
  // }, [paragraphItems])

  /**
   * Listen for deletion of a paragraph
   * @param {object} paragraphId
   */
   const listenForDeleteParagraph = (paragraphId) => {
    console.log("paragraphItems")
    console.log(paragraphItems)
    setParagraphItems((paragraphItems.filter((paragraph) => paragraph.props.paragraph.id !== paragraphId)));
    onChange(paragraphId)
  };
  
  /**
   * Listen for creation of a paragraph
   * @param {object} paragraph
   */
  const listenForCreateParagraph = (paragraph) => {
    const paragraphItem = (<Paragraph
            connection={connection}
            documentId={documentId}
            paragraph={paragraph}
            text={paragraph.text}
            position={paragraph.position}
            userProvider={userProvider}
            key={paragraph.id}
            onDelete={onDeleteParagraph}
          />)
    sortParagraphs(paragraphItems.concat(paragraphItem));
  };

  const sortParagraphs = (paramItems) => {
    const sorted = paramItems.sort((a, b) => b.props.paragraph.position < a.props.paragraph.position ? 1 : -1);    
    setParagraphItems(sorted);
  }

  /**
   * Sort all paragraphs according to their position
   */
  const resortParagraphs = () => {
    sortParagraphs([...paragraphItems])
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
