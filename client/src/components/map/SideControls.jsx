import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from "react-redux"

import MapControl from './MapControl';

function SideControls({ map }) {
    const dpts = useSelector(state => state.dpts);
    const provinces = useSelector(state => state.provinces);

    const [dptFilter, setDptFilter] = useState("");

    // Hide overlay layers toggle on map
    useEffect(() => {
        const layers = document.querySelector(".leaflet-control-layers-overlays");
        const separator = document.querySelector(".leaflet-control-layers-separator");
        if (layers && separator) {
            layers.style.display = "none"
            separator.style.display = "none"
        }
    })

    const handleProvinceSelectChange = (e) => {
        let val = e.target.value;
        provinces.forEach(pro => {
            if (pro.province_name == val) {
                setDptFilter(pro.province_dpts);
            } else if (e.target.value === "") {
                setDptFilter([])
            }
        })
    }

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
        <div className='col-span-1 mt-4 md:ml-4 md:mt-8 space-y-4'>
            <div>
                <h4>Sites</h4>
                <MapControl name="BPFs validés" defaultChecked={true} toggling={doneCheckbox}/>
                <MapControl name="BPFs non validés" defaultChecked={true} toggling={notDoneCheckbox}/>
            </div>

            <div>
                <h4>Contours</h4>
                <MapControl name="Départements" defaultChecked={true} toggling={dptsShapesCheckbox}/>
                <MapControl name="Provinces" defaultChecked={false} toggling={provincesShapesCheckbox}/>
            </div>

            <div>
                <h4>Départements des BPF</h4>
                <MapControl name="Départements terminés (BPF)" defaultChecked={true} toggling={doneDptsSurfacesCheckbox}/>
                <MapControl name="Départements non terminés (BPF)" defaultChecked={false} toggling={otherDptsSurfacesCheckbox}/>
            </div>
            
            <div>
                <h4>Aller à</h4>
                <button className="btn btn-outline-blue mr-2" onClick={flyToLaReunion}>La Réunion</button>
                <button className="btn btn-outline-blue" onClick={flyToFrance}>France</button>
            </div>

            <div>
                <h4>Filtres</h4>

                <label htmlFor="dpt-bar">Département</label>
                <input type="search" list="data-dpt-bar" id="dpt-bar" placeholder="Sélectionner" className="input block mt-2 mb-4" onChange={e => setDptFilter([e.target.value])} />
                <datalist id="data-dpt-bar">
                    {dpts.map((dpt, index) =>
                        <option value={dpt.code} key={index}>{dpt.nom}</option>
                    )}
                </datalist>

                <label htmlFor="province-bar">Province</label>
                <input type="search" list="data-province-bar" id="province-bar" placeholder="Sélectionner" className="input block mt-2" onChange={handleProvinceSelectChange} />
                <datalist id="data-province-bar">
                    {provinces.map((province, index) =>
                        <option value={province.province_name} key={index}>{province.province_dpts.join(', ')}</option>
                    )}
                </datalist>
            </div>
        </div>
    )
}

export default SideControls
