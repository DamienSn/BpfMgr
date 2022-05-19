import { UidContext } from "./AppContext";
import { useContext } from 'react';
import UserMenuCommands from './UserMenuCommands'

function Header() {
    const uid = useContext(UidContext);

    return (
        <header class="pr-2 md:pr-5">
            <a className="brand" href="#">
                <img src="/img/logos/light.svg" alt="Logo" class="margin-0 md:m-2"/>
            </a>

            <a href="#">
                <h3 class="text-2xl md:text-3xl lg:text-4xl">BpfMgr</h3>
            </a>

            <UserMenuCommands/>
        </header>
    )
}

export default Header;