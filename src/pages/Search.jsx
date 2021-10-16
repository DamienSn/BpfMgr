import React, { useContext } from 'react'
import { UidContext } from '../components/AppContext'
import SearchBar from '../components/SearchBar'

function Search() {
    const uid = useContext(UidContext);

    return (
        <main className={`${uid && 'menu-toggled menu-collapse'} mt-80px`}>
            <SearchBar></SearchBar>
        </main>
    )
}

export default Search
