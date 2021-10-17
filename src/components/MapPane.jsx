import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { XIcon, BadgeCheckIcon, XCircleIcon, ArrowsExpandIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'

// Lightbox
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';

function MapPane(props) {
    const dispatch = useDispatch();
    const gallery = useRef();

    const cities = useSelector(state => state.cities)
    const dpts = useSelector(state => state.dpts)
    const provinces = useSelector(state => state.provinces)

    const city = cities.find(city => city.city_id == props.id)

    function closePane() {
        dispatch({ type: 'SET_PANE_ACTIVE', payload: false })
    }

    const onInitGallery = useCallback((detail) => {
        if (detail) {
            gallery.current = detail.instance;
        }
    }, []);

    // Refresh light gallery
    useEffect(() => {
        gallery.current.refresh();
    }, [city])

    return (
        <section className={`map-pane ${props.active && 'active'} fixed right-0 py-5 px-8 bg-gray-200`}>
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
                    <LightGallery plugins={[lgZoom]} onInit={onInitGallery} controls={false} download={false}>
                        <a href={`/img/cities/${city ? city.city_id : "1"}.jpg")`}>
                            {/* Mini */}
                            <div className="map-pane-picture mb-8" style={{ backgroundImage: `url("/img/${city ? 'cities/' + city.city_id : 'bg-ventoux'}.jpg")` }}>
                                {/* Fullscreen button */}
                                <button className="map-pane-picture-fullscreen bg-gray-100 shadow-md rounded-md w-6 h-6">
                                    <ArrowsExpandIcon className="icon-sm" />
                                </button>
                            </div>
                        </a>
                    </LightGallery>

                    {/* Is validated ? */}
                    <p className={props.validated ? 'text-green-500' : 'text-red-500'}>
                        {props.validated ? <BadgeCheckIcon className="icon-sm" /> : <XCircleIcon className="icon-sm" />}
                        &nbsp;{props.validated ? "Validée" : "A valider"}
                    </p>
                    {/* Province */}
                    <h5 className="font-bold mt-2">Province</h5>
                    <p>{city && provinces.find(province => city.city_province_id == province.province_id).province_name}</p>
                    {/* Departement */}
                    <h5 className="font-bold mt-2">Département</h5>
                    <p>{city && dpts.find(dpt => city.city_departement == dpt.code).nom} ({city && dpts.find(dpt => city.city_departement == dpt.code).code})</p>
                </div>
                {/* Description */}
                <div className="text-justify mt-8 map-pane-description">{city && city.city_description}</div>
            </div>
        </section>
    )
}

export default MapPane
