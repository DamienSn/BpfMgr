import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import { MapIcon } from '@heroicons/react/outline'

// Map components
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl, GeoJSON, ZoomControl, useMapEvents } from '@monsonjeremy/react-leaflet'
import L from 'leaflet';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
import 'leaflet-geosearch/dist/geosearch.css'
import * as GeoSearch from 'leaflet-geosearch';

// GeoJSON shapes (departements and provinces)
import provincesShapes from '../utilities/provinces-shapes.json';
import dptsShapes from '../utilities/dpts-shapes.json';

// Marker icons
import homeMarker from '../img/icons/marker-home.svg';

// Redux
import { useSelector } from 'react-redux'

// Map Pane
import MapPane from '../components/MapPane'

// Layers
import DoneLayer from '../components/map/DoneLayer'
import CitiesLayer from '../components/map/CitiesLayer'
import { useDispatch } from 'react-redux'
import axios from 'axios'

/**
 * Container of the map
 */
function MapContainerBpf() {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    // Don't display banner and footer
    dispatch({ type: 'SET_BANNER', payload: false })
    dispatch({ type: 'SET_FOOTER', payload: false })

    // Get poi id
    let hash = window.location.hash
    hash = hash.split("/")

    // Pane
    const pane = hash.length > 2 ? true : false;

    return (
        <main className="p-0 mt-16 mb-0">
            {pane && <MapPane />}

            <MapContainer fullscreenControl={true} center={[46.632, 1.852]} zoom={5} scrollWheelZoom={true} zoomControl={false} zIndex={700} style={{heigth: "calc(100% - 15px)"}}>

                <ZoomControl position="bottomleft" />

                {/* Layers */}
                <LayersControl position="bottomleft">

                    {/* Map Layers */}
                    {/* CyclOSM */}
                    <LayersControl.BaseLayer checked name="CyclOSM">
                        <TileLayer
                            attribution='<a href="https:cyclosm.org" title="CyclOSM - Open Bicycle render">CyclOSM</a> v0.6 | Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
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
                    <LayersControl.Overlay name="Mes BPF">
                        <DoneLayer />
                    </LayersControl.Overlay>

                    {/* Others BPF layer */}
                    <LayersControl.Overlay name="BPF non faits">
                        <CitiesLayer />
                    </LayersControl.Overlay>

                    {/* Provinces */}
                    <LayersControl.Overlay name="Contours des provinces">
                        <ProvincesLayer />
                    </LayersControl.Overlay>

                    {/* Departements contours */}
                    <LayersControl.Overlay checked name="Contours des départements">
                        <DptsShapesLayer />
                    </LayersControl.Overlay>

                    {/* Départements colorés */}
                    <LayersControl.Overlay checked name="Coloration des départements">
                        <DptsLayer />
                    </LayersControl.Overlay>

                </LayersControl>

                {/* Others */}
                <BpfMap />

                {/* Search */}
                <SearchControl position="bottomleft" />
            </MapContainer>
        </main >
    )
}

function BpfMap() {
    const map = useMap();

    const [position, setPosition] = useState([46.632, 1.852]);
    const mapCoords = useSelector(state => state.mapCoords);

    useEffect(() => {
        if (mapCoords.length == 0) {
            navigator.geolocation.getCurrentPosition(pos => {
                const { latitude, longitude } = pos.coords;
                setPosition([latitude, longitude])
                if (mapCoords.length == 0) map.flyTo(position, 7);
            })
        } else {
            map.flyTo(mapCoords, 10)
        }
    }, [])

    return (
        <>
            <Marker position={position} icon={L.icon({
                iconUrl: homeMarker,
                iconSize: [40, 60]
            })}>
                <Popup>
                    Votre position
                </Popup>
            </Marker>
            {mapCoords.length > 0 &&
                <Marker position={mapCoords}></Marker>
            }
        </>
    )
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
        <GeoJSON data={provincesShapes} style={{ color: 'brown', weight: 2.5 }} />
    )
}

function DptsShapesLayer() {
    return <GeoJSON data={dptsShapes} style={{ fillOpacity: 0, weight: 2, color: "darkviolet" }} />
}

function DptsLayer() {
    let doneBpfs = useSelector(state => state.bpfs);
    let dpts = useSelector(state => state.dpts)

    let doneDpts = [];
    dpts.forEach(dpt => {
        // Get done bpfs of the departement
        const bpfs = doneBpfs.filter(a => a.city_departement == dpt.code);
        // Check if all dpt bpfs are done
        if (bpfs.length == dpt.dpt_cities_number) {
            doneDpts.push(dpt.code)
        }
    })
    console.log(doneDpts)
    return (
        <>
            {/* <GeoJSON data={data} style={{ fill: true, fillOpacity: 0.5, color: "red", weight: 0 }} /> */}
            {doneDpts.map(dpt => <GeoJSON key={dpt} data={dptsShapes.features.filter(a => a.properties.code == dpt)[0]} style={{ fill: true, fillOpacity: 0.5, color: "green", weight: 0 }} />)}
        </>
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