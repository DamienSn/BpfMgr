import React from 'react'
import { XIcon } from '@heroicons/react/outline'
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

    const city = cities.find(city => city.city_id == modal.id)

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

    return (
        <>
            {modal.active && <div className="info-modal w-1/3 h-2/3 bg-gray-200 px-8 py-6 rounded-l-xl">
                <div className="header border-b border-gray-400 flex justify-between">
                    <h5>{props.modalTitle}</h5>
                    <button onClick={() => dispatch({ type: 'SET_MODAL_ACTIVE', payload: false })}>
                        <XIcon className="icon-sm" />
                    </button>
                </div>

                <div className="w-full flex justify-between">
                    <div className="body">
                        <h3>{city && city.city_name}</h3>
                        <h5 className="font-bold">Département</h5>
                        <p>{city && dpts.find(dpt => dpt.code == city.city_departement).nom} ({city && city.city_departement})</p>
                        <h5 className="font-bold">Province</h5>
                        <p>{city && provinces.find(pro => city.city_province_id == pro.province_id).province_name}</p>
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

                {/* Description */}
                <p className="description text-justify mt-4 pt-4 border-t border-gray-400">{city && city.city_description}</p>
            </div>}
        </>
    )
}

export default InfoModal
