import React, { Component } from 'react';

class Documents extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        fetch('https://localhost:7287/api/document')
        .then(response => response.json())
        .then(data => console.log(data));
    }

    render(){
        return (<textbox></textbox>);
    }
}

export default Documents;