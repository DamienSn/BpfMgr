import React, { useContext, useEffect, useState } from 'react'
import { UidContext } from './AppContext';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getBpfs } from '../redux/actions/bpfs.actions';
import { getBcns } from '../redux/actions/bcns.actions';

export function ListTable(props) {
    const dispatch = useDispatch();
    const data = useSelector(state => state.bpfs)
    const [reRender, setReRender] = useState(false);

    const uid = useContext(UidContext);

    useEffect(() => {
        dispatch(getBpfs(uid))
    }, [uid, reRender])

    const dateSort = (a, b) => {
        if (props.date === "asc") {
            return new Date(a.bpf_date) - new Date(b.bpf_date)
        } else {
            return new Date(b.bpf_date) - new Date(a.bpf_date)
        }
    };

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
                    {props.dpt.length == 0 ?
                        data
                            .filter(bpf => bpf.city_name.toLowerCase().includes(props.search.toLowerCase()))
                            .sort((a,b) => dateSort(a, b))
                            .map((bpf, index) => {
                                return (
                                    <tr key={index} data-key={index}>
                                        <td className="px-4 py-4 border border-blue-300">{bpf.city_name}</td>
                                        <td className="px-4 py-4 border border-blue-300">{new Date(bpf.bpf_date).toLocaleDateString()}</td>
                                        <td className="px-4 py-4 border border-blue-300">{`${bpf.dpt_name} (${bpf.city_departement})`}</td>
                                        <td className="px-4 py-4 border border-blue-300">{bpf.province_name}</td>
                                    </tr>
                                )
                            })
                        :
                        data
                            .filter(bpf => props.dpt.includes(bpf.city_departement) && bpf.city_name.toLowerCase().includes(props.search.toLowerCase()))
                            .sort((a,b) => dateSort(a, b))
                            .map((bpf, index) => {
                                return (
                                    <tr key={index} data-key={index}>
                                        <td className="px-4 py-4 border border-blue-300">{bpf.city_name}</td>
                                        <td className="px-4 py-4 border border-blue-300">{new Date(bpf.bpf_date).toLocaleDateString()}</td>
                                        <td className="px-4 py-4 border border-blue-300">{`${bpf.dpt_name} (${bpf.city_departement})`}</td>
                                        <td className="px-4 py-4 border border-blue-300">{bpf.province_name}</td>
                                    </tr>
                                )
                            })
                    }
                </tbody>

            </table>
        </>
    )
}

export function ListTableBcn(props) {
    const dispatch = useDispatch();
    const data = useSelector(state => state.bcns)
    const [reRender, setReRender] = useState(false);

    const uid = useContext(UidContext);

    useEffect(() => {
        dispatch(getBcns(uid))
    }, [uid, reRender])

    const dateSort = (a, b) => {
        if (props.date === "asc") {
            return new Date(a.bpf_date) - new Date(b.bpf_date)
        } else {
            return new Date(b.bpf_date) - new Date(a.bpf_date)
        }
    };

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
                    {props.dpt.length == 0 ?
                        data
                            .filter(bcn => bcn.city_name.toLowerCase().includes(props.search.toLowerCase()))
                            .sort((a,b) => dateSort(a, b))
                            .map((bcn, index) => {
                                return (
                                    <tr key={index} data-key={index}>
                                        <td className="px-4 py-4 border border-blue-300">{bcn.city_name}</td>
                                        <td className="px-4 py-4 border border-blue-300">{new Date(bcn.bpf_date).toLocaleDateString()}</td>
                                        <td className="px-4 py-4 border border-blue-300">{`${bcn.dpt_name} (${bcn.city_departement})`}</td>
                                        <td className="px-4 py-4 border border-blue-300">{bcn.province_name}</td>
                                    </tr>
                                )
                            })
                        :
                        data
                            .filter(bcn => props.dpt.includes(bcn.city_departement) && bcn.city_name.toLowerCase().includes(props.search.toLowerCase()))
                            .sort((a,b) => dateSort(a, b))
                            .map((bcn, index) => {
                                return (
                                    <tr key={index} data-key={index}>
                                        <td className="px-4 py-4 border border-blue-300">{bcn.city_name}</td>
                                        <td className="px-4 py-4 border border-blue-300">{new Date(bcn.bpf_date).toLocaleDateString()}</td>
                                        <td className="px-4 py-4 border border-blue-300">{`${bcn.dpt_name} (${bcn.city_departement})`}</td>
                                        <td className="px-4 py-4 border border-blue-300">{bcn.province_name}</td>
                                    </tr>
                                )
                            })
                    }
                </tbody>

            </table>
        </>
    )
}
