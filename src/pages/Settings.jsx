import { useContext, useState } from "react"
import { UidContext } from "../components/AppContext"
import { BookmarkIcon, CloudUploadIcon } from '@heroicons/react/outline'
import { useSelector } from "react-redux";
import { userSelector } from "../redux/selectors/user.selectors";
import { ImageUploadProfile } from "../components/ImageUpload";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from '../redux/actions/user.actions'

export default function Settings() {
    const uid = useContext(UidContext);
    const userData = useSelector(userSelector);
    const dispatch = useDispatch();
    // display banner
    dispatch({ type: 'SET_BANNER', payload: true })

    const [bio, setBio] = useState(userData.user_bio);
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [name, setName] = useState(userData.user_name);

    const handleUploadSubmit = (e) => {
        e.preventDefault();
        const input = document.querySelector('input[is="drop-files"]');

        const formData = new FormData();
        formData.append("file", input.files[0]);
        formData.append("name", userData.user_email);
        formData.append("user_id", userData.user_id);

        axios.post(`${import.meta.env.VITE_API_URL}users/upload`, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => dispatch(getUser(userData.user_id)))
    }

    return (
        <main className={`${uid && 'menu-toggled menu-collapse'}`}>
            <div className="params-page-title">
                <h2>Paramètres</h2>
                <button type="submit" className="btn btn-blue">
                    <BookmarkIcon className="icon-sm" />
                    &nbsp;Enregistrer
                </button>
            </div>
            <div className="params-block profile-params-block">
                {/* Profil */}
                <h3 className="params-block-title">Profil</h3>
                <div className="params-block-content">
                    {/* Form */}
                    <form className="info">
                        <label className="label" htmlFor="name">Nom</label>
                        <input className="input" type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" />
                        <label className="label mt-4" htmlFor="bio">A propos de vous</label>
                        <textarea className="input" name="bio" id="bio" cols="30" rows="3" value={bio} onChange={(e) => setBio(e.target.value)} autoComplete="off"></textarea>
                    </form>
                </div>
            </div>
            {/* Photo de profil */}
            <div className="params-block">
                <h3 className="params-block-title">Photo de profil</h3>
                <div className="content" id="picture-block">
                    {/* Profile picture */}
                    <div className="picture"></div>
                    <style>
                        {`.params-block .picture {
                            background-image: url(${userData.user_avatar ? userData.user_avatar : '/icons/person-outline.svg'});
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
            {/* Sécurité */}
            <div className="params-block">
                <h3 className="params-block-title">Sécurité</h3>
                {/* Form */}
                <form className="content">
                    <label className="label" htmlFor="password">Nouveau mot de passe</label>
                    <input className="input" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
                    <label className="label mt-4" htmlFor="password-confirm">Confirmer le mot de passe</label>
                    <input className="input" type="password" name="password-confirm" id="password-confirm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="off" />
                </form>
            </div>
        </main >
    )
}