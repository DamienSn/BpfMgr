import { useContext, useEffect, useState } from "react";
import { UidContext } from './AppContext';
import {BpfStats, BcnStats} from "./BpfStats";
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/selectors/user.selectors';

// Icons
import { ChartBarIcon, ClockIcon } from '@heroicons/react/outline'

function Dashboard() {
    const uid = useContext(UidContext);
    const userData = useSelector(userSelector);

    // State
    const [message, setMessage] = useState('Bienvenue');
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

    return (
        <section id="dashboard">
            <h2>{message}, {userData.user_name} !</h2>
        
            <section id="stats">
                    <h3>
                        <ChartBarIcon className="icon-md" />&nbsp; Vos statistiques
                    </h3>
                    {/* BPF BCN stats */}
                    <div id="bpf-stat" className="stat-bar">
                        <BpfStats />
                        <BcnStats />
                    </div>

                    <h3 className="pt-3">
                        <ClockIcon className="icon-md" />&nbsp;Vos derniers BPF
                    </h3>
                    <div>
                        {
                            latestsBpfs.map((bpf, index) =>
                                <li key={index}>{bpf.city_name} ({bpf.city_departement}) - Le {new Date(bpf.bpf_date).toLocaleDateString()}</li>
                            )
                        }
                    </div>
            </section>
        </section>
    )
}

export default Dashboard;