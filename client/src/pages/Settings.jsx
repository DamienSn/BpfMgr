import { useContext, useEffect, useState } from "react"
import { UidContext } from "../components/AppContext"
import { CloudUploadIcon, EyeIcon, EyeOffIcon, LinkIcon } from '@heroicons/react/outline'
import { useSelector } from "react-redux";
import { userSelector } from "../redux/selectors/user.selectors";
import { ImageUploadProfile } from "../components/ImageUpload";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from '../redux/actions/user.actions'

import { useToast } from '../components/toaster/ToastProvider';
import { useLocation } from "react-router-dom";

export default function Settings() {
    const userData = useSelector(userSelector);
    const dispatch = useDispatch();
    const toast = useToast()

    // display banner and footer
    dispatch({ type: 'SET_BANNER', payload: true })
    dispatch({ type: 'SET_FOOTER', payload: true })

    // State
    const [bio, setBio] = useState(userData.user_bio);
    const [oldPassword, setOldPassword] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState(userData.user_name);

    const [pwdVisible, setPwdVisible] = useState(false);
    const [confirmPwdVisible, setConfirmPwdVisible] = useState(false);

    const [error, setError] = useState()

    // Token
    const search = window.location.search;
    const token = new URLSearchParams(search).get('access_token');

    // Fetch data for token
    useEffect(() => {
        if (!token) return;
        axios({
            url: `${import.meta.env.VITE_API_URL}users/update/licence`,
            method: "PUT",
            data: {
                user_id: userData.user_id,
                user_licence: token,
                user: userData
            },
            headers: {
                "x-api-key": import.meta.env.VITE_API_KEY
            }
        })
            .then(res => console.log(res))
    })

    const handleUploadSubmit = (e) => {
        e.preventDefault();
        const input = document.querySelector('input[is="drop-files"]');

        const formData = new FormData();
        formData.append("file", input.files[0]);
        formData.append("name", userData.user_email);
        formData.append("user_id", userData.user_id);

        axios.post(`${import.meta.env.VITE_API_URL}users/upload`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
                "x-api-key": import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                if (res.data.message == 'ok') {
                    dispatch(getUser(userData.user_id))
                    toast?.pushSuccess('Photo chang??e')
                } else {
                    toast?.pushError('Il y a eu une erreur')
                }
            })
    }

    useEffect(() => {
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas")
        } else {
            setError()
        }
    })

    const submitPwd = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) return;
        let res = await axios({
            method: "post",
            url: `${import.meta.env.VITE_API_URL}users/update_password`,
            withCredentials: true,
            data: {
                email: userData.user_email,
                password
            },
            headers: {
                "x-api-key": import.meta.env.VITE_API_KEY
            }
        })
        if (res.data.message === "ok") {
            toast?.pushSuccess("Mot de passe modifi??")
        } else {
            toast.pushError("Il y a eu une erreur")
        }
    }

    return (
        <main>
            <div className="params-page-title">
                <h2>Param??tres</h2>
            </div>
            {/* Licence */}
            <div className="params-block">
                <h3 className="params-block-title">Homologuation</h3>
                <p>Pour homologuer vos BPF, vous devez vous connecter avec votre compte FFVelo.</p>
                {userData.user_licence &&
                    <div className="alert">
                        Vous ??tes connect?? avec la FFVelo. Votre num??ro de licence est <bold>{userData.user_licence}</bold>
                    </div>}
                <a href={`https://sso.ffcyclo.org?redirect_uri=${import.meta.env.VITE_LICENCE_REDIRECT_URI}`} className="btn btn-blue inline-block mt-4">
                    <LinkIcon class="icon-sm" />&nbsp;
                    Se connecter avec FFVelo
                </a>
            </div>

            {/* S??curit?? */}
            <div className="params-block">
                <h3 className="params-block-title">S??curit??</h3>
                {/* Form */}
                <form className="content" onSubmit={submitPwd}>
                    <label className="label" htmlFor="password">Ancien mot de passe</label>
                    <input className="input" type="password" name="password" id="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} autoComplete="current-password" />

                    <label className="label mt-4" htmlFor="password">Nouveau mot de passe</label>
                    <div className="relative w-min">
                        {pwdVisible ?
                            <button type="button" onClick={() => setPwdVisible(false)}>
                                <EyeOffIcon className="icon-sm absolute left-0 top-1/2 ml-2 cursor-pointer" style={{ transform: 'translateY(-50%)' }} />
                            </button>
                            :
                            <button type="button" onClick={() => setPwdVisible(true)}>
                                <EyeIcon className="icon-sm absolute left-0 top-1/2 ml-2 cursor-pointer" style={{ transform: 'translateY(-50%)' }} />
                            </button>
                        }
                        <input className="input" style={{ 'paddingLeft': '2rem' }} type={pwdVisible ? 'text' : 'password'} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
                    </div>

                    <label className="label mt-4" htmlFor="password-confirm">Confirmer le mot de passe</label>
                    <div className="relative w-min">
                        {confirmPwdVisible ?
                            <button type="button" onClick={() => setConfirmPwdVisible(false)}>
                                <EyeOffIcon className="icon-sm absolute left-0 top-1/2 ml-2 cursor-pointer" style={{ transform: 'translateY(-50%)' }} />
                            </button>
                            :
                            <button type="button" onClick={() => setConfirmPwdVisible(true)}>
                                <EyeIcon className="icon-sm absolute left-0 top-1/2 ml-2 cursor-pointer" style={{ transform: 'translateY(-50%)' }} />
                            </button>
                        }
                        <input className="input" style={{ 'paddingLeft': '2rem' }} type={confirmPwdVisible ? 'text' : 'password'} name="password-confirm" id="password-confirm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" />
                    </div>

                    <p className="text-red-500 mt-2">{error}</p>

                    <button className="btn btn-blue mt-4" type="submit">Enregistrer</button>
                </form>
            </div>
            {/* Photo de profil */}
            <div className="params-block">
                <h3 className="params-block-title">Photo de profil</h3>
                <div className="content" id="picture-block">
                    {/* Profile picture */}
                    <div className="picture"></div>
                    <style>
                        {`.params-block .picture {
                            background-image: url(${userData.user_avatar ? `${import.meta.env.VITE_UPLOAD_DIR}profils/${userData.user_avatar}` : `https://avatars.dicebear.com/api/initials/${encodeURI(userData.user_name)}.svg`});
                        }`}
                    </style>
                    <form id="upload-photo" onSubmit={handleUploadSubmit}>
                        <ImageUploadProfile id="input-upload-photo" />
                        <button className="btn btn-blue mt-4" type="submit">
                            <CloudUploadIcon className="icon-sm" />&nbsp;
                            Envoyer
                        </button>
                    </form>
                </div>
            </div>
        </main >
    )
}