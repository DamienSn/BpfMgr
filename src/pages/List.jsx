import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import { BadgeCheckIcon, FilterIcon } from '@heroicons/react/outline'
import SearchBar from '../components/SearchBar'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { ListTable, ListTableBcn } from '../components/ListTable'

function List() {
    const uid = useContext(UidContext);

    // State
    const [dpts, setDpts] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [dptFilter, setDptFilter] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");
    const [dateFilter, setDateFilter] = useState(null);
    const [tab, setTab] = useState(true); // True : BPF - False : BCN

    useEffect(() => {
        fetchDpts();
        fetchProvinces();
    }, [])

    const toggleSettings = () => {
        const settings = document.querySelector('.search-settings-panel');
        if (settings.getAttribute('data-toggled')) {
            settings.classList.remove('active');
            settings.removeAttribute('data-toggled');
        } else {
            settings.classList.add('active');
            settings.setAttribute('data-toggled', true)
        }
    }

    const fetchDpts = () => {
        axios({
            method: 'get',
            url: 'https://geo.api.gouv.fr/departements',
            // withCredentials: true
        })
            .then(res => setDpts(res.data))
            .catch(err => console.error(err))
    }

    const fetchProvinces = () => {
        axios({
            method: 'get',
            url: `${import.meta.env.VITE_API_URL}provinces/get/all`,
            // withCredentials: true
        })
            .then(res => {
                let data = res.data.data;

                data.forEach((province) => {
                    province.province_dpts = province.province_dpts.split(',');
                })
                setProvinces(data);
            })
            .catch(err => console.error(err))
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

    return (
        <main className={`${uid && 'menu-toggled menu-collapse'}`}>
            <h2>
                <BadgeCheckIcon className="icon-lg" />
                &nbsp;Vos BPF
            </h2>

            <div className="settings flex justify-around">

                <NavPills handler={handlePills} />

                <SearchBar action={setSearchFilter} />

                {/* Departement */}
                <div>
                    <label htmlFor="dpt-select" className="label">Département</label>
                    <input type="text" id="dpt-select" list="dpt-list" onChange={e => setDptFilter([e.target.value])} className="input" placeholder="Sélectionner..." />
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

            {tab ?
                <ListTable dpt={dptFilter} search={searchFilter} date={dateFilter} />
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
