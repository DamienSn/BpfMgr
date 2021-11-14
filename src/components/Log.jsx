import { XIcon, ExternalLinkIcon, SupportIcon } from '@heroicons/react/outline'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import SignIn from "./login/SignIn.jsx";
import SignUp from "./login/SignUp.jsx";
import PasswordLost from "./login/PasswordLost.jsx";

function Log() {
    const dispatch = useDispatch();
    const tab = useSelector(state => state.logModal)

    const handleClick = () => {
        if (tab === "in") {
            dispatch({ type: 'SET_LOG_MODAL', payload: 'up' })
        } else {
            dispatch({ type: 'SET_LOG_MODAL', payload: 'in' })
        }
    }

    const handleLostButtonClick = () => {
        dispatch({ type: 'SET_LOG_MODAL', payload: 'pwd' })
    }

    return (
        // Modal
        <div className={`flex flex-col w-28/100 bg-gray-200 p-5 rounded-3xl ${tab && 'active'}`} style={{ zIndex: 999 }} id="log-popup">
            {/* Modal head */}
            <div className="flex justify-end">
                <button onClick={() => dispatch({ type: 'SET_LOG_MODAL', payload: false })}>
                    <XIcon className="icon-sm"></XIcon>
                </button>
            </div>
            <div>
                {tab === "up" && <SignUp />}
                {tab === "in" && <SignIn />}
                {tab === "pwd" && <PasswordLost />}
                <div className="flex flex-wrap">
                    {
                        tab !== "pwd" &&
                        <button className="btn btn-outline-red mr-4" onClick={handleLostButtonClick}>
                            <SupportIcon className="icon-sm" />&nbsp;
                            Mot de passe oublié ?
                        </button>
                    }
                    <button onClick={handleClick} className='btn btn-outline-blue'>
                        <ExternalLinkIcon className="icon-sm" />&nbsp;
                        {tab === "in" ? 'S\'inscrire' : 'Se connecter'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Log;