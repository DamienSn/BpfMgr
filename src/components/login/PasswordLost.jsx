import { useState } from "react";
import axios from 'axios';
import sendEmail from '../../utilities/email.js';

export default function PasswordLost() {
    const [email, setEmail] = useState();
    const [error, setError] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

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
                    setError(res.data.error);
                } else {
                    sendEmail(false, {
                        userName: email,
                        to: email,
                        password: res.data.data
                    })
                        .then(response => {
                            axios({
                                method: "post",
                                url: `${import.meta.env.VITE_API_URL}users/login`,
                                withCredentials: true,
                                data: {
                                    email,
                                    password: res.data.data
                                },
                                headers: {
                                    "x-api-key": import.meta.env.VITE_API_KEY
                                }
                            })
                                .then(res => {
                                    dispatch({ type: 'SET_LOADER', payload: false });
                                    window.location = '/'
                                })
                        })
                        .catch(err => setError(err));
                }
            })
    }

    return (
        <div>
            <p><strong>Pas d'inquiétude</strong>, nous sommes là pour vous aider !<br />Nous allons vous envoyer un email contenant un nouveau mot de passe.</p>

            <form action="" className="mt-4" id="log-in-form" onSubmit={handleSubmit}>
                <label className="label" htmlFor="email">Votre email</label>
                <input className="input" type="email" id="email" onChange={e => setEmail(e.target.value)} />
                <button className="btn btn-blue block my-4" type="submit">Réinitialiser mon mot de passe</button>
                <p>{error}</p>
            </form>
        </div>
    )
}