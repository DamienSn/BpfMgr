import { useState } from "react";
import { useDispatch } from 'react-redux'
import axios from 'axios';
import sendEmail from '../../utilities/email.js';
import { useToast } from '../toaster/ToastProvider';
import { ShieldCheckIcon } from '@heroicons/react/outline'

export default function PasswordLost() {
    const [email, setEmail] = useState();
    const [error, setError] = useState();
    const [status, setStatus] = useState(false); // false: normal, true: sent
    const dispatch = useDispatch();
    const toast = useToast()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'SET_LOADER', payload: true });

        axios({
            url: `${import.meta.env.VITE_API_URL}users/reset_password?email=${email}`,
            method: 'get',
            withCredentials: true,
            headers: {
                "x-api-key": import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                dispatch({ type: 'SET_LOADER', payload: true });

                if (res.data.message === 'error') {
                    dispatch({ type: 'SET_LOADER', payload: false });
                    setError(err);
                    toast?.pushError("Il y a eu une erreur")
                } else {
                    sendEmail(false, {
                        userName: email,
                        to: email,
                        password: res.data.data
                    })
                        .then(response => {
                            dispatch({ type: 'SET_LOADER', payload: false });
                            setStatus(true);
                        })
                        .catch(err => {
                            dispatch({ type: 'SET_LOADER', payload: false });
                            setError(err);
                            toast?.pushError("Il y a eu une erreur")
                        })
                }
            })
            .catch(err => {
                dispatch({ type: 'SET_LOADER', payload: false });
                setError(err);
                toast?.pushError("Il y a eu une erreur")
            });
    }

    return (
        <div>
            {status ?
                <>
                    <h2><ShieldCheckIcon class="icon-md" />&nbsp;Terminé !</h2>
                    <p>Votre nouveau mot de passe vous a été envoyé ! (pensez à vérifier vos spams en cas de problème)</p>
                </>
                :
                <>
                    <p><strong>Pas d'inquiétude</strong>, nous sommes là pour vous aider !<br />Nous allons vous envoyer un email contenant un nouveau mot de passe.</p>

                    <form action="" className="mt-4" id="log-in-form" onSubmit={handleSubmit}>
                        <label className="label" htmlFor="email">Votre email</label>
                        <input className="input" type="email" id="email" onChange={e => setEmail(e.target.value)} />
                        <button className="btn btn-blue block my-4" type="submit">Réinitialiser mon mot de passe</button>
                        <p>{error}</p>
                    </form>
                </>}

        </div>
    )
}