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
    connection.send("CreateParagraph", documentId, user, paragraphs.length);
  };

  /**
   * Update a paragraph
   * @param {object} paragraph
   */
  const updateParagraph = (paragraph) => {
    const copy = [...paragraphs.filter((p) => p.id !== paragraph.id)];
    setParagraphs([copy, paragraph]);
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

  /**
   * Sort all paragraphs according to their position
   */
  const sortParagraphs = () => {
    const copy = [...paragraphs];
    copy.sort((a, b) => a.position > b.position);
    console.log(copy);
    setParagraphs(copy);
  };

  return (
    <div>
      <button onClick={() => createParagraph()}>Add Paragraph</button>
      {paragraphs.map((paragraph) => (
        <Paragraph
          connection={connection}
          documentId={documentId}
          paragraph={paragraph}
          numberOfParagraphs={paragraphs.length}
          onDelete={deleteParagraph}
        />
      ))}
    </div>
  );
}
