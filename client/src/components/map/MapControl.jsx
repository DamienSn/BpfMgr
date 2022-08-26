import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function MapControl({ name, toggling, defaultChecked }) {
    const [isToggled, setIsToggled] = useState(defaultChecked)
    const [layer, setLayer] = useState(null)

    useEffect(() => {
        if (toggling) {
            setLayer(toggling.firstChild.firstChild)
        }
    }, [toggling])

    const toggleLayer = (e) => {
        if (e.target.checked && !layer.checked) {
            setIsToggled(true)
            layer.click()
        } else if (!e.target.checked && layer.checked) {
            setIsToggled(false);
            layer.click()
        }
    }

    return (
        <label className="block"><input type="checkbox" className="mr-2" onChange={toggleLayer} checked={isToggled} />{name}</label>
    )
}

export default MapControl
