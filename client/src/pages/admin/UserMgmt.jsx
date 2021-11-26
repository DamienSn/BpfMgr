import { useContext } from "react"
import { UidContext } from "../../components/AppContext"

import { UserGroupIcon, UserIcon } from '@heroicons/react/outline'
import { useState, useEffect } from "react"
import axios from "axios"

export default function UserMgmt() {
    const uid = useContext(UidContext)
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios({
            method: 'get',
            url: `${import.meta.env.VITE_API_URL}users/all`,
            withCredentials: true,
            headers: {
                'x-api-key': import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => setUsers(["Erreur"]))
    }, [])

    return (
        <main className={`${uid && 'menu-toggled menu-collapse'}`}>
            <h2><UserGroupIcon className="icon-md" />&nbsp;Gestion des utilisateurs</h2>
            <table className="w-full mt-6">
                <thead>
                    <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                        <td>Nom</td>
                        <td>Email</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td className="px-4 py-4 border border-blue-300">{user.user_name}</td>
                            <td className="px-4 py-4 border border-blue-300">{user.user_email}</td>
                            <td className="px-4 py-4 border border-blue-300">
                                <a href={`#/users/${user.user_id}`} className="btn btn-outline-blue">
                                    <UserIcon className="icon-sm" />&nbsp;
                                    Gérer
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}