import React from 'react'
import { SearchIcon } from '@heroicons/react/outline'

function SearchBar(props) {
    const sendSearch = (e) => {
        props.action(e.target.value)
    }

    return (
        <div>
            {props.label && <label htmlFor="search-bar">Rechercher</label>}
            <div className="flex bg-gray-300 p-3 w-72 space-x-4 rounded-lg">
                <SearchIcon className="icon-sm opacity-50" />
                <input type="search" id="search-bar" placeholder="Rechercher..." onInput={sendSearch} className="bg-gray-300 outline-none"/>
            </div>
        </div>
    )
}

export default SearchBar
