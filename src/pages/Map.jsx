import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import { MapIcon } from '@heroicons/react/outline'
import { getAllBpfs, getAllCities } from '../utilities/bpfRequests'

// Map components
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl, LayerGroup, GeoJSON, ZoomControl } from '@monsonjeremy/react-leaflet'
import L from 'leaflet';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
import 'leaflet-geosearch/dist/geosearch.css'
import * as GeoSearch from 'leaflet-geosearch';

// GeoJSON shapes (departements and provinces)
import provincesShapes from '../utilities/provinces-shapes.json';
import dptsShapes from '../utilities/dpts-shapes.json';

// Marker icons
import iconMarkerCheck from '../img/icons/marker-check.svg'
import iconMarkerCheckRed from '../img/icons/marker-check-red.svg';
import iconMarkerCheckGreen from '../img/icons/marker-check-green.svg';
import iconMarkerCheckBlue from '../img/icons/marker-check-blue.svg';
import iconMarkerCheckYellow from '../img/icons/marker-check-yellow.svg';
import iconMarkerCheckOrange from '../img/icons/marker-check-orange.svg';

import homeMarker from '../img/icons/marker-home.svg';

// Colors of dpts
import colors from '../utilities/colors-dpts.json'

// Redux
import { useSelector } from 'react-redux'
import { dptsSelector } from '../redux/selectors/dpts.selectors'
import { provincesSelector } from '../redux/selectors/provinces.selectors'

// Other components
import MapPane from '../components/MapPane'
import { useDispatch } from 'react-redux'
import { setPane } from '../redux/actions/pane.actions'

function MapContainerBpf() {
    const uid = useContext(UidContext);

    // Pane
    const pane = useSelector(state => state.mapPane)

    // Filters
    const [dptFilter, setDptFilter] = useState("");

    return (
        <main className={`${uid && 'menu-toggled menu-collapse'}`}>
            <h2><MapIcon className="icon-md" />&nbsp;Carte</h2>

            <MapPane id={pane.id} validated={pane.validated} active={pane.active}/>
        
            <MapContainer fullscreenControl={true} center={[46.632, 1.852]} zoom={5} scrollWheelZoom={true} zoomControl={false}>

                <ZoomControl position="bottomleft" />

                {/* Layers */}
                <LayersControl position="bottomleft">

                    {/* Map Layers */}
                    {/* CyclOSM */}
                    <LayersControl.BaseLayer checked name="CyclOSM">
                        <TileLayer
                            attribution='Kartendaten: © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende, SRTM | Kartendarstellung: © <a href="http://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                            url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    {/* OSM */}
                    <LayersControl.BaseLayer name="OpenStreetMap">
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    {/* OpenTopoMap */}
                    <LayersControl.BaseLayer name="OpenTopoMap">
                        <TileLayer
                            attribution='Kartendaten: © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende, SRTM | Kartendarstellung: © <a href="http://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                            url="https://c.tile.opentopomap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>

                    {/* Marker Layers */}
                    {/* Done BPF layer */}
                    <LayersControl.Overlay checked name="Mes BPF">
                        <DoneLayer filter={{ dpt: dptFilter }} />
                    </LayersControl.Overlay>

                    {/* Others BPF layer */}
                    <LayersControl.Overlay name="BPF non faits">
                        <CitiesLayer filter={{ dpt: dptFilter }} />
                    </LayersControl.Overlay>

                    {/* Provinces */}
                    <LayersControl.Overlay name="Contours des provinces">
                        <ProvincesLayer />
                    </LayersControl.Overlay>

                    {/* Departements */}
                    <LayersControl.Overlay checked name="Contours des départements">
                        <DptsLayer />
                    </LayersControl.Overlay>

                </LayersControl>

                {/* Others */}
                <BpfMap />

                <DptCtl handler={setDptFilter} />
                <ProvinceCtl handler={setDptFilter} />
                <GoToCtl />

                {/* Search */}
                <SearchControl position="bottomleft" />

            </MapContainer>
        </main >
    )
}

