import { HomeIcon, PlusCircleIcon, CollectionIcon, MapIcon, SearchIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import React from 'react';

export default function Menu() {
    return (
        <aside className="menu">
            <nav>
                <ul>
                    <MenuItem text="Accueil" path="/"><HomeIcon className='icon-md' /></MenuItem>
                    <MenuItem text="Ajouter un BPF/BCN" path="/add"><PlusCircleIcon className='icon-md' /></MenuItem>
                    <MenuItem text="Mes BPF/BCN" path="/list"><CollectionIcon className='icon-md' /></MenuItem>
                    <MenuItem text="Carte" path="/map"><MapIcon className='icon-md' /></MenuItem>
                    <MenuItem text="Recherche" path="/search"><SearchIcon className='icon-md' /></MenuItem>
                </ul>
            </nav>
        </aside>
    )
}

function MenuItem(props) {
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
        <li onClick={activateLinks} aria-label={props.text} className='relative group'>
            <Link to={props.path} style={{ textDecoration: 'none', color: '#fff' }} className="nav-link">
                {props.children}
            </Link>
            <span className="menu-tooltip sm:group-hover:scale-100">{props.text}</span>
        </li>
    )
}