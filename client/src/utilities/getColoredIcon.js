import L from 'leaflet'
// Marker icons
import iconMarkerCheck from '../img/icons/marker-check.svg'
import iconMarkerCheckRed from '../img/icons/marker-check-red.svg';
import iconMarkerCheckGreen from '../img/icons/marker-check-green.svg';
import iconMarkerCheckBlue from '../img/icons/marker-check-blue.svg';
import iconMarkerCheckYellow from '../img/icons/marker-check-yellow.svg';
import iconMarkerCheckOrange from '../img/icons/marker-check-orange.svg';

// Colors of dpts
import colors from '../utilities/colors-dpts.json'

/**
 * Get a DPT code and return the corresponding icon (with color)
 * @param {*} dpt Departement
 * @returns 
 */
 export default function getColoredIcon(dpt) {
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
