import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import { MapIcon } from '@heroicons/react/outline'

// Map components
import L from 'leaflet';
import * as esri from "esri-leaflet";

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

/**
 * Container of the map
 */
function MapContainerBpfDev() {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    // Don't display banner and footer
    dispatch({ type: 'SET_BANNER', payload: false })
    dispatch({ type: 'SET_FOOTER', payload: false })

    // Pane
    const pane = useSelector(state => state.mapPane)

    const [position, setPosition] = useState([46.632, 1.852]);
    const mapCoords = useSelector(state => state.mapCoords);

    useEffect(() => {
        const map = L.map('map').setView([46.632, 1.852], 13);
        /*const osmLayer = L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://ffvelo.fr">Fédération française de cyclotourisme</a>',
            }).addTo(map);*/
            esri.basemapLayer('Topographic').addTo(map);
            const bpfLayer = esri.featureLayer({
                url: 'https://services5.arcgis.com/x7yCK2swiqKDYsU6/arcgis/rest/services/VELOENFRANCE/FeatureServer/0',
                where:'REFERENCE_SOUSTYPEPOI=101',
            }).addTo(map);
            console.log(bpfLayer);

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
        <main className={`${uid && 'menu-toggled menu-collapse'}`}>
            <h2><MapIcon className="icon-md" />&nbsp;Carte</h2>

            <MapPane id={pane.id} validated={pane.validated} active={pane.active} />

            <div id="map" class="w-full h-screen"></div>

        </main >
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
        <GeoJSON data={provincesShapes} style={{ color: 'orangered' }} />
    )
}

function DptsLayer() {
    return <GeoJSON data={dptsShapes} style={{ fillOpacity: 0 }} />
}

/**
 * Aller à la réunion
 */
function GoToCtl() {
    const map = useMap();
    // map.panTo()
    return <button>Aller à La Réunion</button>
}

export default MapContainerBpfDev;