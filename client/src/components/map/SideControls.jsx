import React, { useState } from 'react'
import { useEffect } from 'react';
import { AdjustmentsIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline"

import MapControl from './MapControl';

function SideControls({ map }) {
    // Hide overlay layers toggle on map
    useEffect(() => {
        const layers = document.querySelector(".leaflet-control-layers-overlays");
        const separator = document.querySelector(".leaflet-control-layers-separator");
        if (layers && separator) {
            layers.style.display = "none"
            separator.style.display = "none"
        }
    })

    const [isVisible, setIsVisible] = useState(false);
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 724) {
            setMobile(true)
        } else {
            setMobile(false);
        }
        window.addEventListener("resize", () => {
            if (window.innerWidth < 724) {
                setMobile(true)
            } else {
                setMobile(false);
            }
        })
    }, [])

    const flyToLaReunion = () => {
        map.flyTo([-21.1351121, 55.2471124], 10)
    }
    const flyToFrance = () => {
        map.flyTo([46.632, 1.852], 6)
    }

    // Get the element for each checkbox in the leaflet overlay control
    const [doneCheckbox, setDoneCheckbox] = useState(null)
    const [notDoneCheckbox, setNotDoneCheckbox] = useState(null)
    const [dptsShapesCheckbox, setDptsShapesCheckbox] = useState(null);
    const [provincesShapesCheckbox, setProvincesShapesCheckbox] = useState(null);
    const [doneDptsSurfacesCheckbox, setDoneDptsSurfacesCheckbox] = useState(null);
    const [otherDptsSurfacesCheckbox, setOtherDptsSurfacesCheckbox] = useState(null);

    useEffect(() => {
        let overlay = document.querySelector(".leaflet-control-layers-overlays");
        if (overlay && overlay.childNodes.length == 6) {
            setDoneCheckbox(overlay.firstChild);
            setNotDoneCheckbox(overlay.childNodes[1]);
            setDptsShapesCheckbox(overlay.childNodes[3]);
            setProvincesShapesCheckbox(overlay.childNodes[2]);
            setDoneDptsSurfacesCheckbox(overlay.childNodes[4]);
            setOtherDptsSurfacesCheckbox(overlay.childNodes[5]);
        }
    })

    return (
        <div className='md:col-span-2 lg:col-span-1 mt-4 md:ml-4 md:mt-8 space-y-4'>
            {/* Mobile menu toggler */}
            <div className="visible md:hidden w-full py-2 font-bold text-center" onClick={e => setIsVisible(!isVisible)} aria-role="button">
                Menu d'affichage&nbsp;
                {isVisible ? <ChevronUpIcon className="icon-sm" /> : <ChevronDownIcon className="icon-sm" />}
            </div>

            <div style={{ display: !isVisible && mobile ? "none" : "block" }} className="pb-4 md:pb-0 px-2 md:px-0">
                <div>
                    <h4 className="text-xl lg:text-2xl">Sites</h4>
                    <MapControl name="BPFs validés" defaultChecked={true} toggling={doneCheckbox} />
                    <MapControl name="BPFs non validés" defaultChecked={true} toggling={notDoneCheckbox} />
                </div>

                <div>
                    <h4 className="text-xl lg:text-2xl">Contours</h4>
                    <MapControl name="Départements" defaultChecked={true} toggling={dptsShapesCheckbox} />
                    <MapControl name="Provinces" defaultChecked={false} toggling={provincesShapesCheckbox} />
                </div>

                <div>
                    <h4 className="text-xl lg:text-2xl">Départements des BPF</h4>
                    <MapControl name="Départements terminés (BPF)" defaultChecked={true} toggling={doneDptsSurfacesCheckbox} />
                    <MapControl name="Départements non terminés (BPF)" defaultChecked={false} toggling={otherDptsSurfacesCheckbox} />
                </div>

                <div className="space-y-2">
                    <h4 className='text-xl lg:text-2xl'>Aller à</h4>
                    <button className="btn btn-outline-blue mr-2" onClick={flyToLaReunion}>La Réunion</button>
                    <button className="btn btn-outline-blue " onClick={flyToFrance}>France</button>
                </div>
            </div>
        </div>
    )
}

export default SideControls
