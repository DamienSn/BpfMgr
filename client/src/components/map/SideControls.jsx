import React, {useRef, useState} from 'react'
import {useEffect} from 'react';
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/outline"

import MapControl from './MapControl';

function Pills({handler, ref1, ref2}) {
    return (
        <div>
            <button id="pill-bpf" onClick={handler}
                    className="py-2 px-4 border-2 border-r-0 border-blue-400 rounded-l-full cursor-pointer pill-active text-sm"
                    ref={ref1}>
                BPF
            </button>
            <button id="pill-bcn" onClick={handler}
                    className="py-2 px-4 border-2 border-blue-400 rounded-r-full cursor-pointer text-sm" ref={ref2}>
                BCN
            </button>
        </div>
    )
}


function SideControls({map}) {
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
    const [doneOldCheckbox, setDoneOldCheckbox] = useState(null);
    const [notDoneOldCheckbox, setNotDoneOldCheckbox] = useState(null);

    useEffect(() => {
        let overlay = document.querySelector(".leaflet-control-layers-overlays");

        if (overlay && overlay.childNodes.length == 10) {
            setDoneCheckbox(overlay.firstChild);
            setNotDoneCheckbox(overlay.childNodes[1]);
            setDptsShapesCheckbox(overlay.childNodes[6]);
            setProvincesShapesCheckbox(overlay.childNodes[5]);
            setDoneDptsSurfacesCheckbox(overlay.childNodes[7]);
            setOtherDptsSurfacesCheckbox(overlay.childNodes[8]);
            setDoneDptsSurfacesCheckboxBCN(overlay.childNodes[9]);
            setDoneBcnsCheckbox(overlay.childNodes[4]);
            setDoneOldCheckbox(overlay.childNodes[2]);
            setNotDoneOldCheckbox(overlay.childNodes[3])
        }
    })

    // Mode de la carte (BPF ou BCN)
    const refPillBpf = useRef(null);
    const refPillBcn = useRef(null);

    const bpfControls = useRef(null);
    const bcnControls = useRef(null);
    const [bpfControlsDisplay, setBpfControlsDisplay] = useState(true);
    const [bcnControlsDisplay, setBcnControlsDisplay] = useState(false);

    // FOnctions d'activation / désactivation de tous les calques d'un mode (BPF /BCN)
    const disableAllBpfsLayers = () => {
        groupRefsBpfs.map(ref => {
            if (ref.current.checked) {
                ref.current.click();
            }
        })
    }
    const enableBpfsLayers = () => {
        const refs = [refDoneBpfs, refOthersBpfs, refDoneDptsBpfs];
        refs.map(ref => {
            if (!ref.current.checked) {
                ref.current.click();
            }
        })
    }

    const disableAllBcnsLayers = () => {
        groupRefsBcns.map(ref => {
            if (ref.current.checked) {
                ref.current.click();
            }
        })
    }

    const enableBcnsLayers = () => {
        groupRefsBcns.map(ref => {
            if (!ref.current.checked) {
                ref.current.click();
            }
        })
    }

    const handlePills = (e) => {
        if (e.target.innerText === 'BPF') {
            // Changement vers mode BPF
            disableAllBcnsLayers();
            enableBpfsLayers();

            refPillBcn.current.classList.remove('pill-active');
            refPillBpf.current.classList.add('pill-active');

            setBcnControlsDisplay(false);
            setBpfControlsDisplay(true);

        } else {
            // Changement vers mode BCN
            disableAllBpfsLayers();
            enableBcnsLayers();

            refPillBpf.current.classList.remove('pill-active');
            refPillBcn.current.classList.add('pill-active');

            setBcnControlsDisplay(true);
            setBpfControlsDisplay(false);

        }
    }

    // Refs to access the inputs of each control
    const refDoneBpfs = useRef(null);
    const refOthersBpfs = useRef(null);
    const refDoneDptsBpfs = useRef(null);
    const refOthersDptsBpfs = useRef(null);
    const refOldDoneBpfs = useRef(null);
    const refOldNotDoneBpfs = useRef(null);
    const groupRefsBpfs = [refDoneBpfs, refOthersBpfs, refDoneDptsBpfs, refOthersDptsBpfs, refOldDoneBpfs, refOldNotDoneBpfs];

    const refDoneBcns = useRef(null);
    const refDoneDptsBcns = useRef(null);
    const groupRefsBcns = [refDoneBcns, refDoneDptsBcns];


    return (
        <div className='md:col-span-2 lg:col-span-1 mt-4 md:ml-4 md:mt-8 space-y-4'>
            {/* Mobile menu toggler */}
            <div className="visible md:hidden w-full py-2 font-bold text-center" onClick={e => setIsVisible(!isVisible)}
                 aria-role="button">
                Menu d'affichage&nbsp;
                {isVisible ? <ChevronUpIcon className="icon-sm"/> : <ChevronDownIcon className="icon-sm"/>}
            </div>

            <div style={{display: !isVisible && mobile ? "none" : "block"}} className="pb-4 md:pb-0 px-2 md:px-0">

                {/* Pills (mode) */}
                <div className="text-xl lg:text-2xl mb-2 flex-col">
                    <h4>Mode d'affichage</h4>
                    <Pills ref1={refPillBpf} ref2={refPillBcn} handler={handlePills}/>
                </div>


                {/* Section des contrôles BPF */}
                <div ref={bpfControls} style={{display: bpfControlsDisplay ? "block" : "none"}}>

                    <div>
                        <h4 className="text-lg lg:text-xl">Sites</h4>
                        <MapControl name="BPFs validés" defaultChecked={true} toggling={doneCheckbox}
                                    ref={refDoneBpfs}/>
                        <MapControl name="BPFs non validés" defaultChecked={true} toggling={notDoneCheckbox}
                                    ref={refOthersBpfs}/>
                    </div>

                    <div>
                        <h4 className="text-lg lg:text-xl">Anciens sites</h4>
                        <MapControl name="Anciens BPFs validés" defaultChecked={true} toggling={doneOldCheckbox} ref={refOldDoneBpfs}/>
                        <MapControl name="Anciens BPFs non validés" defaultChecked={false} toggling={notDoneOldCheckbox} ref={refOldNotDoneBpfs}/>
                    </div>

                    <div className="mt-2">
                        <h4 className="text-lg lg:text-xl">Départements</h4>
                        <MapControl name="Départements terminés (BPF)" defaultChecked={true}
                                    toggling={doneDptsSurfacesCheckbox} ref={refDoneDptsBpfs}/>
                        <MapControl name="Départements non terminés (BPF)" defaultChecked={false}
                                    toggling={otherDptsSurfacesCheckbox} ref={refOthersDptsBpfs}/>
                    </div>
                </div>


                {/* Section des contrôles BCN */}
                <div ref={bcnControls} style={{display: bcnControlsDisplay ? "block" : "none"}}>
                    <div>
                        <h4 className="text-lg lg:text-xl">Mode BCN</h4>
                        <MapControl name="Départements terminés (BCN)" defaultChecked={false}
                                    toggling={doneDptsSurfacesCheckboxBCN} ref={refDoneDptsBcns}/>
                        <MapControl name="BCNs validés" defaultChecked={false} toggling={doneBcnsCheckbox}
                                    ref={refDoneBcns}/>
                    </div>
                </div>

                <div className="mt-4">
                    <h4 className="text-xl lg:text-2xl">Contours</h4>
                    <MapControl name="Départements" defaultChecked={true} toggling={dptsShapesCheckbox}/>
                    <MapControl name="Provinces" defaultChecked={false} toggling={provincesShapesCheckbox}/>
                </div>

                <div className="space-y-2">
                    <h4 className='text-xl lg:text-2xl'>Aller à</h4>
                    <button className="btn btn-outline-blue mr-2" onClick={flyToLaReunion}>La Réunion</button>
                    <button className="btn btn-outline-blue " onClick={flyToFrance}>Métropole</button>
                </div>
            </div>
        </div>
    )
}

export default SideControls
