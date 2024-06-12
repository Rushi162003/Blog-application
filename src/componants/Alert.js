import React from 'react'

function Alert(props) {
    const cap = (word) =>
    {
      if(word === "danger"){
        word ="error"
      }
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
      
    }
    return (
            <div style={{height:'70px',}}>
           { props.alert && <div className={`alert alert-${props.alert.type}`}role="alert">
            <strong>{cap(props.alert.type)}: </strong> {props.alert.msg}
          </div>}
          </div>
        
    )
}

export default Alert
