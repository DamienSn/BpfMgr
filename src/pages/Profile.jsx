import { useContext, useState } from "react";
import { UidContext } from "../components/AppContext";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/selectors/user.selectors";
import { getBpfNumber } from "../utilities/bpfRequests";
import BpfStats from "../components/BpfStats";

import { Link } from "react-router-dom";

// Icons
import {PencilAltIcon} from '@heroicons/react/outline'

export default function Profile() {
    const uid = useContext(UidContext);
    const userData = useSelector(userSelector);

    const [bpfNumber, setBpfNumber] = useState();

    getBpfNumber(uid, setBpfNumber);

    return (
        <main className={`${uid && 'menu-toggled menu-collapse'}`}>
            <div className="profile-page-title">
                <h2>Profil</h2>
                <Link to="/settings" className="btn btn-outline-blue mr-4">
                    <PencilAltIcon className="icon-sm"/>
                    &nbsp;Editer
                </Link>
            </div>
            <div className="profile-header">
                <div className="picture"></div>
                <style>
                    {`.profile-header .picture {
                        background-image: url(${userData.user_avatar})
                    }`}
                </style>
                <div className="info">
                    <h4>{userData.user_name}</h4>
                    <p>{userData.user_bio}</p>
                </div>
            </div>
            <div className="stat-bar">
                <BpfStats />
            </div>
        </main>
    );
}