import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { HubConnectionBuilder } from '@microsoft/signalr'



function getCaretPos() {
    
}

export default function TextEditor() {
    const { id: documentId } = useParams();
    const [connection, setConnection] = useState()
    const [htmlContent, sethtmlContent] = useState()

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7287/document')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    return (  <textarea rows='4' cols='40'
        onClick={getCaretPos()}
        // paste={onPaste(myTextArea, $event)}
        // beforeinput={beforeInput(myTextArea, $event)}
        // onkeyup.arrowup="getCaretPos(myTextArea)"
        // keyup.arrowright="getCaretPos(myTextArea)" 
        // keyup.arrowleft="getCaretPos(myTextArea)" 
        // keyup.arrowdown="getCaretPos(myTextArea)"
        // keyup.backspace={deleteEvent(myTextArea, $event)}
        // keydown={getCaretPosWithChange(myTextArea, $event)}
        >{{htmlContent}}
    </textarea>
    )
}