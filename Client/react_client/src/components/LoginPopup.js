import React from 'react'

function LoginPopup(props) {

  const changeUserName = (username) =>{
    props.userProvider.setUser(username);
  }

  const getUserName= () =>{
    return props.userProvider.getUser()
  }

  function close(){
    props.setTrigger(false)
}

  return (props.trigger) ? (
    <div className="LoginPopup"> 
       <div className='popup-inner'>
            <p className="loginName">
            Was ist dein Name?{" "}
            </p>
            <input
              data-testid='userName-input'
              className='docInput'
              defaultValue={getUserName()}
              onChange={(e) => changeUserName(e.target.value)}
              placeholder="Name"
              required="required"
            />
            <button data-testid='enter-btn' className="enterLogin" onClick={() => {props.setTrigger(false)}} >Enter</button>
            <button data-testid="close-btn" className='closePopUp' onClick={() => {close();}}></button>
            {props.children}
       </div>
    </div>
  ) : ""
}

export default LoginPopup