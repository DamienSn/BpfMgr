import { UidContext } from './AppContext';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {LoginIcon} from '@heroicons/react/outline'
import axios from 'axios';
import {useSelector} from 'react-redux';
import {userSelector} from '../redux/selectors/user.selectors';

export default function UserMenuCommands() {
    const uid = useContext(UidContext);

    const handleProfileBtnClick = (e) => {
        document.querySelector('.tooltip-profile').classList.toggle('active');
    }

    const userData = useSelector(userSelector);

    return (
        <div className="user-menu-commands">
            {uid ? (
                <>
                    <div className="profile-btn" onClick={handleProfileBtnClick}>
                    </div>
                    <div className="tooltip-profile">
                        <Link to="/profile" style={{ textDecoration: 'none' }} onClick={handleProfileBtnClick}>
                            <div className="tooltip-item">
                                <span>Profil</span>
                                <ion-icon src="/icons/person-outline.svg"></ion-icon>
                            </div>
                        </Link>
                        <Link to="/settings" style={{ textDecoration: 'none' }} onClick={handleProfileBtnClick}>
                            <div className="tooltip-item">
                                <span>Paramètres</span>
                                <ion-icon src="/icons/settings-outline.svg"></ion-icon>
                            </div>
                        </Link>
                        <div onClick={handleProfileBtnClick}>
                            <div className="tooltip-item" onClick={signOut}>
                                <span>Se déconnecter</span>
                                <ion-icon src="/icons/log-out-outline.svg"></ion-icon>
                            </div>
                        </div>
                    </div>
                    <style>
                        {`.profile-btn {
                            background-image: url(${userData.user_avatar ? userData.user_avatar : '/icons/person-outline.svg'});
                        }`}
                    </style>
                </>
            )
                :
                (
                    <button onClick={() => {document.querySelector('#log-popup').classList.add('active')}}>
                        <LoginIcon className="icon-md" />
                    </button>
                )
            }
        </div>
    )
}

function signOut () {
    axios({
        url: `${import.meta.env.VITE_API_URL}users/logout`,
        method: 'post',
        withCredentials: true
    })
    .then((res) => {
        window.location = '/';
    })
}