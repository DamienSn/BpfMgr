import React, { useContext, useState, useEffect } from 'react'
import { UidContext } from '../components/AppContext'
import { GlobeIcon, SearchIcon, EmojiSadIcon, ArrowSmRightIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux';
import InfoModal from '../components/InfoModal';

function Search() {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    const page = useSelector(state => state.search.page)
    const [search, setSearch] = useState("")
    const [marginTop, setMarginTop] = useState("80px")

    useEffect(() => {
        page === "results" ? setMarginTop("0") : setMarginTop("80px");
        page === "results" ? dispatch({ type: 'SET_BANNER', payload: true }) : dispatch({ type: 'SET_BANNER', payload: false })
    }, [page])


    // Results
    const cities = useSelector(state => state.cities)
    const provinces = useSelector(state => state.provinces)
    const dpts = useSelector(state => state.dpts)

    const [citiesFilteredBySearch, setCitiesFilteredBySearch] = useState([]);
    const [dptFilter, setDptFilter] = useState([])

    useEffect(() => {
        let temp = []
        cities.forEach(city => {
            if ((dptFilter.includes(city.city_departement) || dptFilter.length == 0 || dptFilter[0] == "")
                && (city.city_name.toLowerCase().includes(search.toLowerCase()))
            ) {
                temp.push(city)
            }
        })
        setCitiesFilteredBySearch(temp)
    }, [search, dptFilter])

    useEffect(() => {
        if (page === "home") {
            document.querySelector('#search-bar').focus()
        }
    })

    const displayModal = (e) => {
        dispatch({
            type: 'SET_SEARCH',
            payload: {
                id: e.target.attributes["data-city"].value,
                page: 'results',
                active: true
            }
        })
    }

    const handleProvinceSelectChange = (e) => {
        let val = e.target.value;
        provinces.forEach(pro => {
            if (pro.province_name == val) {
                setDptFilter(pro.province_dpts);
            } else if (e.target.value === "") {
                setDptFilter([])
            }
        })
    }

    return (
        <main className={`search-page ${uid && 'menu-toggled menu-collapse'}`} style={{ marginTop }}>
            {page === "home" ?
                <div className="p-12 bg-blue-300 bg-opacity-70 home">
                    <h1><GlobeIcon className="icon-lg" />&nbsp;Explorer</h1>
                    {/* Search form */}
                    <form onSubmit={() => dispatch({ type: 'SET_SEARCH_PAGE', payload: 'results' })} className="flex">
                        <div>
                            <div className="flex bg-gray-300 p-3 w-72 space-x-4 rounded-lg">
                                <SearchIcon className="icon-sm opacity-50" />
                                <input type="search" id="search-bar" placeholder="Rechercher..." onInput={(e) => setSearch(e.target.value)} className="bg-gray-300 outline-none" />
                            </div>
                        </div>
                        <button className="btn btn-blue ml-2" type="submit">Ok</button>
                    </form>
                </div>
                :
                // Search results
                <>
                    <h2><GlobeIcon className="icon-lg" />&nbsp;Explorer</h2>

                    <div className="search-results mb-10">
                        {/* Form */}
                        <form className="w-full flex justify-between">
                            {/* Search bar */}
                            <div>
                                <label htmlFor="search-bar">Recherche</label>
                                <div className="flex bg-gray-300 p-3 w-72 space-x-4 rounded-lg">
                                    <SearchIcon className="icon-sm opacity-50" />
                                    <input type="search" id="search-bar" placeholder="Rechercher..." onInput={(e) => setSearch(e.target.value)} value={search} className="bg-gray-300 outline-none" />
                                </div>
                            </div>
                            {/* Dpt bar */}
                            <div>
                                <label htmlFor="dpt-bar">Département</label>
                                <input type="search" list="data-dpt-bar" id="dpt-bar" placeholder="Département" className="input block" onChange={e => setDptFilter([e.target.value])} />
                                <datalist id="data-dpt-bar">
                                    {dpts.map((dpt, index) =>
                                        <option value={dpt.code} key={index}>{dpt.nom}</option>
                                    )}
                                </datalist>
                            </div>
                            {/* Province bar */}
                            <div>
                                <label htmlFor="province-bar">Province</label>
                                <input type="search" list="data-province-bar" id="province-bar" placeholder="Province" className="input block" onChange={handleProvinceSelectChange} />
                                <datalist id="data-province-bar">
                                    {provinces.map((province, index) =>
                                        <option value={province.province_name} key={index}>{province.province_dpts.join(', ')}</option>
                                    )}
                                </datalist>
                            </div>
                        </form>

                        <div className="results mt-8">
                            {citiesFilteredBySearch.length > 1 && <p className="font-bold">{citiesFilteredBySearch.length} résultat{citiesFilteredBySearch.length > 1 && "s"}</p>}
                            {citiesFilteredBySearch.length === 0 && <p className="font-bold"><EmojiSadIcon className="icon-sm" />&nbsp;Pas de résultats</p>}

                            {citiesFilteredBySearch.map((city, index) => {
                                return (
                                    <div key={index} className="mb-6">
                                        <h4 className="text-blue-600">{city.city_name}</h4>
                                        <p>
                                            <span className="font-bold">Département : </span>
                                            {city.city_departement} -&nbsp;
                                            <span className="font-bold">Province : </span>
                                            {provinces.find(pro => pro.province_id == city.city_province_id).province_name}
                                        </p>
                                        <p>{/[^.]*À voir:[^.]*\./.exec(city.city_description)[0]}</p>

                                        <button className="py-1 px-2 rounded btn-outline-blue" data-city={city.city_id} onClick={displayModal}>Plus d'infos&nbsp;<ArrowSmRightIcon className="icon-sm" /></button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </>
            }
            <InfoModal modalTitle="Détails" />
        </main>
    )
}

export default Search
