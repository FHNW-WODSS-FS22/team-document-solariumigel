import React from 'react'

function LoginPopup(props) {

  const changeUserName = (username) =>{
    props.userProvider.setUser(username);
  }

  return (props.trigger) ? (
    <div className="LoginPopup"> 
       <div className='popup-inner'>
            <p className="loginName">
            Was ist dein Name?{" "}
            </p>
            <input
              className='docInput'
              defaultValue={props.userProvider.getUser()}
              onChange={(e) => changeUserName(e.target.value)}
              placeholder="Name"
              required="required"
            />
            <button className="enterLogin" onClick={() => {props.setTrigger(false)}} >Enter</button>
            {props.children}
       </div>
    </div>
  ) : ""
}

export default LoginPopup