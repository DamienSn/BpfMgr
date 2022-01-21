import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
// Map components
import { MapIcon } from '@heroicons/react/outline'
import MapPane from '../components/MapPane'
import bpfDoneMarker from '../img/icons/bpf_fait.svg';
import bpfToDoMarker from '../img/icons/bpf_a_faire.svg';
// Leaflet
import * as L from 'leaflet';
import * as EsriLeaflet from "esri-leaflet";
import * as EsriLeafletVector from "esri-leaflet-vector/dist/esri-leaflet-vector";
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster';
import * as EsriLeafletCluster from 'esri-leaflet-cluster';

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
    const bpfs = useSelector(state => state.bpfs);

    console.log(bpfToDoMarker);


    useEffect(() => {

        document.getElementById("map").remove();
        const newMapDiv = document.createElement("div");
        newMapDiv.setAttribute("id", "map");
        document.getElementById("map-container").appendChild(newMapDiv);
        
        const map = L.map('map', {
            minZoom:3,
            maxZoom: 20
        }).setView([46.632, 1.852], 6);

        const defaultLayer = EsriLeafletVector.vectorBasemapLayer('ArcGIS:Topographic', {
                apikey: import.meta.env.VITE_ESRI_BASEMAP_API_KEY
            }
        ).addTo(map);

        const osmLayer = EsriLeafletVector.vectorBasemapLayer("OSM:Standard", {
            apikey: import.meta.env.VITE_ESRI_BASEMAP_API_KEY
        });
        const satelliteLayer = EsriLeafletVector.vectorBasemapLayer("ArcGIS:Imagery", {
            apikey: import.meta.env.VITE_ESRI_BASEMAP_API_KEY
        });

        const baseLayers = {
            'Topographique (Esri)': defaultLayer,
            'OpenStreetMap': osmLayer,
            'Satellite (Esri)': satelliteLayer,
        };
        
        const layerControl = L.control.layers(baseLayers).addTo(map);

        const bpfDoneIcon = L.icon({
            iconUrl: bpfDoneMarker,
            iconSize: [50, 50],
            iconAnchor: [17.5, 13.5],
            popupAnchor: [0, -11]
        });
        const bpfToDoIcon = L.icon({
            iconUrl: bpfToDoMarker,
            iconSize: [50, 50],
            iconAnchor: [17.5, 13.5],
            popupAnchor: [0, -11]
        });
        

        const bpfLayer = EsriLeafletCluster.featureLayer({
            url: 'https://services5.arcgis.com/x7yCK2swiqKDYsU6/arcgis/rest/services/VELOENFRANCE/FeatureServer/0',
            where:'REFERENCE_SOUSTYPEPOI=101',
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                    icon: bpfDoneIcon
                });
            }
        }).addTo(map);

        bpfLayer.on("load", ()=>{    
            bpfLayer.eachFeature(layer=>{
                console.log(layer.feature.properties.IDENTIFIANT_POI);
            });
        })

        bpfLayer.bindPopup(function (layer) {
            let nom = layer.feature.properties.NOM;
            let id = layer.feature.properties.IDENTIFIANT_POI;
            return L.Util.template(popupTemplate(nom,id));
        });
       
    }, [bpfs]);

    const popupTemplate = (nom, id) => {
        return (
            `<div class='row' style='min-width:320px; max-width:350px;'>
                <div class='col-lg-12 col-md-12 col-sm-12 green' align='center'>
                    <h4>${nom}</h4>
                    <span class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">BPF</span>
                </div>
            </div>
            <div class='row'>
                <div class='col-lg-12'>
                    <table width='100%' height='auto' border='0' cellpadding='0' cellspacing='0' style='font-size:14px;'>
                        <tbody>
                            <tr>
                                <td align='center' width='100%' rowspan='4' valign='middle'>
                                    <img class='img-responsive' src='https://s3.eu-central-1.amazonaws.com/veloenfrance/POI/${id}/Photos/mini/1_130.jpg'>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class='row'>
                <div class='col-lg-12 col-md-12 col-sm-12 text-center'><hr>
                    <button class="h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
                        <span class="mr-2">Plus d'infos</span>
                    </button>
                </div>
            </div>`
        );
    }
 
    return (

        <main className={`${uid && 'menu-toggled menu-collapse'}`}>

            <h2><MapIcon className="icon-md" />&nbsp;Carte</h2>

            <MapPane id={pane.id} validated={pane.validated} active={pane.active} />

            <div id="map-container">
                <div id="map" className="w-full h-screen"></div>
            </div>
            

        </main >

    )
}


export default MapContainerBpfDev;