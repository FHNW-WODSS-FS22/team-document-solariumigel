import { Component, useCallback, useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom"
import { HubConnectionBuilder } from '@microsoft/signalr'
import ParagraphEditor from "./ParagraphEditor";

export default function DoctumentEditor() {
    const { id: documentId } = useParams();
    const [connection, setConnection] = useState()
    const [document, setDocument] = useState()
    // const [paragraphData, setParagraphData] = useState({
    //     list: initialList
    // })

    function SetUserId(userId, document){
        setDocument(document)
    };

    function AddParagraph(){
        connection.send("AddParagraph", documentId);
    }

    function addNewParagraph(newParagraph){
        console.log("addNewParagraph")
        console.log(newParagraph)
        //TODO: update list of paragraphs
    }

    useEffect(() => {
        console.log("documentId")
        console.log(documentId)
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7287/documentSocket')
            .withAutomaticReconnect()
            .build();
        
        newConnection.on("SetUserId", SetUserId)
        newConnection.on("AddNewParagraph", addNewParagraph)

        newConnection.start().then(() => {
            console.info('SignalR Connected')
            newConnection.send("AddToDocument", documentId)
            });
        setConnection(newConnection);
    }, []);

    return (
    <div>  
        <Link to={"/"}>back to the overview</Link>
        {document != null &&
            <div>
                Document name: {document.name}
                <br />
                Document Owner: {document.owner}
                <br />
                <br />
                <br />
                <button onClick={() => AddParagraph()}>Add Paragraph</button>
                {document.paragraph.map((paragraph) => (
                    <ParagraphEditor key={paragraph.id} paragraph={paragraph} connection={connection} documentId={documentId} />
                ))}
            </div>
        }
    </div>
    )
}