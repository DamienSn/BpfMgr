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
        <header class="p-2 md:p-5">
            {uid ?
                <div className="menu-toggle" onClick={handleMenuClick}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                : <div class="hidden md:block"></div>
            }

            <a className="brand" href="#">
                <img src="/img/logos/light.svg" alt="Logo" class="margin-0 md:m-2"/>
                <h3 class="text-2xl md:text-3xl lg:text-4xl">BpfMgr</h3>
            </a>

            <UserMenuCommands/>
        </header>
    )
}

export default Header;