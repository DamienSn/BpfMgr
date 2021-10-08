import { UidContext } from "./AppContext";
import { useContext } from 'react';
import UserMenuCommands from './UserMenuCommands'

function Header() {
    const uid = useContext(UidContext);

    const handleMenuClick = (e) => {
        document.querySelector('.menu').classList.toggle('reduced');
        document.querySelector('main').classList.toggle('menu-collapse');
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

            <div className="brand">
                {/* <Link to="/" style={{textDecoration: 'none'}}> */}
                <img src="/img/logos/light.svg" alt="Logo" />
                <h3>BpfMgr</h3>
                {/* </Link> */}
            </div>

            <UserMenuCommands/>
        </header>
    )
}

export default Header;