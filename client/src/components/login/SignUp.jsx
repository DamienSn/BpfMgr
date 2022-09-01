import { useState, useEffect } from "react";
import axios from 'axios';
import sendEmail from '../../utilities/email.js';
import { useDispatch } from "react-redux";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

export default function SignUp() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [sendNews, setSendNews] = useState(false);

    const [pwdVisible, setPwdVisible] = useState(false);
    const [confirmPwdVisible, setConfirmPwdVisible] = useState(false);

    const [error, setError] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            document.querySelector('#pwd-not-corresponding').style.display = 'block';
            return;
        }
        // Show loader
        dispatch({ type: 'SET_LOADER', payload: true });
        // Make request
        axios({
            url: `${import.meta.env.VITE_API_URL}users/create`,
            method: 'post',
            data: {
                email: email,
                password: password,
                name: name,
                permissions: "std",
                sendNews
            },
            withCredentials: true,
            headers: {
                "x-api-key": import.meta.env.VITE_API_KEY
            }
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
                                },
                                headers: {
                                    "x-api-key": import.meta.env.VITE_API_KEY
                                }
                            })
                                .then(res => {
                                    // Don't show loader
                                    dispatch({ type: 'SET_LOADER', payload: false });
                                    window.location = '/'
                                })
                        })
                        .catch(err => {
                            // Don't show loader
                            dispatch({ type: 'SET_LOADER', payload: false });
                            setError("Votre compte à été créé, veuillez vous connecter")
                        })
                } else {
                    // Don't show loader
                    dispatch({ type: 'SET_LOADER', payload: false });
                    if (res.data.message == "error") {
                        if (res.data.error == "ER_DUP_ENTRY") {
                            setError("Quelqu'un est déjà inscrit avec cet email")
                        } else {
                            setError('Il y a eu une erreur')
                        }
                    }
                }
            })
            .catch(err => {
                setError('Il y a eu une erreur')
            })
    }

    useEffect(() => {
        confirmPassword !== password ? setError("Les mots de passe ne correspondent pas") : setError(false)
    }, [confirmPassword, password])

    return (
        <form id="log-in-form" action="" onSubmit={handleSubmit}>
            <label className="label" htmlFor="email">Votre email</label>
            <input className="input" type="email" id="email" onChange={e => setEmail(e.target.value)} />

            <label className="label mt-4" htmlFor="name">Comment doit-on vous appeler ?</label>
            <input className="input" type="text" id="name" onChange={e => setName(e.target.value)} />

            <label className="label mt-4" htmlFor="password">Votre mot de passe</label>
            <div className="relative w-min">
                {pwdVisible ?
                    <button type="button" onClick={() => setPwdVisible(false)} tabIndex={-1}>
                        <EyeOffIcon className="icon-sm absolute left-0 top-1/2 ml-2 cursor-pointer" style={{ transform: 'translateY(-50%)' }} />
                    </button>
                    :
                    <button type="button" onClick={() => setPwdVisible(true)} tabIndex={-1}>
                        <EyeIcon className="icon-sm absolute left-0 top-1/2 ml-2 cursor-pointer" style={{ transform: 'translateY(-50%)' }} />
                    </button>
                }
                <input className="input" style={{ 'paddingLeft': '2rem' }} type={pwdVisible ? 'text' : 'password'} id="password" onChange={e => setPassword(e.target.value)} autoComplete="new-password" />
            </div>

            <label className="label mt-4" htmlFor="confirm_password">Confirmer le mot de passe</label>
            <div className="relative w-min">
                {confirmPwdVisible ?
                    <button type="button" onClick={() => setConfirmPwdVisible(false)} tabIndex={-1}>
                        <EyeOffIcon className="icon-sm absolute left-0 top-1/2 ml-2 cursor-pointer" style={{ transform: 'translateY(-50%)' }} />
                    </button>
                    :
                    <button type="button" onClick={() => setConfirmPwdVisible(true)} tabIndex={-1}>
                        <EyeIcon className="icon-sm absolute left-0 top-1/2 ml-2 cursor-pointer" style={{ transform: 'translateY(-50%)' }} />
                    </button>
                }
                <input className="input" style={{ 'paddingLeft': '2rem' }} type={confirmPwdVisible ? 'text' : 'password'} id="confirm_password" onChange={e => setConfirmPassword(e.target.value)} autoComplete="new-password" />
            </div>

            <div className="block mt-4">
                <input type="checkbox" id="send-news" checked={sendNews} onChange={e => setSendNews(!sendNews)} />
                <label htmlFor="send-news" className="ml-2">Recevoir une fois par mois la newsletter BpfMgr</label>
            </div>

            {error && <p className="text-red-600 my-2" id="error">{error}</p>}

            <button type="submit" className="btn btn-blue block my-4" onClick={handleSubmit}>S'inscrire</button>

        </form>
    )
}