import React, { useState } from 'react'
import { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import { BadgeCheckIcon, CalendarIcon, TrashIcon, SupportIcon } from '@heroicons/react/outline'
import SearchBar from '../components/SearchBar'
import { useDispatch, useSelector } from 'react-redux'
import { ListTable, ListTableBcn} from '../components/ListTable'
import axios from 'axios'
import { getBpfs } from '../redux/actions/bpfs.actions'
import { getBcns } from '../redux/actions/bcns.actions'

function List() {
    const dispatch = useDispatch();
    // display banner and footer
    dispatch({ type: 'SET_BANNER', payload: true })
    dispatch({ type: 'SET_FOOTER', payload: true })

    // State
    const uid = useContext(UidContext);
    const dpts = useSelector(state => state.dpts);
    const provinces = useSelector(state => state.provinces)
    const [dptFilter, setDptFilter] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("asc");
    const [tab, setTab] = useState(true); // True : BPF - False : BCN
    const selection = useSelector(state => state.selectionBpf)

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

    const handleDptSelectChange = (e) => {
        let val = e.target.value;
        val ? setDptFilter([val]) : setDptFilter([]);
    }

    const handleDateFilterChange = (e) => {
        if (dateFilter === "desc") {
            setDateFilter("asc");
        } else {
            setDateFilter("desc")
        }
    }

    const handlePills = (e) => {
        if (e.target.innerText === 'BPF') {
            document.querySelector('#pill-bcn').classList.remove('pill-active');
            document.querySelector('#pill-bpf').classList.add('pill-active');
            setTab(true);
        } else {
            setTab(false);
            document.querySelector('#pill-bpf').classList.remove('pill-active');
            document.querySelector('#pill-bcn').classList.add('pill-active');
        }
    }

    const handleDelete = () => {
        const verif = confirm(`Êtes-vous sûr de vouloir supprimer ${selection.length} BPF${selection.length > 1 ? "s" : ""} ?`)
        if (!verif) return;
        dispatch({type: "SET_LOADER", payload: true})
        let promises = [];
        for (let i = 0; i < selection.length; i++) {
            let promise = axios({
                url: `${import.meta.env.VITE_API_URL}bpf/delete`,
                method: "DELETE",
                withCredentials: true,
                headers: {
                    "x-api-key": import.meta.env.VITE_API_KEY
                },
                data: {
                    userId: uid,
                    city: selection[i]
                }
            })
            promises.push(promise);
        }
        Promise.all(promises)
            .then(res => {
                console.log(res);
                dispatch({type: "SET_LOADER", payload: false});
                dispatch(getBpfs(uid));
                dispatch(getBcns(uid));
                dispatch({type: "CLEAR_SEL_BPF"})
            })
            .catch(err => {
                console.log(err);
                dispatch({type: "SET_LOADER", payload: false});
            })
    }

    return (
        <main>
            <h2>
                <BadgeCheckIcon className="icon-lg" />
                &nbsp;Vos BPF
            </h2>

            <div className="flex flex-wrap justify-start items-center space-y-4 sm:space-x-4 sm:space-y-0  ml-8">
                <NavPills handler={handlePills} />

                {/* Date */}
                <div className="flex items-center">
                    <button id="date" checked={dateFilter} onClick={handleDateFilterChange} className="btn btn-outline-blue">
                        <CalendarIcon class="icon-sm" />&nbsp;
                        {dateFilter === "desc" ? "A partir du plus récent" : "A partir du plus ancien"}
                    </button>
                </div>

                <div className="flex items-center">
                    <button className="btn btn-outline-red" onClick={handleDelete}><TrashIcon className="icon-sm" />&nbsp;Supprimer la sélection</button>
                    &nbsp;<a href="https://github.com/DamienSn/BpfMgr/wiki/Suppression-de-BPF---BCN" target="_blank" aria-label='aide' class="btn btn-outline-blue"><SupportIcon className="icon-sm" />&nbsp; Aide à la suppression</a>
                </div>
            </div>

            <div className="settings flex flex-wrap justify-start items-center space-y-4 sm:space-x-4 sm:space-y-0 mt-8 ml-8">

                <SearchBar action={setSearchFilter} label={true} />

                {/* Departement */}
                <div>
                    <label htmlFor="dpt-select" className="label">Département</label>
                    <input type="text" id="dpt-select" list="dpt-list" onChange={handleDptSelectChange} className="input" placeholder="Sélectionner..." />
                    <datalist id="dpt-list">
                        {dpts.map((dpt, index) =>
                            <option value={dpt.code} key={index}>{dpt.nom}</option>
                        )}
                    </datalist>
                </div>

                {/* Province */}
                <div>
                    <label htmlFor="province-select" className="label">Province</label>
                    <input type="text" id="province-select" list="provinces-list" className="input" placeholder="Sélectionner..." onChange={handleProvinceSelectChange} />
                    <datalist id="provinces-list">
                        {provinces.map((province, index) =>
                            <option value={province.province_name} key={index}>{province.province_dpts.join(', ')}</option>
                        )}
                    </datalist>
                </div>
            </div>

            {/* Controles */}


            {tab ?
                <ListTable dpt={dptFilter} search={searchFilter} date={dateFilter} checked={false}/>
                : <ListTableBcn dpt={dptFilter} search={searchFilter} date={dateFilter} />
            }

        </main>
    )
}

function NavPills(props) {
    return (
        <nav className="flex self-center">
            <button id="pill-bpf" onClick={props.handler} className="py-2 px-4 border-2 border-r-0 border-blue-400 rounded-l-full cursor-pointer pill-active">
                BPF
            </button>
            <button id="pill-bcn" onClick={props.handler} className="py-2 px-4 border-2 border-blue-400 rounded-r-full cursor-pointer">
                BCN
            </button>
        </nav>
    )
}

export default List
