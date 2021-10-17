import { useContext, useState, useEffect } from "react";
import { UidContext } from "../AppContext";
import { useDispatch } from "react-redux";
import getColoredIcon from '../../utilities/getColoredIcon';
import { LayerGroup } from "@monsonjeremy/react-leaflet";
import { setPane } from "../../redux/actions/pane.actions";
import {getAllBpfs} from '../../utilities/bpfRequests';

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

/**
 * Displays all done bpfs
 */
export default function DoneLayer(props) {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    // State
    const [userBpfs, setUserBpfs] = useState([]);

    useEffect(() => {
        getAllBpfs(uid, setUserBpfs);
    }, [uid])

    function handleInfoClick (e) {
        dispatch(setPane({
            id: JSON.parse(e.target.attributes["data-city"].value).bpf_city_id,
            validated: true,
            active: true
        }))
    }

    return (
        <LayerGroup>
            {userBpfs.map(bpf => {
                if (props.filter.dpt.includes(bpf.city_departement) || props.filter.dpt === "") {
                    let iconUrl = iconMarkerCheckBlue

                    if (colors[bpf.city_departement] === "blue") {
                        iconUrl = iconMarkerCheckBlue;
                    } else if (colors[bpf.city_departement] === "yellow") {
                        iconUrl = iconMarkerCheckYellow
                    } else if (colors[bpf.city_departement] === "red") {
                        iconUrl = iconMarkerCheckRed
                    } else if (colors[bpf.city_departement] === "green") {
                        iconUrl = iconMarkerCheckGreen
                    } else if (colors[bpf.city_departement] === "orange") {
                        iconUrl = iconMarkerCheckOrange
                    } else {
                        iconUrl = iconMarkerCheck;
                    }

                    const icon = L.icon({
                        iconUrl,
                        iconSize: [30, 30]
                    })

                    return (
                        <Marker position={[bpf.city_lat, bpf.city_long]} icon={icon} key={bpf.bpf_id}>
                            <Popup>
                                {`${bpf.city_name} (${bpf.city_departement})`}<br />
                                Validé le : {new Date(bpf.bpf_date).toLocaleDateString()}<br />
                                <a href="#" data-city={JSON.stringify(bpf)} onClick={handleInfoClick}>Plus d'infos</a>
                            </Popup>
                        </Marker>
                    )
                }
            })}
        </LayerGroup>
    )
}