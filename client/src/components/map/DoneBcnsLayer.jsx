import {useSelector } from "react-redux";
import { LayerGroup } from "@monsonjeremy/react-leaflet";

import { Marker, Popup } from "@monsonjeremy/react-leaflet";

import {getIcon} from "./DoneLayer";

/**
 * Displays all done bcns
 */
export default function DoneBcnsLayer(props) {
    const bcns = useSelector(state => state.bcns);

    function handleInfoClick (e) {
        window.location.hash = `#map/${e.target.attributes["data-city"].value}`;
    }

    return (
        <LayerGroup>
            {bcns.map(bcn => {
                const icon = getIcon(bcn);

                return (
                    <Marker position={[bcn.city_lat, bcn.city_long]} icon={icon} key={bcn.bcn_id}>
                        <Popup>
                            {`${bcn.city_name} (${bcn.city_departement})`}<br />
                            Validé le : {new Date(bcn.bcn_date).toLocaleDateString()}<br/>
                            <span className="underline text-blue-600 cursor-pointer" data-city={bcn.city_poi_id} onClick={handleInfoClick}>Plus d'infos</span>
                        </Popup>
                    </Marker>
                )
            })}
        </LayerGroup>
    )
}