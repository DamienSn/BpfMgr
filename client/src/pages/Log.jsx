import { XIcon, ExternalLinkIcon, SupportIcon } from '@heroicons/react/outline'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import SignIn from "../components/login/SignIn.jsx";
import SignUp from "../components/login/SignUp.jsx";
import PasswordLost from "../components/login/PasswordLost.jsx";

import {useEffect, useState} from 'react';

function Log() {
    const dispatch = useDispatch();
    const tab = useSelector(state => state.logModal)

    const [title, setTitle] = useState("Connexion");

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

    useEffect(() => {
        if (tab === "in") {
            setTitle("Connexion")
        } else if (tab === "up") {
            setTitle("Inscription")
        } else {
            setTitle("Mot de passe oublié")
        }
    }, [tab])

    return (
        <section className="mt-4 mx-4 md:mx-12 lg:mx-24">
            <div className="flex flex-wrap justify-between items-center mb-4">
                <h2>{title}</h2>
                <div>
                    {
                        tab === "in" &&
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
            {tab === "up" && <SignUp />}
            {tab === "in" && <SignIn />}
            {tab === "pwd" && <PasswordLost />}
        </section>
    )
}

export default Log;