import { UidContext } from "./AppContext";
import { useContext } from 'react';
import UserMenuCommands from './UserMenuCommands'

function Header() {
    const uid = useContext(UidContext);

    const handleMenuClick = (e) => {
        document.querySelector('.menu').classList.toggle('reduced');
        document.querySelector('main').classList.toggle('menu-collapse');
        document.querySelector('footer').classList.toggle('menu-collapse');
    }

    return (
        <header>
            {uid ?
                <div className="menu-toggle" onClick={handleMenuClick}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                : <div></div>
            }

            <a className="brand" href="#">
                <img src="/img/logos/light.svg" alt="Logo" />
                <h3>BpfMgr</h3>
            </a>

            <UserMenuCommands/>
        </header>
    )
}

export default Header;