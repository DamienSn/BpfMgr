import React, { Children, useState } from 'react'

function Tabs(props) {
    const [active, setActive] = useState(0);

    return (
        <>
            <ul className="tabs flex">
                {props.children[0].props.children.map((tab, i) =>
                    <li className={`tab ${active === i ? 'active' : ''}`} key={i} onClick={() => setActive(i)} role="navigation">{tab}</li>
                )}
            </ul>
            <ul className="tabs-body">
                {props.children[1].props.children.map((item, i) => {
                    if (active === i) {
                        return (<li key={i} className="mt-2">{item}</li>)
                    }
                })}
            </ul>
        </>
    )
}

export default Tabs
