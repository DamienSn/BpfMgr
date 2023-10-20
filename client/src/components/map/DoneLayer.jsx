import {useSelector} from "react-redux";
import { LayerGroup } from "@monsonjeremy/react-leaflet";

import { Marker, Popup } from "@monsonjeremy/react-leaflet";

// Marker icons
import iconMarkerCheck from '../../img/icons/marker-check.svg'
import iconMarkerCheckRed from '../../img/icons/marker-check-red.svg';
import iconMarkerCheckGreen from '../../img/icons/marker-check-green.svg';
import iconMarkerCheckBlue from '../../img/icons/marker-check-blue.svg';
import iconMarkerCheckYellow from '../../img/icons/marker-check-yellow.svg';
import iconMarkerCheckOrange from '../../img/icons/marker-check-orange.svg';
// Colors of dpts
import colors from '../../utilities/colors-dpts.json'

// Gets a bcn or bpf and return the icon corresponding to his dpt
export function getIcon (point) {
        let iconUrl = iconMarkerCheckBlue

        if (colors[point.city_departement] === "blue") {
            iconUrl = iconMarkerCheckBlue;
        } else if (colors[point.city_departement] === "yellow") {
            iconUrl = iconMarkerCheckYellow
        } else if (colors[point.city_departement] === "red") {
            iconUrl = iconMarkerCheckRed
        } else if (colors[point.city_departement] === "green") {
            iconUrl = iconMarkerCheckGreen
        } else if (colors[point.city_departement] === "orange") {
            iconUrl = iconMarkerCheckOrange
        } else {
            iconUrl = iconMarkerCheck;
        }

        const icon = L.icon({
            iconUrl,
            iconSize: [30, 30],
            iconAnchor: [15, 30]
        })

    return icon
}

/**
 * Displays all done bpfs
 */
export default function DoneLayer(props) {
    const userBpfs = useSelector((state) => state.bpfs.filter(bpf => !bpf.city_is_old_new_id))

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