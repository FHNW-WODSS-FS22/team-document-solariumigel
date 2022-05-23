import React from 'react'

function AddDocumentPopup(props) {
    function createD(){
        props.createDoc()
    }
    function close(){
        props.setTrigger(false)
    }
  return (props.trigger) ? (
    <div className="addDocumentPopup"> 
       <div className='popup-inner'>
           <input
                className='docInput'
                placeholder= "Document Name"
                onChange={(e) => props.onChange(e.target.value)}
            />
            <button data-testid="create-btn" className="createDocument" onClick={() => { close(); createD();}} >Add</button>
            <button data-testid="close-btn" className='closePopUp' onClick={() => {close();}}></button>
            {props.children}
       </div>
    </div>
  ) : ""
}

export default AddDocumentPopup