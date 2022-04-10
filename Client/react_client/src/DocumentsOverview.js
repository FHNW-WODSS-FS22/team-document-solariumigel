import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DocumentsOverview extends Component {
    
    state = {
        documents: []
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadDocuments();
    }

    loadDocuments(){
        fetch('https://localhost:7287/api/document')
        .then(response => response.json())
        .then(data => this.setState({documents: data}));
    }

    createNewDocument(){
        console.log("adfasdf");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Owner: 'Julian', Name: "Hikaru no go" })
        };
        fetch('https://localhost:7287/api/document', requestOptions)
        .then(() => this.loadDocuments());
    }

    render(){
        return (<div>

            <button onClick={() => this.createNewDocument()}>Add new Document</button>
            <br />
            <br />
            Anzahl Dokumente: {this.state.documents.length}
            <br />
            <table>
                <tr>
                    <th>Name</th>
                    <th></th>
                    <th>Owner</th>
                </tr>
                {this.state.documents.map((document) => (
                    <tr key={document.id}>
                        <td><Link  to={"/documents/" + document.id}>{document.name}</Link></td>
                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td>{document.owner}</td>                        
                    </tr>
                ))}
            </table>
        </div>);
    }
}

export default DocumentsOverview;