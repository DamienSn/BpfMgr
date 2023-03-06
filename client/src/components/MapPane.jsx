import React from 'react'
import { useSelector } from 'react-redux'

import { XIcon, BadgeCheckIcon, XCircleIcon, ArrowsExpandIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'

// Lightbox
import { SRLWrapper } from 'simple-react-lightbox';
import { useMap } from '@monsonjeremy/react-leaflet';
import { useEffect } from 'react';

function MapPane(props) {
    const dispatch = useDispatch();
    const map = useMap();

    const cities = useSelector(state => state.cities)
    const dpts = useSelector(state => state.dpts)
    const provinces = useSelector(state => state.provinces)
    const bpfs = useSelector(state => state.bpfs)

    // Get poi id
    let hash = window.location.hash
    hash = hash.split("/")
    const poi = hash[2]

    const city = cities.find(city => city.city_poi_id == poi)
    const validated = bpfs.find(bpf => bpf.city_poi_id == poi)

    // Focus on map
    useEffect(() => {
        map.flyTo([city.city_lat, city.city_long], 12);
    }, [poi, hash])

    function closePane() {
        window.location.hash = "#/map"
    }

    const galleryOptions = {
        buttons: {
            showAutoplayButton: false,
            showDownloadButton: false,
            showNextButton: false,
            showPrevButton: false,
            showThumbnailsButton: false,
        },
        thumbnails: {
            showThumbnails: false
        }
    }

    const handleValidateClick = () => {
        dispatch({ type: 'SET_CITY_INPUT', payload: city.city_name });
        window.location.hash = "#/add"
    }

    return (
        <section className={`map-pane active fixed right-0 py-5 px-8 bg-gray-200`}>
            {/* Close button */}
            <div className="map-pane-header flex justify-end">
                <button id="map-pane-close" onClick={closePane}>
                    <XIcon className="icon-sm" />
                </button>
            </div>

            <div className="map-pane-body">
                <div className="map-pane-info">
                    <h2>{city && city.city_name}</h2>

                    {/* City image */}
                    {/* <SRLWrapper options={galleryOptions}>
                        <a href={`/img/cities/${city ? city.city_id : "1"}.jpg`}>
                            <img src={`/img/cities/${city ? city.city_id : "1"}.jpg`} alt={city ? city.city_name : 'Photo du BPF'} />
                        </a>
                    </SRLWrapper> */}

                    {/* Is validated ? */}
                    {validated &&
                        <p className="mt-4 text-green-500">
                            <BadgeCheckIcon className="icon-sm" />
                            &nbsp;Validée
                        </p>}
                    {/* Case not validated */}
                    {!validated &&
                        <button className="btn btn-outline-green mt-4" onClick={handleValidateClick}>Valider</button>
                    }
                    {/* Province */}
                    <h5 className="font-bold mt-2">Province</h5>
                    <p>{city && provinces.find(province => city.city_province_id == province.province_id).province_name}</p>
                    {/* Departement */}
                    <h5 className="font-bold mt-2">Département</h5>
                    <p>{city && dpts.find(dpt => city.city_departement == dpt.code).nom} ({city && city.city_departement})</p>
                </div>
                {/* Description */}
                <div className="text-justify mt-8 map-pane-description">{city && city.city_description}</div>
            </div>
        </section>
    )
}

export default MapPane
