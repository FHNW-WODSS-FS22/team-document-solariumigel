import {  useEffect, useState } from "react"

export default function ParagraphEditor(props) {
    const [htmlContent, sethtmlContent] = useState("")
    const [connection, setConnection] = useState()
    const [documentId, setDocumentId] = useState()
    const [owner, setOwner] = useState()

    function change(event) {
        connection.send("SendChange", documentId, props.paragraph.id, 1, 1, event.target.value, "")
        sethtmlContent(event.target.value)
    };

    function applyChange(paragraphId, startPosition, endPosition, message, user) {
        if(props.paragraph.id === paragraphId){
            console.log("true")
            sethtmlContent(message);
        }
    }

    function paste(event){
        console.log("paste")
        console.log(event)
    };

    function getCaretPos(event) {
    };

    function beforeInput(event){
        console.log("beforeInput")
        console.log(event)
    };

    function onKeyDown(event){
        console.log("onKeyDown")
        console.log(event)
    };

    useEffect(() => {
        sethtmlContent(props.paragraph.text);
        setOwner(props.paragraph.owner);
        setConnection(props.connection);
        setDocumentId(props.documentId);

        props.connection.on("ApplyChange", applyChange)
    }, [])

    return (
        <div>  
            <br /> 
            Paragraph owner: {owner}
            <br />
            <textarea rows='4' cols='40'
                // onClick={(event) => getCaretPos(event)}
                onChange={e => change(e)}
                // onPaste={e => paste(e)}
                // onBeforeInput={e => beforeInput(e)}
                // onKeyUp={e => onKeyDown(e)}
                // onkeyup.arrowup="getCaretPos(myTextArea)"
                // keyup.arrowright="getCaretPos(myTextArea)" 
                // keyup.arrowleft="getCaretPos(myTextArea)" 
                // keyup.arrowdown="getCaretPos(myTextArea)"
                // keyup.backspace={deleteEvent(myTextArea, $event)}
                // keydown={getCaretPosWithChange(myTextArea, $event)}
                value={htmlContent}
                >
            </textarea>
        </div>
        )
}