import React from 'react'

function ImageButton(props) {
    return (
        <button className={props.classes}>
            <img src={props.img} className="w-8 h-8 inline" alt={props.alt}/>
            {props.text}
        </button>
    )
}

export default ImageButton
