import { useState} from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";

export default function SignIn() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                password
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
        <>
            <h2>Se connecter</h2>
            <form onSubmit={handleLogin}>
                <label className="label" htmlFor="email">Email</label>
                <input className="input" type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} autoComplete="email" />

                <label className="label mt-4" htmlFor="password">Mot de passe</label>
                <input className="input" type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />

                <p className="text-red-500 mt-2">{error}</p>

                <button type="submit" className="btn btn-blue my-4">Se connecter</button>
            </form>
        </>
    )
}