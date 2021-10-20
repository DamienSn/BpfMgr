import React, { useContext, useEffect, useState } from 'react'
import { getAllBpfs, getAllBcns } from '../utilities/bpfRequests'
import { UidContext } from './AppContext';
import { TrashIcon } from '@heroicons/react/outline';
import axios from 'axios';
import {SuccessToast, ErrorToast} from '../components/Toasts.jsx'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getBpfs } from '../redux/actions/bpfs.actions';
import { getBcns } from '../redux/actions/bcns.actions';

export function ListTable(props) {
    const dispatch = useDispatch();
    const data = useSelector(state => state.bpfs)
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [reRender, setReRender] = useState(false);

    const uid = useContext(UidContext);

    useEffect(() => {
        dispatch(getBpfs(uid))
    }, [uid, reRender])

    // Handle BPF deleting from table
    const handleDelete = (e) => {
        const key = e.target.attributes[1].value;
        const row = document.querySelector(`[data-key="${key}"]`)
        const el = row.childNodes[0];
        const city = el.innerText;

        // Fetch API to delete BPF
        axios({
            url: `${import.meta.env.VITE_API_URL}bpf/delete`,
            method: 'delete',
            data: {
                userId: uid,
                city
            }
        })
            .then(res => {
                // Show toast
                if (res.data.message === 'ok') {
                    document.querySelector('#success-toast').classList.add('active');
                    document.querySelector('#error-toast').classList.remove('active');

                    setSuccessMessage(`BPF ${city} supprimé`)

                    // ReRender component to don't show deleted element
                    setReRender(!reRender);
                } else if (res.data.message === 'error') {
                    document.querySelector('#error-toast').classList.add('active');
                    document.querySelector('#success-toast').classList.remove('active');

                    setErrorMessage('Il y a eu une erreur')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <table className="w-full mt-6">

                <thead className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th>Ville</th>
                    <th>Date</th>
                    <th>Département</th>
                    <th>Province</th>
                    <th>Supprimer</th>
                </thead>

                <tbody>
                    {data.map((bpf, index) => {
                        if (
                            // eslint-disable-next-line eqeqeq
                            (props.dpt.includes(bpf.city_departement) || props.dpt.length == 0)
                            && (bpf.city_name.toLowerCase().includes(props.search.toLowerCase()))
                        ) {
                            return (
                                <tr key={index} data-key={index}>
                                    <td className="px-4 py-4 border border-blue-300">{bpf.city_name}</td>
                                    <td className="px-4 py-4 border border-blue-300">{new Date(bpf.bpf_date).toLocaleDateString()}</td>
                                    <td className="px-4 py-4 border border-blue-300">{`${bpf.dpt_name} (${bpf.city_departement})`}</td>
                                    <td className="px-4 py-4 border border-blue-300">{bpf.province_name}</td>
                                    <td className="px-4 py-4 border border-blue-300">
                                        <button type="button" onClick={handleDelete} data-btn-key={index} className="btn btn-outline-red">Supprimer&nbsp;<TrashIcon className="icon-sm text-red-500" /></button>
                                    </td>
                                </tr>
                            )
                        }
                    })}
                </tbody>

            </table>

            <SuccessToast id="success-toast" message={successMessage} />
            <ErrorToast id="error-toast" message={errorMessage} />
        </>
    )
}

export function ListTableBcn(props) {
    const dispatch = useDispatch();
    const data = useSelector(state => state.bcns)
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [reRender, setReRender] = useState(false);

    const uid = useContext(UidContext);

    useEffect(() => {
        dispatch(getBcns(uid))
    }, [uid, reRender])

    // Handle BPF deleting on table
    const handleDelete = (e) => {
        const key = e.target.attributes[1].value;
        const row = document.querySelector(`[data-key="${key}"]`)
        const el = row.childNodes[0];
        const city = el.innerText;

        // Fetch API to delete it
        axios({
            url: `${import.meta.env.VITE_API_URL}bpf/delete`,
            method: 'delete',
            data: {
                userId: uid,
                city
            }
        })
            .then(res => {
                // Show toast
                if (res.data.message === 'ok') {
                    document.querySelector('#success-toast').classList.add('active');
                    document.querySelector('#error-toast').classList.remove('active');

                    setSuccessMessage(`BPF ${city} supprimé`)

                    // ReRender component to don't show deleted element
                    setReRender(!reRender);
                } else if (res.data.message === 'error') {
                    document.querySelector('#error-toast').classList.add('active');
                    document.querySelector('#success-toast').classList.remove('active');

                    setErrorMessage('Il y a eu une erreur')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <table className="w-full mt-6">

                <thead className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th>Ville</th>
                    <th>Date</th>
                    <th>Département</th>
                    <th>Province</th>
                    <th>Supprimer</th>
                </thead>

                <tbody>
                    {data.map((bcn, index) => {
                        if (
                            // eslint-disable-next-line eqeqeq
                            (props.dpt.includes(bcn.city_departement) || props.dpt.length == 0)
                            && (bcn.city_name.toLowerCase().includes(props.search.toLowerCase()))
                        ) {
                            return (
                                <tr key={index} data-key={index}>
                                    <td className="px-4 py-4 border border-blue-300">{bcn.city_name}</td>
                                    <td className="px-4 py-4 border border-blue-300">{new Date(bcn.bpf_date).toLocaleDateString()}</td>
                                    <td className="px-4 py-4 border border-blue-300">{`${bcn.dpt_name} (${bcn.city_departement})`}</td>
                                    <td className="px-4 py-4 border border-blue-300">{bcn.province_name}</td>
                                    <td className="px-4 py-4 border border-blue-300">
                                        <button type="button" onClick={handleDelete} data-btn-key={index} className="btn btn-outline-red">Supprimer&nbsp;<TrashIcon className="icon-sm text-red-500" /></button>
                                    </td>
                                </tr>
                            )
                        }
                    })}
                </tbody>

            </table>

            <SuccessToast id="success-toast" message={successMessage} />
            <ErrorToast id="error-toast" message={errorMessage} />
        </>
    )
}
