import React from 'react'
import { useContext } from 'react'
import { UidContext } from './AppContext'
import { SupportIcon } from '@heroicons/react/outline'
import { useSelector } from 'react-redux'

function Footer() {
    const uid = useContext(UidContext)
    const displayFooter = useSelector(state => state.footer);

    return (
        <>
            {displayFooter &&
                <footer className={`bg-gray-300 py-6 px-4 mt-6
                            flex flex-col justify-center items-center
                            ml-0
                            ${uid && 'sm:ml-[74px]'}`}>

                    <h5 className="font-extrabold border-b border-gray-500 pb-2">© Damien STEPHAN - 2021</h5>

                    <div className="w-full flex justify-around flex-wrap items-center mt-2">
                        <div className="px-4 text-center">
                            <a href="/#/about" className="underline">À propos</a><br />
                            <a href="https://github.com/DamienSn/BpfMgr" className="underline">
                                Code source
                            </a><br />
                            <a href="/#/legal" className="underline">Mentions légales</a><br />
                            <a href="mailto:bpfmgr@gmail.com" className="underline font-bold">
                                <SupportIcon className="icon-sm" />
                                Besoin d'aide, une remarque ?
                            </a>
                        </div>
                        <div className="px-4 text-justify">
                            BpfMgr vous est proposé de manière <span className="font-bold">gratuite</span> et <span className="font-bold">open-source</span><br />
                            Pour continuer ceci, pensez à nous faire part de vos remarques et à <span className="font-bold">soutenir le projet !</span>
                        </div>
                        <div className="flex flex-col justify-between space-y-4">
                            <iframe src="https://ghbtns.com/github-btn.html?user=DamienSn&repo=BpfMgr&type=star&count=true&size=large" frameborder="0" scrolling="0" width="170" height="30" title="GitHub"></iframe>
                            <a href="https://ko-fi.com/damiensn" className="btn btn-blue">
                                ☕ Offrez moi un café
                            </a>
                        </div>
                    </div>
                </footer>
            }
        </>
    )
}

export default Footer