function BpfMap() {
    const map = useMap();

    const [position, setPosition] = useState([46.632, 1.852]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            const { latitude, longitude } = pos.coords;
            setPosition([latitude, longitude])
            map.flyTo(position, 7)
        })
    }, [])

    return (
        <Marker position={position} icon={L.icon({
            iconUrl: homeMarker,
            iconSize: [40, 60]
        })}>
            <Popup>
                Votre position
            </Popup>
        </Marker>
    )
}

function DoneLayer(props) {
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

function CitiesLayer(props) {
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

    function handleInfoClick (e) {
        dispatch(setPane({
            id: JSON.parse(e.target.attributes["data-city"].value).city_id,
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
                                Non validé<br />
                                <a href="#" data-city={JSON.stringify(city)} onClick={handleInfoClick}>Plus d'infos</a>
                            </Popup>
                        </Marker>
                    )
                }
            })}
        </LayerGroup>
    )

}

/**
 * Get a DPT code and return the corresponding icon (with color)
 * @param {*} dpt Departement
 * @returns 
 */
function getColoredIcon(dpt) {
    if (colors[dpt] === "blue") {
        return new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [15, 25],
            iconAnchor: [0, 0],
            popupAnchor: [0, 0],
            shadowSize: [25, 25]
        });
    } else if (colors[dpt] === "yellow") {
        return new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [15, 25],
            iconAnchor: [0, 0],
            popupAnchor: [0, 0],
            shadowSize: [25, 25]
        });
    } else if (colors[dpt] === "red") {
        return new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [15, 25],
            iconAnchor: [0, 0],
            popupAnchor: [0, 0],
            shadowSize: [25, 25]
        });
    } else if (colors[dpt] === "green") {
        return new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [15, 25],
            iconAnchor: [0, 0],
            popupAnchor: [0, 0],
            shadowSize: [25, 25]
        });
    } else if (colors[dpt] === "orange") {
        return new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [15, 25],
            iconAnchor: [0, 0],
            popupAnchor: [0, 0],
            shadowSize: [25, 25]
        });
    } else {
        return new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [15, 25],
            iconAnchor: [0, 0],
            popupAnchor: [0, 0],
            shadowSize: [25, 25]
        });
    }
}

function SearchControl() {
    const map = useMap();

    if (!document.querySelector('.geosearch')) {
        const search = new GeoSearch.GeoSearchControl({
            provider: new GeoSearch.OpenStreetMapProvider(),
        });
        map.addControl(search);
    }
    return null
}

function ProvincesLayer() {
    return (
        <GeoJSON data={provincesShapes} style={{color: 'orangered'}}/>
    )
}

function DptsLayer() {
    return <GeoJSON data={dptsShapes} style={{ fillOpacity: 0 }} />
}

/**
 * Departement Control
 */
function DptCtl(props) {
    // Control
    const map = useMap();

    // List of dpts and provinces
    const dpts = useSelector(dptsSelector);

    const Control = L.Control.extend({
        options: {
            position: 'topleft'
        },
        initialize(options) {
            L.Util.setOptions(this, options)
        },
        onAdd() {
            const container = L.DomUtil.create('div');
            const input = L.DomUtil.create('input', container);

            
            return container;
        },
        onRemove() {}
    })

    return <button></button>;
}

/**
 * Province Control
 */
function ProvinceCtl(props) {
    // Control
    const map = useMap();

    // List of dpts and provinces
    const provinces = useSelector(provincesSelector);

    const handleProvinceSelectChange = (e) => {
        let val = e.target.value;
        provinces.forEach(pro => {
            if (pro.province_name == val) {
                props.handler(pro.province_dpts);
            } else if (e.target.value === "") {
                props.handler("")
            }
        })
    }

    return (
        <div className="leaflet-top leaflet-left">
            <div className="leaflet-control leaflet-bar">
                <input type="text" list="province-ctl-list" placeholder="Filtrer par province" onInput={handleProvinceSelectChange} />
                <datalist id="province-ctl-list">
                    {provinces.map((province, index) =>
                        <option value={province.province_name} key={index}>{province.province_dpts.join(", ")}</option>
                    )}
                </datalist>
            </div>
        </div>
    )
}

/**
 * Aller à la réunion
 */
function GoToCtl() {
    const map = useMap();
    // map.panTo()
    return <button>Aller à La Réunion</button>
}

export default MapContainerBpf;