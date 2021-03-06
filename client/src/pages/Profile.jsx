import { useContext, useState } from "react";
import { UidContext } from "../components/AppContext";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/selectors/user.selectors";
import { getBpfNumber } from "../utilities/bpfRequests";
import {BpfStats, BcnStats} from "../components/BpfStats";

import { Link } from "react-router-dom";

// Icons
import { PencilAltIcon } from '@heroicons/react/outline'
import { useDispatch } from "react-redux";

export default function Profile() {
    const uid = useContext(UidContext);
    const userData = useSelector(userSelector);
    const dispatch = useDispatch();
    // display banner and footer
    dispatch({ type: 'SET_BANNER', payload: true })
    dispatch({ type: 'SET_FOOTER', payload: true })

    const [bpfNumber, setBpfNumber] = useState();

    getBpfNumber(uid, setBpfNumber);

    return (
        <main>
            <div className="profile-page-title">
                <h2>Profil</h2>
                <Link to="/settings" className="btn btn-outline-blue mr-4">
                    <PencilAltIcon className="icon-sm" />
                    &nbsp;Editer
                </Link>
            </div>
            <div className="profile-header">
                <div className="picture"></div>
                <style>
                    {`.profile-header .picture {
                        background-image: url(${userData.user_avatar ? `${import.meta.env.VITE_UPLOAD_DIR}profils/${userData.user_avatar}` : `https://avatars.dicebear.com/api/initials/${encodeURI(userData.user_name)}.svg`})
                    }`}
                </style>
                <div className="info">
                    <h4>{userData.user_name}</h4>
                    <p>{userData.user_bio}</p>
                </div>
            </div>
            <div className="stat-bar">
                <BpfStats />
                <BcnStats />
            </div>
        </main>
    );
}