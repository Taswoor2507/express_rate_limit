import React from 'react'

const GoogleButton = () => {

  function handleClick(){
     window.location.href = "http://localhost:8080/api/v1/auth/google"
  }


  return (
    <button onClick={handleClick}>Continue with google</button>
  )
}

export default GoogleButton