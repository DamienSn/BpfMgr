import { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'

export default function SignIn() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pwdVisible, setPwdVisible] = useState(false);

    const [error, setError] = useState();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email.match(/.+@.+\..+/)) {
            setError("Email invalide")
            return;
        }

        dispatch({ type: 'SET_LOADER', payload: true });

        axios({
            method: "post",
            url: `${import.meta.env.VITE_API_URL}users/login`,
            withCredentials: true,
            data: {
                email,
                password,
                type: "login"
            },
            headers: {
                "x-api-key": import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                dispatch({ type: 'SET_LOADER', payload: false });

                if (res.data.error) {
                    switch (res.data.error) {
                        case 'incorrect password':
                            setError("Oups ! Mot de passe incorrect...")
                            break
                        case 'incorrect email':
                            setError("Oups ! Cet email n'existe pas...")
                            break
                        default:
                            setError("Il y a eu une erreur")
                    }
                } else {
                    window.location = "/";
                }
            });
    }

    return (
        <form onSubmit={handleLogin}>
            <label className="label" htmlFor="email">Email</label>
            <input className="input" type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} autoComplete="email" />

            <label className="label mt-4" htmlFor="password">Mot de passe</label>
            <div className="relative w-min">
                {pwdVisible ?
                    <button type="button" onClick={() => setPwdVisible(false)} tabIndex={-1}>
                        <EyeOffIcon className="icon-sm absolute left-0 top-1/2 ml-2 cursor-pointer" style={{ transform: 'translateY(-50%)' }}/>
                    </button>
                    :
                    <button type="button" onClick={() => setPwdVisible(true)} tabIndex={-1}>
                        <EyeIcon className="icon-sm absolute left-0 top-1/2 ml-2 cursor-pointer" style={{ transform: 'translateY(-50%)' }} />
                    </button>
                }
                <input className="input" style={{ 'paddingLeft': '2rem' }} type={pwdVisible ? 'text' : 'password'} name="password" id="password" onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            </div>

            <p className="text-red-500 mt-2">{error}</p>

            <button type="submit" className="btn btn-blue my-4" >Se connecter</button>
        </form>
    )
}