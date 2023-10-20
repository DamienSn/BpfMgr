import {useSelector} from "react-redux";
import { LayerGroup } from "@monsonjeremy/react-leaflet";

import { Marker, Popup } from "@monsonjeremy/react-leaflet";

// Marker icons
import iconMarkerFlagGreen from "../../img/icons/marker-flag-done.svg"


// Gets a bcn or bpf and return the icon corresponding to his dpt
export function getIcon (point) {
    let iconUrl = iconMarkerFlagGreen

    const icon = L.icon({
        iconUrl,
        iconSize: [16,16],
        iconAnchor: [4,13]
    })

    return icon
}

/**
 * Displays all old and done bpfs
 */
export default function OldDoneLayer(props) {
    const userBpfs = useSelector(state => state.bpfs.filter(bpf => bpf.city_is_old_new_id))
    console.log(userBpfs)

    function handleInfoClick (e) {
        window.location.hash = `#map/${e.target.attributes["data-city"].value}`;
    }

    return (
        <LayerGroup>
            {userBpfs.map(bpf => {
                const icon = getIcon(bpf);

                return (
                    <Marker position={[bpf.city_lat, bpf.city_long]} icon={icon} key={bpf.bpf_id}>
                        <Popup>
                            {`${bpf.city_name} (${bpf.city_departement})`}<br />
                            Validé le : {new Date(bpf.bpf_date).toLocaleDateString()}<br/>
                            <span className="underline text-blue-600 cursor-pointer" data-city={bpf.city_poi_id} onClick={handleInfoClick}>Plus d'infos</span>
                        </Popup>
                    </Marker>
                )
            })}
        </LayerGroup>
    )
}