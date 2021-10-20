import React, { useState, useEffect } from "react";
import axios from 'axios';
import { XIcon, ExternalLinkIcon, SupportIcon } from '@heroicons/react/outline'
import sendEmail from '../utilities/email.js';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function Log() {
    const dispatch = useDispatch();
    const tab = useSelector(state => state.logModal)

    const handleClick = () => {
        if (tab === "in") {
            dispatch({ type: 'SET_LOG_MODAL', payload: 'up' })
        } else {
            dispatch({ type: 'SET_LOG_MODAL', payload: 'in' })
        }
    }

    const handleLostButtonClick = () => {
        dispatch({ type: 'SET_LOG_MODAL', payload: 'pwd' })
    }

    return (
        // Modal
        <div className={`flex flex-col w-28/100 bg-gray-200 p-5 rounded-3xl ${tab && 'active'}`} style={{ zIndex: 999 }} id="log-popup">
            {/* Modal head */}
            <div className="flex justify-end">
                <button onClick={() => dispatch({ type: 'SET_LOG_MODAL', payload: false })}>
                    <XIcon className="icon-sm"></XIcon>
                </button>
            </div>
            <div>
                {tab === "up" && <SignUp />}
                {tab === "in" && <SignIn />}
                {tab === "pwd" && <PasswordLost />}
                <div className="flex flex-wrap">
                    {
                        tab !== "pwd" &&
                        <button className="btn btn-outline-red mr-4" onClick={handleLostButtonClick}>
                            <SupportIcon className="icon-sm" />&nbsp;
                            Mot de passe oublié ?
                        </button>
                    }
                    <button onClick={handleClick} className='btn btn-outline-blue'>
                        <ExternalLinkIcon className="icon-sm" />&nbsp;
                        {tab === "in" ? 'S\'inscrire' : 'Se connecter'}
                    </button>
                </div>
            </div>
        </div>
    )
}

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        const emailErrors = document.querySelector("#email-error")
        const passwordErrors = document.querySelector("#password-error")

        axios({
            method: "post",
            url: `${import.meta.env.VITE_API_URL}users/login`,
            withCredentials: true,
            data: {
                email,
                password
            }
        })
            .then(res => {
                if (res.data.error) {
                    switch (res.data.error.message) {
                        case 'incorrect password':
                            passwordErrors.textContent = "Oups ! Mot de passe incorrect...";
                        // case 'incorrect email':
                        //     emailErrors.textContent = "Oups ! Cet email n'existe pas...";
                        default:
                        // passwordErrors.textContent = "Il y a eu une erreur";
                    }
                } else {
                    window.location = "/";
                }
            });
    }

    return (
        <>
            <h2>Se connecter</h2>
            <form onSubmit={handleLogin}>
                <label className="label" htmlFor="email">Email</label>
                <input className="input" type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                <p id="email-error"></p>

                <label className="label mt-4" htmlFor="password">Mot de passe</label>
                <input className="input" type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
                <p id="password-error text-red"></p>

                <button type="submit" className="btn btn-blue my-4">Se connecter</button>
            </form>
        </>
    )
}

function SignUp() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            document.querySelector('#pwd-not-corresponding').style.display = 'block';
            return;
        }

        axios({
            url: `${import.meta.env.VITE_API_URL}users/create`,
            method: 'post',
            data: {
                email: email,
                password: password,
                name: name,
                permissions: "std"
            },
            withCredentials: true
        })
            .then(res => {
                if (res.data.message.includes('created')) {
                    sendEmail(true, {
                        to: email,
                        verificationCode: res.data.data.user_verification_code,
                        clientName: name
                    })
                        .then(res => {
                            axios({
                                method: "post",
                                url: `${import.meta.env.VITE_API_URL}users/login`,
                                withCredentials: true,
                                data: {
                                    email,
                                    password
                                }
                            })
                                .then(res => window.location = '/')
                        })
                        .catch(err => console.log(err))
                }
            })
    }

    useEffect(() => {
        const error = document.querySelector('#pwd-not-corresponding');
        confirmPassword !== password ?
            error.style.display = 'block'
            : error.style.display = 'none'
    }, [confirmPassword, password])

    return (
        <>
            <h2>Inscription</h2>
            <form id="log-in-form" action="" onSubmit={handleSubmit}>
                <label className="label" htmlFor="email">Votre email</label>
                <input className="input" type="email" id="email" onChange={e => setEmail(e.target.value)} />

                <label className="label mt-4" htmlFor="name">Comment doit-on vous appeler ?</label>
                <input className="input" type="text" id="name" onChange={e => setName(e.target.value)} />

                <label className="label mt-4" htmlFor="password">Votre mot de passe</label>
                <input className="input" type="password" id="password" onChange={e => setPassword(e.target.value)} />

                <label className="label mt-4" htmlFor="confirm_password">Confirmer le mot de passe</label>
                <input className="input" type="password" id="confirm_password" onChange={e => setConfirmPassword(e.target.value)} />

                <p className="text-red-600" id="pwd-not-corresponding">Les mots de passe ne correspondent pas</p>

                <button type="submit" className="btn btn-blue block my-4" onClick={handleSubmit}>S'inscrire</button>
            </form>
        </>
    )
}

function PasswordLost() {
    const [email, setEmail] = useState();
    const [error, setError] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            url: `${import.meta.env.VITE_API_URL}users/reset_password?email=${email}`,
            method: 'get',
            withCredentials: true
        })
            .then(res => {
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
                                }
                            })
                                .then(res => window.location = '/')
                        })
                        .catch(err => setError(err));
                }
            })
    }

    return (
        <div className="">
            <div>
                <h2>Mot de passe oublié</h2>
                <p><strong>Pas d'inquiétude</strong>, nous sommes là pour vous aider !<br />Nous allons vous envoyer un email contenant un nouveau mot de passe.</p>
            </div>
            <form action="" className="mt-4" id="log-in-form" onSubmit={handleSubmit}>
                <label className="label" htmlFor="email">Votre email</label>
                <input className="input" type="email" id="email" onChange={e => setEmail(e.target.value)} />
                <button className="btn btn-blue block my-4" type="submit">Réinitialiser mon mot de passe</button>
                <p>{error}</p>
            </form>
        </div>
    )
}


export default Log;