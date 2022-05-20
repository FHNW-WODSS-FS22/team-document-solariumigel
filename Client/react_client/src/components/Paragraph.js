import { useEffect, useState } from "react";

/**
 * Paragraph component
 * @param {object} props
 * @returns
 */
export default function Paragraph(props) {
  const { connection, documentId, onDelete } = props;
  const [paragraph, setParagraph] = useState(props.paragraph);
  const [text, setText] = useState(props.text);
  const [position, setPosition] = useState(props.position);

  /**
   * Constructor
   */
  useEffect(() => {
    if (props.connection) {
      connection.on("ListenForMessage", listenForText);
      connection.on("ListenForPosition", listenForPosition);
    }
  });

  /**
   * Update the message of the paragraph
   * @param {string} text
   */
  const updateText = (text) => {
    connection.send("UpdateMessage", documentId, paragraph.id, text);
  };

  /**
   * Listen for an update of a message
   * @param {int} paragraphId
   * @param {string} text
   */
  const listenForText = (paragraphId, text) => {
    if (paragraph.id === paragraphId) {
      setText(text);
    }
  };

  /**
   * Move position of paragraph up by one
   */
  const movePositionUp = () => {
    if(position != 1)
    {
      connection.send("UpdatePositionUp", documentId, paragraph.id);
    }
  };

  /**
   * Move position of paragraph down by one
   */
  const movePositionDown = () => {
    connection.send("UpdatePositionDown", documentId, paragraph.id);
  };

  /**
   * Listen for an update of the position
   * @param {int} paragraphId
   * @param {int} position
   */
  const listenForPosition = (paragraphId, newPosition) => {
    if (paragraph.id === paragraphId) {
      setPosition(newPosition);
      paragraph.position = newPosition;
      setParagraph(paragraph);
    }
  };

  return (
    <div>
      {paragraph != null && (
        <div className="cardParagraph">
            <div className="paragraphHeader">
              <div className="left"> 
                <p className="pOwnerTxt">Paragraph owner: </p>
                {paragraph.owner} 
              </div>
              <button className="deleteBtn" onClick={() => onDelete(paragraph.id)}></button>
            </div>
            <div className="paragraphBottom">
              <textarea
                rows="4"
                cols="40"
                onChange={(e) => updateText(e.target.value)}
                value={text}
              ></textarea>
              <div className="paragraphRating"> 
                <button className="arrowUp" onClick={() => movePositionUp()}></button>
                  <p className="positionTxt"> { position } </p>
                <button className="arrowDown" onClick={() => movePositionDown()}></button>
              </div>
            </div> 
        </div>
      )}
    </div>
  );
}  
