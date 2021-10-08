import React from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import { useDispatch } from 'react-redux'

function SearchBar(props) {
    const dispatch = useDispatch();

    const sendSearch = (e) => {
       props.action(e.target.value)
    }

    return (
        <div>
            <label htmlFor="search-bar" className="label">Filtrer par...</label>
            <div class="flex bg-gray-300 p-3 w-72 space-x-4 rounded-lg">
                <SearchIcon className="icon-sm opacity-50" />
                <input type="search" id="serach-bar" placeholder="Rechercher..." onInput={sendSearch} className="bg-gray-300 outline-none" />
            </div>
        </div>
    )
}

export default SearchBar
