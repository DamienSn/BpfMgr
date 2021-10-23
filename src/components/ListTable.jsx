import React, { useContext, useEffect, useState } from 'react'
import { UidContext } from './AppContext';
import { SuccessToast, ErrorToast } from '../components/Toasts.jsx'
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

    return (
        <>
            <table className="w-full mt-6">

                <thead className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th>Ville</th>
                    <th>Date</th>
                    <th>Département</th>
                    <th>Province</th>
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

    return (
        <>
            <table className="w-full mt-6">

                <thead className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th>Ville</th>
                    <th>Date</th>
                    <th>Département</th>
                    <th>Province</th>
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
