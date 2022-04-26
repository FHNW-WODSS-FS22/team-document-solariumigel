import { useEffect, useState } from "react";

/**
 * Paragraph component
 * @param {object} props
 * @returns
 */
export default function Paragraph(props) {
  const { connection, documentId, paragraph, onDelete } = props;
  const [message, setMessage] = useState(props.message);

  /**
   * Constructor
   */
  useEffect(() => {
    if (props.connection) {
      connection.on("ListenForMessage", listenForMessage);
    }
  });

  /**
   * Update the message of the paragraph
   * @param {object} e
   */
  const updateMessage = (e) => {
    connection.send(
      "UpdateMessage",
      documentId,
      paragraph.id,
      1,
      1,
      e.target.value,
      ""
    );
  };

  /**
   * Listen for an update of a message
   * @param {object} paragraph
   */
  const listenForMessage = (paragraphId, sP, eP, message) => {
    if (paragraph.id == paragraphId) {
      setMessage(message);
    }
  };

  return (
    <div>
      <div className="paragraph__header">
        Paragraph owner: {paragraph.owner}
        <button onClick={() => onDelete(paragraph.id)}>Delete Paragraph</button>
      </div>
      <textarea
        rows="4"
        cols="40"
        onChange={(e) => updateMessage(e)}
        value={message}
      ></textarea>
    </div>
  );
}
