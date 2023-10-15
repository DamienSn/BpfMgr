import { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../AppContext";
import getColoredIcon from '../../utilities/getColoredIcon';
import { LayerGroup } from "@monsonjeremy/react-leaflet";
import { setPane } from "../../redux/actions/pane.actions";
import { getAllBpfs, getAllCities } from '../../utilities/bpfRequests';

import { Marker, Popup } from "@monsonjeremy/react-leaflet";

/**
 * Displays all not done bpfs
 */
export default function CitiesLayer(props) {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    // State
    const userBpfs = useSelector(state => state.bpfs);
    const cities = useSelector(state => state.cities);
    const [displayedCities, setDisplayedCities] = useState([]);


    // useEffect(() => {
    //     if (cities) {
    //         let toState = []
    //         cities.forEach(city => {
    //             if (!userBpfs.some(({ bpf_city_id }) => bpf_city_id === city.city_id)) {
    //                 city.icon = getColoredIcon(city.city_departement)
    //                 toState.push(city)
    //             }
    //         })
    //         setDisplayedCities(toState)
    //     }
    // }, [cities, userBpfs])

    function handleInfoClick(e) {
        window.location.hash = `#map/${e.target.attributes["data-city"].value}`;
    }

    return (
        <LayerGroup>
            { cities.map(city => {
                if (!userBpfs.some(bpf => bpf.bpf_city_id === city.city_id)) {
                    // city.icon = getColoredIcon(city.city_departement)
                    // toState.push(city)
                    return (
                        <Marker position={[city.city_lat, city.city_long]} key={city.city_poi_id} icon={getColoredIcon(city.city_departement)}>
                            <Popup>
                                {`${city.city_name} (${city.city_departement})`}<br />
                                Non validé<br />
                                <span className="underline text-blue-600 cursor-pointer" data-city={city.city_poi_id} onClick={handleInfoClick}>Plus d'infos & Validation</span>
                            </Popup>
                        </Marker>
                    )
                }
            })}
        </LayerGroup>
    )

}
