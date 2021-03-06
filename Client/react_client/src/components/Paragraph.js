import { useEffect, useState } from "react";

/**
 * Paragraph component
 * @param {object} props
 * @returns
 */
export default function Paragraph(props) {
  const { connection, documentId, onDelete, userProvider } = props;
  const [paragraph, setParagraph] = useState(props.paragraph);
  const [text, setText] = useState(props.text);
  const [position, setPosition] = useState(props.position);
  const [readOnly, setReadOnly] = useState();
  const [lockedUser, setLockedUser] = useState();

  /**
   * Constructor
   */
  useEffect(() => {
    if (connection) {
      connection.on("ListenForMessage", listenForText);
      connection.on("ListenForPosition", listenForPosition);
      connection.on("ApplyLock", applyLock);
      connection.on("ApplyReleaseLock", applyReleaseLock);
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
      // documentProvider.setParagraphText(paragraphId, text)
      setText(text);
      paragraph.text = text;
      setParagraph(paragraph);
    }
  };

  /**
   * Move position of paragraph up by one
   */
  const movePositionUp = () => {
    if (position !== 1) {
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

  const LockParagraph = () => {
    if (!lockedUser) {
      connection.send(
        "LockParagraph",
        documentId,
        paragraph.id,
        userProvider.getUser()
      );
    }
  };

  const applyLock = (paragraphId, lockedUser) => {
    if (paragraph.id === paragraphId) {
      setLockedUser(lockedUser);
      setReadOnly(userProvider.getUser() !== lockedUser);
    }
  };

  const applyReleaseLock = (paragraphId) => {
    if (paragraph.id === paragraphId) {
      setLockedUser(null);
      setReadOnly(false);
    }
  };

  const deleteParagraph = () => {
    if (!readOnly) {
      onDelete(paragraph.id);
    }
  };

  return (
    <div>
      {paragraph != null && (
        <div className="cardParagraph">
            <div className="paragraphHeader">
              <div className="left"> 
                <p data-testid="paragraph-owner" className="pOwnerTxt">Paragraph creator: {paragraph.owner}</p>
                </div>
              <div className="left"> 
                <p data-testid="paragraph-bearbeiter" className="pOwnerTxt">Locked by: {lockedUser}</p>
              </div>
              <button data-testid="delete-btn" className="deleteBtn" onClick={deleteParagraph}></button>
            </div>
            <div className="paragraphBottom">
              <textarea
                data-testid="paragraph-textarea"
                rows="4"
                cols="40"
                onChange={(e) => updateText(e.target.value)}
                value={text}
                disabled={readOnly}
                onClick={() => LockParagraph()}
              ></textarea>
              <div className="paragraphRating"> 
                <button data-testid="arrowup-btn" className="arrowUp" onClick={() => movePositionUp()}></button>
                  <p data-testid="paragraph-position" className="positionTxt">{position}</p>
                <button data-testid="arrowdown-btn" className="arrowDown" onClick={() => movePositionDown()}></button>
              </div>
            </div> 
        </div>
      )}
    </div>
  );
}
