import { useEffect, useState } from "react";

/**
 * Paragraph component
 * @param {object} props
 * @returns
 */
export default function Paragraph(props) {
  const { connection, documentId, numberOfParagraphs, onDelete } = props;
  const [paragraph, setParagraph] = useState(props.paragraph);
  const [message, setMessage] = useState(props.message);
  const [position, setPosition] = useState(props.position);

  /**
   * Constructor
   */
  useEffect(() => {
    if (props.connection) {
      connection.on("ListenForMessage", listenForMessage);
      connection.on("ListenForPosition", listenForPosition);
    }
  });

  /**
   * Update the message of the paragraph
   * @param {string} message
   */
  const updateMessage = (message) => {
    connection.send("UpdateMessage", documentId, paragraph.id, message);
  };

  /**
   * Listen for an update of a message
   * @param {int} paragraphId
   * @param {int} message
   */
  const listenForMessage = (paragraphId, message) => {
    if (paragraph.id === paragraphId) {
      setMessage(message);
    }
  };

  /**
   * Move position of paragraph up by one
   */
  const movePositionUp = () => {
    // Increase new position by one
    const newPosition = position + 1;
    // Check if position would be higher than total numbers of paragraphs
    if (newPosition >= numberOfParagraphs) return;
    // Update the position of the paragraph
    updatePosition(newPosition);
  };

  /**
   * Move position of paragraph down by one
   */
  const movePositionDown = () => {
    // Decrease new position by one
    const newPosition = position - 1;
    // Check if position would be below zero
    if (newPosition < 0) return;
    // Update the position of the paragraph
    updatePosition(newPosition);
  };

  /**
   * Update the position of the paragraph
   * @param {int} position
   */
  const updatePosition = (position) => {
    connection.send("UpdatePosition", documentId, paragraph.id, position);
  };

  /**
   * Listen for an update of the position
   * @param {int} paragraphId
   * @param {int} position
   */
  const listenForPosition = (paragraphId, position) => {
    if (paragraph.id === paragraphId) {
      setPosition(position);
    }
  };

  return (
    <div>
      <div className="paragraph__header">
        Paragraph owner: {paragraph.owner}
        <button onClick={() => onDelete(paragraph.id)}>Delete Paragraph</button>
        <button onClick={() => movePositionUp()}>Up</button>
        {position}
        <button onClick={() => movePositionDown()}>Down</button>
      </div>
      <textarea
        rows="4"
        cols="40"
        onChange={(e) => updateMessage(e.target.value)}
        value={message}
      ></textarea>
    </div>
  );
}
