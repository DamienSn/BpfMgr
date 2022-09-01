import { useContext, useEffect, useState } from "react";
import { UidContext } from './AppContext';
import { BpfStats, BcnStats } from "./BpfStats";
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/selectors/user.selectors';
import axios from 'axios';
import { StatNumber } from './Stats.jsx';
import { useLocation } from 'react-router-dom';

// Icons
import { ChartBarIcon, ClockIcon, TerminalIcon } from '@heroicons/react/outline'

function Dashboard() {
    const uid = useContext(UidContext);
    const userData = useSelector(userSelector);

    // Token
    const search = window.location.search;
    const token = new URLSearchParams(search).get('access_token');
    if (token) { window.location.hash = '/settings' }

    // State
    const [message, setMessage] = useState('Bienvenue');
    const [users, setUsers] = useState(0);
    const bpfNumber = useSelector(state => state.bpfs).length
    const latestsBpfs = useSelector(state => state.bpfs).sort((a, b) => new Date(b.bpf_date) - new Date(a.bpf_date)).slice(0, 3);

    useEffect(() => {
        const hours = new Date().getHours();
        const messages = ['Déjà debout', 'Bonjour', 'Bon après-midi', 'Bonsoir', 'Encore debout']

        if (hours >= 0 && hours <= 8) {
            setMessage(messages[0])
        } else if (hours > 8 && hours <= 12) {
            setMessage(messages[1])
        } else if (hours > 12 && hours < 18) {
            setMessage(messages[2])
        } else if (hours > 18 && hours <= 22) {
            setMessage(messages[3])
        } else if (hours > 22 && hours < 0) {
            setMessage(messages[4])
        }
    }, [message]);

    useEffect(() => {
        axios({
            mathod: 'get',
            url: `${import.meta.env.VITE_API_URL}users/all`,
            withCredentials: true,
            headers: {
                'x-api-key': import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                setUsers(res.data.length);
            })
            .catch(err => setUsers("Erreur"))
    }, [users])

    return (
        <section id="dashboard">
            <h2 className="text-4xl md:text-4xl lg:text-6xl">{message}, {userData.user_name} !</h2>

            <section id="stats">
                <h3 className="text-2xl md:text-3xl lg:text-4xl mt-2 lg:mt-4">
                    <ChartBarIcon className="h-5 w-5 inline mb-1 md:h-10 md:w-10" />&nbsp; Vos statistiques
                </h3>
                {/* BPF BCN stats */}
                <div id="bpf-stat" className="flex flex-wrap">
                    <BpfStats />
                    <BcnStats />
                </div>

                <h3 className="pt-3 text-2xl md:text-3xl lg:text-4xl mt-2 lg:mt-4">
                    <ClockIcon className="h-5 w-5 inline mb-1 md:h-10 md:w-10" />&nbsp;Vos derniers BPF
                </h3>
                <div>
                    {
                        latestsBpfs.map((bpf, index) =>
                            <li key={index}>{bpf.city_name} ({bpf.city_departement}) - Le {new Date(bpf.bpf_date).toLocaleDateString()}</li>
                        )
                    }
                    {latestsBpfs.length == 0 && <p><span className="font-bold">Validez des BPF ! </span>Les trois derniers que vous avez validé apparaîtront ici.</p>}
                </div>

                {userData.user_permissions === "adm" &&
                    <>
                        <h3 className="mt-4 text-2xl md:text-3xl lg:text-4xl lg:mt-4"><TerminalIcon className="h-5 w-5 inline mb-1 md:h-10 md:w-10" />&nbsp;Sous le capot</h3>
                        <a href="#/users">
                            <StatNumber number={users} description="Utilisateurs" />
                        </a>
                    </>
                }
            </section>
        </section>
    )
}

export default Dashboard;