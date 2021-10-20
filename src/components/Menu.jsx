import { HomeIcon, PlusCircleIcon, CollectionIcon, MapIcon, SearchIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom'
import { useEffect } from 'react';

export default function Menu() {
    const removeActiveLinks = () => {
        const icons = document.querySelectorAll('.nav-link span.svg-container');
        icons.forEach((icon) => {
            icon.classList.remove('active');
        })
    }

    const activateIcon = (index) => {
        const icons = document.querySelectorAll('.nav-link span.svg-container');
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
        <aside className="menu reduced">
            <nav>
                <ul>
                    <li onClick={activateLinks} title="Accueil">
                        <Link to="/" style={{ textDecoration: 'none', color: '#fff' }} className="nav-link">
                            {/* <ion-icon src="/icons/home-outline.svg"></ion-icon> */}
                            <span className="svg-container">
                                <HomeIcon className="icon-md" />
                            </span>
                            <span>&nbsp;Accueil</span>
                        </Link>
                    </li>
                    <li onClick={activateLinks} title="Ajouter un BPF/BCN">
                        <Link to="/add" style={{ textDecoration: 'none', color: '#fff' }} className="nav-link">
                            {/* <ion-icon src="/icons/add-outline.svg"></ion-icon> */}
                            <span className="svg-container">
                                <PlusCircleIcon className="icon-md" />
                            </span>
                            <span>&nbsp;Ajouter</span>
                        </Link>
                    </li>
                    <li onClick={activateLinks} title="Mes BPF/BCN">
                        <Link to="/list" style={{ textDecoration: 'none', color: '#fff' }} className="nav-link">
                            {/* <ion-icon src="/icons/list-outline.svg"></ion-icon> */}
                            <span className="svg-container">
                                <CollectionIcon className="icon-md" />
                            </span>
                            <span>&nbsp;Mes BPF/BCN</span>
                        </Link>
                    </li>
                    <li onClick={activateLinks} title="Carte">
                        <Link to="/map" style={{ textDecoration: 'none', color: '#fff' }} className="nav-link">
                            {/* <ion-icon src="/icons/map-outline.svg"></ion-icon> */}
                            <span className="svg-container">
                                <MapIcon className="icon-md" />
                            </span>
                            <span>&nbsp;Carte</span>
                        </Link>
                    </li>
                    <li onClick={activateLinks} title="Recherche">
                        <Link to="/search" style={{ textDecoration: 'none', color: '#fff' }} className="nav-link">
                            {/* <ion-icon src="/icons/search-outline.svg"></ion-icon> */}
                            <span className="svg-container">
                                <SearchIcon className="icon-md" />
                            </span>
                            <span>&nbsp;Recherche</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}