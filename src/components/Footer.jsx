import React from 'react'
import { useContext } from 'react'
import { UidContext } from './AppContext'

function Footer() {
    const uid = useContext(UidContext)

    return (
        <footer className={`bg-gray-300 py-6 px-4 mt-6
                            flex flex-col justify-center items-center
                            ${uid && 'menu-toggled menu-collapse'}`}>

            <h5 className="font-extrabold border-b border-gray-500 pb-2">© Damien STEPHAN - 2021</h5>

            <div className="w-full flex justify-around flex-wrap items-center mt-2">
                <div className="px-4 text-center">
                    <a href="/#/about" className="underline">À propos</a><br/>
                    <a href="https://github.com/DamienSn" className="underline">
                        Code source
                    </a><br/>
                    <a href="/#/legal" className="underline">Mentions légales</a>
                </div>
                <div className="px-4 text-justify">
                    BpfMgr vous est proposé de manière <span className="font-bold">gratuite</span> et <span className="font-bold">open-source</span><br />
                    Pour continuer ceci, pensez à <span className="font-bold">soutenir le projet !</span>
                </div>
                <div className="px-4 flex flex-col justify-center items-center">
                    <a href="https://www.buymeacoffee.com/damiensn" className="btn btn-blue">
                        ☕ Offrez moi un café
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
