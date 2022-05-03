import React from 'react'

function LoginPopup(props) {
  return (props.trigger) ? (
    <div className="LoginPopup"> 
       <div className='popup-inner'>
            <p className="loginName">
            Was ist dein Name?{" "}
            </p>
            <input
              className='docInput'
              onChange={(e) => props.onChange(e.target.value)}
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