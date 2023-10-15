import React, {useRef, useState} from 'react'
import { useEffect } from 'react';
import { AdjustmentsIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline"

import MapControl from './MapControl';

function Pills({handler, ref1, ref2}) {
    return (
        <>
            <button id="pill-bpf" onClick={handler} className="py-2 px-4 border-2 border-r-0 border-blue-400 rounded-l-full cursor-pointer pill-active" ref={ref1}>
                BPF
            </button>
            <button id="pill-bcn" onClick={handler} className="py-2 px-4 border-2 border-blue-400 rounded-r-full cursor-pointer" ref={ref2}>
                BCN
            </button>
        </>
    )
}

function SideControls({ map }) {
    // Masquer les contrôles par défaut des calques sur la carte
    useEffect(() => {
        const layers = document.querySelector(".leaflet-control-layers-overlays");
        const separator = document.querySelector(".leaflet-control-layers-separator");
        if (layers && separator) {
            layers.style.display = "none"
            separator.style.display = "none"
        }
    })

    // Comportement responsive
    const [isVisible, setIsVisible] = useState(false);
    const [mobile, setMobile] = useState(false);

    // Défintion de l'appareil utilisateur : mobile ou bureau
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

    // Déplacements sur la carte
    const flyToLaReunion = () => {
        map.flyTo([-21.1351121, 55.2471124], 10)
    }
    const flyToFrance = () => {
        map.flyTo([46.632, 1.852], 6)
    }

    // Controls
    // Checkboxes of the Leaflet Layers Dialog WARNING : refer to the order of the layers on the map to know their indice in the childnodes list
    const [doneCheckbox, setDoneCheckbox] = useState(null)
    const [notDoneCheckbox, setNotDoneCheckbox] = useState(null)
    const [dptsShapesCheckbox, setDptsShapesCheckbox] = useState(null);
    const [provincesShapesCheckbox, setProvincesShapesCheckbox] = useState(null);
    const [doneDptsSurfacesCheckbox, setDoneDptsSurfacesCheckbox] = useState(null);
    const [otherDptsSurfacesCheckbox, setOtherDptsSurfacesCheckbox] = useState(null);
    const [doneDptsSurfacesCheckboxBCN, setDoneDptsSurfacesCheckboxBCN] = useState(null);
    const [doneBcnsCheckbox, setDoneBcnsCheckbox] = useState(null);

    const groupBpfControls = [doneCheckbox, notDoneCheckbox, doneDptsSurfacesCheckbox, otherDptsSurfacesCheckbox];
    const groupBcnControls = [doneDptsSurfacesCheckboxBCN, doneBcnsCheckbox]


    useEffect(() => {
        let overlay = document.querySelector(".leaflet-control-layers-overlays");

        if (overlay && overlay.childNodes.length == 8) {
            setDoneCheckbox(overlay.firstChild);
            setNotDoneCheckbox(overlay.childNodes[1]);
            setDptsShapesCheckbox(overlay.childNodes[4]);
            setProvincesShapesCheckbox(overlay.childNodes[3]);
            setDoneDptsSurfacesCheckbox(overlay.childNodes[5]);
            setOtherDptsSurfacesCheckbox(overlay.childNodes[6]);
            setDoneDptsSurfacesCheckboxBCN(overlay.childNodes[7]);
            setDoneBcnsCheckbox(overlay.childNodes[2]);
        }
    })

    // Mode de la carte (BPf ou BCN)
    const refPillBpf = useRef(null);
    const refPillBcn = useRef(null);

    const bpfControls = useRef(null);
    const bcnControls = useRef(null);
    const [bpfControlsDisplay, setBpfControlsDisplay] = useState(true);
    const [bcnControlsDisplay, setBcnControlsDisplay] = useState(false);
    const handlePills = (e) => {
        if (e.target.innerText === 'BPF') {
            refPillBcn.current.classList.remove('pill-active');
            refPillBpf.current.classList.add('pill-active');

            setBcnControlsDisplay(false);
            setBpfControlsDisplay(true);

        } else {
            refPillBpf.current.classList.remove('pill-active');
            refPillBcn.current.classList.add('pill-active');

            setBcnControlsDisplay(true);
            setBpfControlsDisplay(false);
        }
    }

    return (
        <div className='md:col-span-2 lg:col-span-1 mt-4 md:ml-4 md:mt-8 space-y-4'>
            {/* Mobile menu toggler */}
            <div className="visible md:hidden w-full py-2 font-bold text-center" onClick={e => setIsVisible(!isVisible)} aria-role="button">
                Menu d'affichage&nbsp;
                {isVisible ? <ChevronUpIcon className="icon-sm" /> : <ChevronDownIcon className="icon-sm" />}
            </div>

            <div style={{ display: !isVisible && mobile ? "none" : "block" }} className="pb-4 md:pb-0 px-2 md:px-0">
                <div className="text-xl lg:text-2xl">
                    <Pills ref1={refPillBpf} ref2={refPillBcn} handler={handlePills}/>
                </div>

                {/* Section des contrôles BPF */}
                <div ref={bpfControls} style={{display: bpfControlsDisplay ? "block" : "none"}}>
                    <div>
                        <h4 className="text-xl lg:text-2xl">Sites</h4>
                        <MapControl name="BPFs validés" defaultChecked={true} toggling={doneCheckbox}/>
                        <MapControl name="BPFs non validés" defaultChecked={true} toggling={notDoneCheckbox} />
                    </div>

                    <div>
                        <h4 className="text-xl lg:text-2xl">Départements des BPF</h4>
                        <MapControl name="Départements terminés (BPF)" defaultChecked={true} toggling={doneDptsSurfacesCheckbox} />
                        <MapControl name="Départements non terminés (BPF)" defaultChecked={false} toggling={otherDptsSurfacesCheckbox} />
                    </div>
                </div>


                {/* Section des contrôles BCN */}
                <div ref={bcnControls} style={{display: bcnControlsDisplay ? "block" : "none"}}>
                    <div>
                        <h4 className="text-xl lg:text-2xl">Mode BCN</h4>
                        <MapControl name="Départements terminés (BCN)" defaultChecked={false} toggling={doneDptsSurfacesCheckboxBCN}/>
                        <MapControl name="BCNs validés" defaultChecked={false} toggling={doneBcnsCheckbox} />
                    </div>
                </div>

                <div>
                    <h4 className="text-xl lg:text-2xl">Contours</h4>
                    <MapControl name="Départements" defaultChecked={true} toggling={dptsShapesCheckbox} />
                    <MapControl name="Provinces" defaultChecked={false} toggling={provincesShapesCheckbox} />
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
