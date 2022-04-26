import { useEffect, useState } from "react";
import Paragraph from "../components/Paragraph";

/**
 *
 * @param props List of all paragraphs component
 */
export default function ParagraphList(props) {
  const { connection, documentId, user } = props;
  const [paragraphs, setParagraphs] = useState(props.paragraphs);

  /**
   * Constructor
   */
  useEffect(() => {
    if (props.connection) {
      connection.on("ListenForCreateParagraph", listenForCreateParagraph);
      connection.on("ListenForDeleteParagraph", listenForDeleteParagraph);
    }
  });

  /**
   * Create a new paragraph
   */
  const createParagraph = () => {
    connection.send("CreateParagraph", documentId, user);
  };

  /**
   * Delete a paragraph
   * @param {object} paragraphId
   */
  const deleteParagraph = (paragraphId) => {
    connection.send("DeleteParagraph", documentId, paragraphId);
  };

  /**
   * Listen for creation of a paragraph
   * @param {object} paragraph
   */
  const listenForCreateParagraph = (paragraph) => {
    setParagraphs([...paragraphs, paragraph]);
  };

  /**
   * Listen for deletion of a paragraph
   * @param {object} paragraphId
   */
  const listenForDeleteParagraph = (paragraphId) => {
    setParagraphs(
      paragraphs.filter((paragraph) => paragraph.id !== paragraphId)
    );
  };

  return (
    <div>
      <button onClick={() => createParagraph()}>Add Paragraph</button>
      {paragraphs != null &&
        paragraphs.map((paragraph) => (
          <Paragraph
            connection={connection}
            documentId={documentId}
            paragraph={paragraph}
            message={paragraph.text}
            onDelete={deleteParagraph}
          />
        ))}
    </div>
  );
}
