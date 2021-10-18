import { useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { UidContext } from "../AppContext";
import getColoredIcon from '../../utilities/getColoredIcon';
import { LayerGroup } from "@monsonjeremy/react-leaflet";
import { setPane } from "../../redux/actions/pane.actions";
import {getAllBpfs, getAllCities} from '../../utilities/bpfRequests';

import { Marker, Popup } from "@monsonjeremy/react-leaflet";

/**
 * Displays all not done bpfs
 */
export default function CitiesLayer(props) {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    // State
    const [userBpfs, setUserBpfs] = useState([]);
    const [cities, setCities] = useState([]);
    const [displayedCities, setDisplayedCities] = useState([]);

    useEffect(() => {
        getAllBpfs(uid, setUserBpfs);
        getAllCities(setCities)
    }, [uid])

    useEffect(() => {
        let toState = []
        cities.forEach(city => {
            if (!userBpfs.some(({ bpf_city_id }) => bpf_city_id === city.city_id)) {
                city.icon = getColoredIcon(city.city_departement)
                toState.push(city)
            }
        })
        setDisplayedCities(toState)
    }, [cities])

    function handleInfoClick(e) {
        dispatch(setPane({
            id: e.target.attributes["data-city"].value,
            validated: false,
            active: true
        }))
    }

    return (
        <LayerGroup>
            {displayedCities.map((city, i) => {
                if (props.filter.dpt.includes(city.city_departement) || props.filter.dpt === "") {
                    return (
                        <Marker position={[city.city_lat, city.city_long]} key={i} icon={city.icon}>
                            <Popup>
                                {`${city.city_name} (${city.city_departement})`}<br />
                                Non validé<br/>
                                <span className="underline text-blue-600 cursor-pointer" data-city={city.city_id} onClick={handleInfoClick}>Plus d'infos</span>
                            </Popup>
                        </Marker>
                    )
                }
            })}
        </LayerGroup>
    )

}
