import React from 'react'

function Alert(props) {
    return (
        <div className={`alert alert-${props.color}`}>
            <h3>{props.title}</h3>
            <div className="alert-content flex flex-col items-start">
                <p>{props.content}</p>
                <a href={props.href} className="btn btn-blue">{props.action}</a>
            </div>
        </div>
    )
}

export default Alert
