import { useContext, useEffect, useState } from "react"
import { UidContext } from "../components/AppContext"
import { CloudUploadIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import { useSelector } from "react-redux";
import { userSelector } from "../redux/selectors/user.selectors";
import { ImageUploadProfile } from "../components/ImageUpload";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from '../redux/actions/user.actions'

import { useToast } from '../components/toaster/ToastProvider';

export default function Settings() {
    const uid = useContext(UidContext);
    const userData = useSelector(userSelector);
    const dispatch = useDispatch();
    const toast = useToast()

    // display banner and footer
    dispatch({ type: 'SET_BANNER', payload: true })
    dispatch({ type: 'SET_FOOTER', payload: true })

    const [bio, setBio] = useState(userData.user_bio);
    const [oldPassword, setOldPassword] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState(userData.user_name);

    const [pwdVisible, setPwdVisible] = useState(false);
    const [confirmPwdVisible, setConfirmPwdVisible] = useState(false);

    const [error, setError] = useState()

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
            .then(res => dispatch(getUser(userData.user_id)))
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
            toast?.pushSuccess("Mot de passe modifié")
        } else {
            toast.pushError("Il y a eu une erreur")
        }
    }

    return (
        <main className={`${uid && 'menu-toggled menu-collapse'}`}>
            <div className="params-page-title">
                <h2>Paramètres</h2>
            </div>
            {/* Sécurité */}
            <div className="params-block">
                <h3 className="params-block-title">Sécurité</h3>
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
                        <input className="input" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
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
                        <input className="input" type="password" name="password-confirm" id="password-confirm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" />
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
                            background-image: url(${userData.user_avatar});
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