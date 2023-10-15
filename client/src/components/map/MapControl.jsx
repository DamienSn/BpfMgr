import React from 'react'
import { useState, forwardRef } from 'react'

// A component that generates a control for the map sidebar (checkbox and label + toggling dynamics)
const MapControl = forwardRef(function MapControl ({ name, toggling, defaultChecked }, ref) {
    const [isToggled, setIsToggled] = useState(defaultChecked)

    const toggleLayer = (e) => {
        if (e.target.checked && !toggling.firstChild.firstChild.checked) {
            setIsToggled(true)
            toggling.firstChild.firstChild.click();
        } else if (!e.target.checked && toggling.firstChild.firstChild.checked) {
            setIsToggled(false);
            toggling.firstChild.firstChild.click();
        }
    }

    return (
        <label className="block"><input type="checkbox" className="mr-2" onChange={toggleLayer} checked={isToggled} ref={ref}/>{name}</label>
    )
});

export default MapControl
