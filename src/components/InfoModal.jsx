import React from 'react'
import { XIcon, BadgeCheckIcon, MapIcon } from '@heroicons/react/outline'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

// Lightbox
import { SRLWrapper } from 'simple-react-lightbox'

function InfoModal(props) {
    const dispatch = useDispatch();
    const modal = useSelector(state => state.search)
    const cities = useSelector(state => state.cities)
    const dpts = useSelector(state => state.dpts);
    const provinces = useSelector(state => state.provinces);
    const bpfs = useSelector(state => state.bpfs);

    const city = cities.find(city => city.city_id == modal.id)
    const done = bpfs.find(bpf => bpf.bpf_city_id == modal.id)

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

    const viewOnMap = () => {
        dispatch({ type: 'SET_MAP_COORDS', payload: [city.city_lat, city.city_long] })
        window.location.hash = "#/map"
    }

    return (
        <>
            {modal.active && <div className="info-modal w-1/3 h-2/3 bg-gray-200 px-8 py-6 rounded-l-xl">
                <div className="header border-b border-gray-400 flex justify-between">
                    <h5>{props.modalTitle}</h5>
                    <button onClick={() => dispatch({ type: 'SET_MODAL_ACTIVE', payload: false })}>
                        <XIcon className="icon-sm" />
                    </button>
                </div>

                {/* Modal body */}
                <div className="body">
                    <h3>{city && city.city_name}</h3>
                    {/* Wrapper */}
                    <div className="w-full flex justify-between items-center flex-wrap">
                        {/* City infos */}
                        <div>
                            <h5 className="font-bold">Département</h5>
                            <p>{city && dpts.find(dpt => dpt.code == city.city_departement).nom} ({city && city.city_departement})</p>
                            <h5 className="font-bold">Province</h5>
                            <p>{city && provinces.find(pro => city.city_province_id == pro.province_id).province_name}</p>
                            {/* Validating */}
                            {/* Is validated ? */}
                            {done &&
                                <p className="mt-4 text-green-500">
                                    <BadgeCheckIcon className="icon-sm" />
                                    &nbsp;Validée
                                </p>}
                            {/* Case not validated */}
                            {!done &&
                                <button className="btn btn-outline-green mt-4" onClick={handleValidateClick}>Valider</button>
                            }
                            {/* View on map */}
                            <button className="btn btn-outline-blue mt-4 ml-2" onClick={viewOnMap}><MapIcon className="icon-sm" />&nbsp;Carte</button>
                        </div>
                        {/* Picture */}
                        <div className="picture mt-4 ml-4">
                            {/* City image */}
                            <SRLWrapper options={galleryOptions}>
                                <a href={`/img/cities/${city ? city.city_id : "1"}.jpg`}>
                                    <img src={`/img/cities/${city ? city.city_id : "1"}.jpg`} alt={city ? city.city_name : 'Photo du BPF'} />
                                </a>
                            </SRLWrapper>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p className="description text-justify mt-4 pt-4 border-t border-gray-400">{city && city.city_description}</p>
            </div>}
        </>
    )
}

export default InfoModal
