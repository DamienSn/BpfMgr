import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

// A component that generates a control for the map sidebar (checkbox and label + toggling dynamics)
function MapControl({ name, toggling, defaultChecked }) {
    const [isToggled, setIsToggled] = useState(defaultChecked)
    // const [layer, setLayer] = useState(null)

    // useEffect(() => {
    //     if (toggling) {
    //         setLayer(toggling.firstChild.firstChild)
    //     }
    // }, [toggling])

    const toggleLayer = (e) => {
        if (e.target.checked && !toggling.firstChild.firstChild.checked) {
            console.log("checking")
            setIsToggled(true)
            toggling.firstChild.firstChild.checked = true
            console.log(toggling.firstChild.firstChild)
        } else if (!e.target.checked && toggling.firstChild.firstChild.checked) {
            console.log("unchecking")
            setIsToggled(false);
            toggling.firstChild.firstChild.checked = false
            console.log(toggling.firstChild.firstChild)
        }
    }

    return (
        <label className="block"><input type="checkbox" className="mr-2" onChange={toggleLayer} checked={isToggled} />{name}</label>
    )
}

export default MapControl
