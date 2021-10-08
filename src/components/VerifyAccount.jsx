import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/selectors/user.selectors';
import { UidContext } from './AppContext'
import sendEmail from '../utilities/email';

function VerifyAccount() {
    const uid = useContext(UidContext);
    const [code, setCode] = useState();
    const [error, setError] = useState();
    const userData = useSelector(userSelector);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios({
            url: `${import.meta.env.VITE_API_URL}users/verify_email?userId=${uid}&code=${code}`,
            method: 'get',
            withCredentials: true
        })
            .then(res => {
                if (res.data.message === 'error' && res.data.error === 'wrong code') {
                    setError('Code incorrect !')
                } else {
                    window.location = "/";
                }
            })
            .catch(err => {
                setError('Il y a eu une erreur sur le serveur');
                console.log(err);
            })
    }

    const reSendEmail = () => {
        sendEmail(true, { to: userData.user_email, clientName: userData.user_name, verificationCode: userData.user_verification_code })
    }

    return (
        <main className={`${uid && 'menu-toggled menu-collapse'}`}>
            {userData.user_verified ?
                <>
                    <h2>Votre compte est déjà vérifié</h2>
                    <a href="/" className="btn">Retourner à l'accueil</a>
                </>
                :
                <>
                    <h2>Vérifier votre compte</h2>
                    <p>Pour utiliser BpfMgr, merci de vérifier votre compte. <br />Un email contenant votre code de vérification vous a été envoyé. <strong>Vérifiez vos spams !</strong><br /><strong onClick={reSendEmail} style={{ cursor: 'pointer' }}>Renvoyer le mail</strong></p>
                    <form onSubmit={handleSubmit} className="verify_account">
                        <label htmlFor="code">Code de vérification (envoyé par mail)</label>
                        <input type="text" id="code" onChange={e => setCode(e.target.value)} />
                        <button type="submit">Vérifier mon compte</button>
                        <p>{error}</p>
                    </form>
                </>
            }
        </main>
    )
}

export default VerifyAccount
