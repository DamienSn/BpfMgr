import { UidContext } from './AppContext';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CogIcon, LogoutIcon, UserCircleIcon } from '@heroicons/react/outline'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/selectors/user.selectors';
import { useDispatch } from 'react-redux';

export default function UserMenuCommands() {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    const userData = useSelector(userSelector);

    // Show tooltip on click
    const handleProfileBtnClick = (e) => {
        document.querySelector('.tooltip-profile').classList.toggle('active');
    }

    const signOut = () => {
        dispatch({type: 'SET_LOADER', payload: true});
        axios({
            url: `${import.meta.env.VITE_API_URL}users/logout`,
            method: 'post',
            withCredentials: true,
            headers: {
                "x-api-key": import.meta.env.VITE_API_KEY
            }
        })
            .then((res) => {
                dispatch({type: 'SET_LOADER', payload: false});
                window.location = '/';
            })
    }

    return (
        <div className="user-menu-commands">
            {uid ? (
                <>
                    <div className="flex items-center" onClick={handleProfileBtnClick}>
                        <CogIcon className="icon-sm cursor-pointer" />&nbsp;
                        <div className="profile-btn"></div>
                    </div>
                    <div className="tooltip-profile">
                        <Link to="/profile" style={{ textDecoration: 'none' }} onClick={handleProfileBtnClick}>
                            <div className="tooltip-item">
                                <span>Profil</span>
                                <UserCircleIcon className="icon-sm" />
                            </div>
                        </Link>
                        <Link to="/settings" style={{ textDecoration: 'none' }} onClick={handleProfileBtnClick}>
                            <div className="tooltip-item">
                                <span>Paramètres</span>
                                <CogIcon className="icon-sm" />
                            </div>
                        </Link>
                        <div onClick={handleProfileBtnClick}>
                            <div className="tooltip-item" onClick={signOut}>
                                <span>Se déconnecter</span>
                                <LogoutIcon className="icon-sm" />
                            </div>
                        </div>
                    </div>
                    <style>
                        {`.profile-btn {
                            background-image: url(${userData.user_avatar ? `${import.meta.env.VITE_UPLOAD_DIR}profils/${userData.user_avatar}` : `https://avatars.dicebear.com/api/initials/${encodeURI(userData.user_name)}.svg`});
                        }`}
                    </style>
                </>
            )
                :
                (
                    <div class="flex">
                        <a  href="#/connect"
                            onClick={() => dispatch({ type: 'SET_LOG_MODAL', payload: 'in' })}
                            className="border border-white py-2 px-4 mr-1 rounded bg-gray-100 text-black focus:outline-none focus:ring-4">
                            Connexion
                        </a>
                        <a  href="#/connect"
                            onClick={() => dispatch({ type: 'SET_LOG_MODAL', payload: 'up' })}
                            className="hidden md:block py-2 px-4 rounded border border-white hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-4">
                            Inscription
                        </a>
                    </div>
                )
            }
        </div>
    )
}