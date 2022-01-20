import { HomeIcon, PlusCircleIcon, CollectionIcon, MapIcon, SearchIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom'
import { useEffect } from 'react';

export default function Menu() {
    const removeActiveLinks = () => {
        const icons = document.querySelectorAll('.nav-link');
        icons.forEach((icon) => {
            icon.classList.remove('active');
        })
    }

    const activateIcon = (index) => {
        const icons = document.querySelectorAll('.nav-link');
        icons[index].classList.add('active');
    }

    const activateLinks = () => {
        removeActiveLinks();
        const location = window.location.hash;

        switch (location) {
            case '#/':
                activateIcon(0);
                break;
            case '#/add':
                activateIcon(1);
                break;
            case '#/list':
                activateIcon(2);
                break;
            case '#/map':
                activateIcon(3);
                break;
            case '#/search':
                activateIcon(4);
                break;
            default:
            //pass
        }
    }

    // Check page and activate icons
    useEffect(activateLinks);

    return (
        <aside className="menu">
            <nav>
                <ul>
                    <li onClick={activateLinks} title="Accueil">
                        <Link to="/" style={{ textDecoration: 'none', color: '#fff' }} className="nav-link">
                                <HomeIcon className="icon-md" />
                        </Link>
                    </li>
                    <li onClick={activateLinks} title="Ajouter un BPF/BCN">
                        <Link to="/add" style={{ textDecoration: 'none', color: '#fff' }} className="nav-link">
                                <PlusCircleIcon className="icon-md" />
                        </Link>
                    </li>
                    <li onClick={activateLinks} title="Mes BPF/BCN">
                        <Link to="/list" style={{ textDecoration: 'none', color: '#fff' }} className="nav-link">
                                <CollectionIcon className="icon-md" />
                        </Link>
                    </li>
                    <li onClick={activateLinks} title="Carte">
                        <Link to="/map" style={{ textDecoration: 'none', color: '#fff' }} className="nav-link">
                                <MapIcon className="icon-md" />
                        </Link>
                    </li>
                    <li onClick={activateLinks} title="Recherche">
                        <Link to="/search" style={{ textDecoration: 'none', color: '#fff' }} className="nav-link">
                                <SearchIcon className="icon-md" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}