import React from 'react'

function Alert(props) {
    // const cap = (word) =>
    // {
    //   const lower = word.toLowerCase();
    //   return lower.charAt(0).upperCase() + lower.slice(1);
    // }
    return (
        //     <div style={{height:'70px',}}>
        //    { props.alert && <div className={`alert alert-success`}role="alert">
        //     <strong>{props.alert.type1}</strong> {props.alert.msg}
        //   </div>}
        //   </div>
        <div class="alert alert-primary" role="alert">
            {/* {props.massage} */}
            This Is alert tags
           </div>
    )
}

export default Alert
