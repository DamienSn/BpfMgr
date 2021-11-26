import React from 'react'
import { useContext } from 'react'
import { UidContext } from '../../components/AppContext'

import { UserIcon, ChevronDoubleLeftIcon, AtSymbolIcon, FingerPrintIcon, LockOpenIcon, BadgeCheckIcon, TrashIcon, PaperAirplaneIcon } from '@heroicons/react/outline'
import { useParams } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useToast } from '../../components/toaster/ToastProvider';

function User() {
    const uid = useContext(UidContext);
    const { id } = useParams()
    const [userData, setUserData] = useState({});

    const dispatch = useDispatch()

    const toast = useToast();

    useEffect(() => {
        axios({
            url: `${import.meta.env.VITE_API_URL}users/${id}`,
            withCredentials: true,
            headers: {
                'x-api-key': import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                if (res.data.message == "ok") {
                    setUserData(res.data.data)
                } else {
                    setUserData("Erreur")
                }
            })
            .catch(err => setUserData("Erreur"))
    }, [id]);

    const handleDelete = () => {
        if (confirm("Êtes vous sur de vouloir supprimer cet utilisateur ?")) {
            dispatch({type: 'SET_LOADER', payload: true})

            axios({
                method: 'delete',
                url: `${import.meta.env.VITE_API_URL}users/delete/${id}`,
                withCredentials: true,
                headers: {
                    'x-api-key': import.meta.env.VITE_API_KEY
                }
            })
            .then(res => {
                dispatch({type: 'SET_LOADER', payload: false})
                if (res.data.includes("deleted")) {
                    toast?.pushSuccess("Utilisateur supprimé")
                } else {
                    toast?.pushError("Il y a eu une erreur")
                }
            })
            .catch(err => {
                dispatch({type: 'SET_LOADER', payload: false})
                toast?.pushError("Il y a eu une erreur")
            })
        }
    }

    return (
        <main className={`${uid && 'menu-toggled menu-collapse'}`}>
            <div className="my-6 flex items-center justify-between">
                <h2><UserIcon className="icon-md" />&nbsp;Gestion de l'utilisateur</h2>
                <a href="#/users" className="btn btn-outline-blue mr-8">Retour&nbsp;<ChevronDoubleLeftIcon className="icon-sm" /></a>
            </div>
            {/* User */}
            <h3>{userData.user_name}</h3>
            <p><FingerPrintIcon className="icon-sm" />&nbsp;ID : {userData.user_id}</p>
            <p><AtSymbolIcon className="icon-sm" />&nbsp;{userData.user_email}</p>
            <p><BadgeCheckIcon className="icon-sm" />&nbsp;{userData.user_verified ? "Vérifié" : "Non vérifié"}</p>
            <p><LockOpenIcon className="icon-sm" />&nbsp;Code de vérification : {userData.user_verification_code}</p>

            {/* Actions */}
            <div className="flex flex-wrap items-stretch space-x-6 mt-4">
                <button className="btn btn-red" onClick={handleDelete}><TrashIcon className="icon-sm" />&nbsp;Supprimer</button>
                <a href={`mailto:${userData.user_email}`} className="btn btn-blue"><PaperAirplaneIcon className="icon-sm" />&nbsp;Écrire</a>
            </div>
        </main>
    )
}

export default User
