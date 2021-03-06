import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../components/AppContext'
import { SupportIcon, PlusIcon, PhotographIcon, HandIcon, DatabaseIcon, ExclamationIcon } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '../components/toaster/ToastProvider';
import { getBpfs } from '../redux/actions/bpfs.actions';
import { getBcns } from '../redux/actions/bcns.actions';
import Tabs from '../components/Tabs';

function Add() {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    const toast = useToast();
    // display banner and footer
    dispatch({ type: 'SET_BANNER', payload: true })
    dispatch({ type: 'SET_FOOTER', payload: true })

    // State
    const [cities, setCities] = useState([]);
    const [cityInput, setCityInput] = useState(useSelector(state => state.addCity));
    const [dateInput, setDateInput] = useState('');
    const [results, setResults] = useState([]);

    // Fetch API to get all cities for select
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}cities/all`, {
            withCredentials: true,
            headers: {
                "x-api-key": import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                let allCitiesNames = [];
                res.data.data.map(({ city_name }) => allCitiesNames.push(city_name))
                setCities(allCitiesNames);
            })
            .catch(err => console.error(err))
    }, [])

    // Send request to create bpf made by hand
    const handleByHandSubmit = (e) => {
        e.preventDefault();
        if (dateInput !== "") {
            dispatch({ type: 'SET_LOADER', payload: true });
            // Reset default value
            dispatch({ type: 'SET_CITY_INPUT', payload: "" })
            setCityInput("");

            axios({
                url: `${import.meta.env.VITE_API_URL}bpf/create`,
                method: 'post',
                data: {
                    name: cityInput,
                    userId: uid,
                    date: dateInput
                },
                headers: {
                    "x-api-key": import.meta.env.VITE_API_KEY
                }
            })
                .then(res => {
                    dispatch({ type: 'SET_LOADER', payload: false });

                    if (res.data.message === 'ok') {
                        toast?.pushSuccess(`BPF ${cityInput} cr???? !`)
                        dispatch(getBpfs(uid));
                        dispatch(getBcns(uid));
                    } else if (res.data.message === 'error') {
                        if (res.data.error === "existing yet") {
                            toast?.pushError('Le BPF est d??j?? point??')
                        } else if (res.data.error === "no city found") {
                            toast?.pushError('Pas de ville trouv??e avec ces coordonn??es')
                        } else {
                            toast?.pushError('Il y a eu une erreur')
                        }
                    }
                })
                .catch(err => {
                    dispatch({ type: 'SET_LOADER', payload: false });
                    console.log(err)
                })
        } else {
            alert('Veuillez ins??rer une date valide !')
        }
    }

    // Make api call to create bpf by photo
    const handleByPhotoSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'SET_LOADER', payload: true });

        // Get selected file
        const input = document.querySelector('#photo input[is="drop-files"]');
        // Loop through selected files
        for (let i = 0; i < input.files.length; i++) {
            // Genrate form data
            const formData = new FormData();
            formData.append("file", input.files[i]);
            formData.append("userId", uid);
            formData.append("date", "photo");

            // Make request
            axios.post(`${import.meta.env.VITE_API_URL}bpf/create/by_photo`, formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    "x-api-key": import.meta.env.VITE_API_KEY
                }
            })
                .then(res => {
                    dispatch({ type: 'SET_LOADER', payload: false });

                    if (res.data.message === 'ok') {
                        toast.pushSuccess("BPF cr???? !")
                        dispatch(getBpfs(uid));
                        dispatch(getBcns(uid));
                    } else if (res.data.message === 'error') {
                        if (res.data.error === "existing yet") {
                            toast?.pushError('Le BPF est d??j?? point??')
                        } else if (res.data.error === "no city found") {
                            toast?.pushError('Pas de ville trouv??e avec ces coordonn??es')
                        } else if (res.data.error === "no gps data") {
                            toast?.pushError('La photo ne poss??de pas de donn??es GPS')
                        } else {
                            toast?.pushError('Il y a eu une erreur')
                        }
                    }
                })
                .catch(err => {
                    dispatch({ type: 'SET_LOADER', payload: false });
                    console.log(err)
                })
        }
    }

    // Submit CSV file
    const handleCsvSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'SET_LOADER', payload: true });

        // Get selected file
        const input = document.querySelector('#csv input[is="drop-files"]');

        const formData = new FormData();
        formData.append("file", input.files[0]);
        formData.append("userId", uid);

        // Make request
        axios.post(`${import.meta.env.VITE_API_URL}bpf/csv`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
                "x-api-key": import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                dispatch({ type: 'SET_LOADER', payload: false });
                dispatch(getBpfs(uid));
                dispatch(getBcns(uid));
                setResults(res.data.output);
            })
            .catch(err => {
                dispatch({ type: 'SET_LOADER', payload: false });
                console.log(err)
            })
    }

    return (
        <main>
            <h2>Ajouter un BPF</h2>

            <Tabs tabs={{ titles: ["Manuellement", "Avec une photo", "Avec un CSV"] }}>
                <div id="tabs-titles">
                    <h5><HandIcon className="icon-sm" />&nbsp;Manuellement</h5>
                    <h5><PhotographIcon className="icon-sm" />&nbsp;Avec une photo</h5>
                    <h5><DatabaseIcon className="icon-sm" />&nbsp;Avec un CSV</h5>
                </div>
                <div id="tabs-bodies">
                    {/* Ajout Manuel */}
                    <div>
                        <p>Ajoutez votre BPF tout seul, comme un grand !</p>
                        <form action="" className="mt-4" onSubmit={handleByHandSubmit}>
                            <div>
                                <label htmlFor="city-input" className="label">Lieu</label>
                                <input type="text" id="city-input" className="input" list="cities-input-list" placeholder="Taper pour rechercher..." required onInput={e => setCityInput(e.target.value)} value={cityInput} />
                                <p><SupportIcon className="icon-sm" /> Pensez aux tirets !</p>
                                <datalist id="cities-input-list">
                                    {cities.map((city, index) =>
                                        <option data-value={city} key={index}>{city}</option>
                                    )
                                    }
                                </datalist>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="date-input" className="label">Date</label>
                                <input type="date" className="input" id="date-input" onInput={e => setDateInput(e.target.value)} />
                            </div>

                            <button type="submit" className="btn btn-blue mt-4"><PlusIcon className="icon-sm" />&nbsp;Ajouter</button>
                        </form>
                    </div>

                    {/* Ajout avec une photo */}
                    <div>
                        <p>Importez une photo <span className="font-bold underline">g??olocalis??e</span> et laissez nous faire le reste !</p>
                        <form className="mt-4" onSubmit={handleByPhotoSubmit} id="photo">
                            <input
                                type="file"
                                multiple
                                name="file"
                                label="Glissez un fichier ou cliquez ici pour ouvrir l'explorateur"
                                help="Choisir une photo pour ajouter un BPF"
                                is="drop-files"
                                accept="image/jpeg, image/png"
                            />

                            <button type="submit" className="btn btn-blue mt-4"><PlusIcon className="icon-sm" />&nbsp;Ajouter</button>

                            {/* <p><ExclamationIcon className="icon-sm" />&nbsp;La photo doit ??tre g??olocalis??e</p> */}
                        </form>
                    </div>

                    {/* Ajout CSV */}
                    <div>
                        <div>
                            Merci de vous r??f??rer ?? l'aide :&nbsp;
                            <a href="https://github.com/DamienSn/BpfMgr/wiki/Importer-un-fichier-CSV"
                                className="text-blue-500 underline cursor-pointer hover:text-blue-700"
                                target="_blank">
                                <SupportIcon className="icon-sm" />
                                &nbsp;Aide
                            </a>
                        </div>
                        <form className="mt-4" id="csv" onSubmit={handleCsvSubmit}>
                            <input
                                type="file"
                                name="file"
                                label="Glissez un fichier ou cliquez ici pour ouvrir l'explorateur"
                                help="Choisir un fichier"
                                is="drop-files"
                                accept="text/csv"
                            />

                            <button type="submit" className="btn btn-blue mt-4"><PlusIcon className="icon-sm" />&nbsp;Ajouter</button>

                            {/* <p><ExclamationIcon className="icon-sm" />&nbsp;La photo doit ??tre g??olocalis??e</p> */}
                        </form>
                        {results.length > 0 &&
                            <div className="results bg-gray-400 text-white rounded font-mono p-4 mt-8 h-[300px] w-[500px] overflow-scroll text-xs">
                                {results.map((result, index) => <p key={index}>{result}</p>)}
                            </div>
                        }
                    </div>
                </div>
            </Tabs>
            <p className="mt-4"><SupportIcon className="icon-sm" />&nbsp;Si, lors de l'ajout d'un BPF, aucun BPF du d??partement n'est valid??, <span className="font-bold">le BCN sera valid?? automatiquement</span> avec ce BPF</p>
        </main>
    )
}

export default Add
