import { useContext, useState } from "react"
import { UidContext } from "./AppContext";
import { useSelector } from "react-redux";
import { LocationMarkerIcon, FastForwardIcon, FlagIcon } from "@heroicons/react/outline"
import { useEffect } from "react";
import Percentage from "./Percentage";

export function BpfStats() {
    const uid = useContext(UidContext);
    const bpfs = useSelector(state => state.bpfs)
    const cities = useSelector(state => state.cities)
    const dpts = useSelector(state => state.dpts);
    const [doneDpts, setDoneDpts] = useState(0);

    useEffect(() => {
        dpts.forEach(dpt => {
            if (bpfs.filter(i => i.city_departement == dpt.code).length == dpt.dpt_cities_number) {
                setDoneDpts(doneDpts + 1)
            }
        })
    }, [dpts, bpfs])

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 mt-4 bg-blue-300 px-8 py-4 rounded-xl md:mr-8">

            {/* Header */}
            <div className="text-lg font-bold border-b-2 border-gray-400">
                BPF
            </div>

            {/* Main stats */}
            <div className="flex mt-2 md:mt-4 items-center justify-around">
                <div>
                    <p className="text-3xl md:text-5xl xl:text-6xl font-extrabold">{bpfs.length}<LocationMarkerIcon className="h-5 w-5 inline mb-1 md:h-8 md:w-8 lg:h-10 lg:w-10" /></p>
                    <p className="text-lg pl-4">BPF faits</p>
                </div>

                <Percentage className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 flex justify-center items-center" fgColor="#059669" bgColor="#D1D5DB" percentage={bpfs.length / cities.length * 100}>
                    <p className="absolute text-sm md:text-lg font-bold"><span className="text-lg md:text-3xl lg:text-4xl font-extrabold">{Math.floor(bpfs.length / cities.length * 100)}</span>&nbsp;%</p>
                </Percentage>

            </div>

            {/* Card bottom */}
            <ul className="mt-4 md:mt-8 flex justify-around items-end flex-wrap">
                <li className="flex space-x-8 items-center px-2">
                    {/* <FastForwardIcon className="icon-md" /> */}
                    <p className="text-md lg:text-lg"><span className="font-extrabold text-xl md:text-2xl">{cities.length - bpfs.length} </span>BPF restants</p>
                </li>

                <li className="flex space-x-8 items-center px-2">
                    {/* <FlagIcon className="icon-md" /> */}
                    <p className="text-md lg:text-lg"><span className="font-extrabold text-xl md:text-2xl">{doneDpts} </span>Dpts. terminés</p>
                </li>
            </ul>
        </div>
    )
}

export function BcnStats() {
    const uid = useContext(UidContext);
    const bcns = useSelector(state => state.bcns)
    const dpts = useSelector(state => state.dpts)

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 mt-4 bg-indigo-400 px-8 py-4 rounded-xl">

            {/* Header */}
            <div className="text-lg font-bold border-b-2 border-gray-400">
                BCN
            </div>

            {/* Main stats */}
            <div className="flex mt-2 md:mt-4 items-center justify-around">
                <div>
                    <p className="text-3xl md:text-5xl xl:text-6xl font-extrabold">{bcns.length}<FlagIcon className="h-5 w-5 inline mb-1 md:h-8 md:w-8 lg:h-10 lg:w-10" /></p>
                    <p className="text-lg pl-4">BCN faits</p>
                </div>

                <Percentage className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 flex justify-center items-center" fgColor="#F59E0B" bgColor="#D1D5DB" percentage={bcns.length / dpts.length * 100}>
                    <p className="absolute text-sm md:text-lg font-bold"><span className="text-lg md:text-3xl lg:text-4xl font-extrabold">{Math.floor(bcns.length / dpts.length * 100)}</span>&nbsp;%</p>
                </Percentage>

            </div>

            {/* Card bottom */}
            <ul className="mt-4 md:mt-8 flex">
                <li className="flex items-center ml-16">
                    <p className="text-md lg:text-lg"><span className="font-extrabold text-xl md:text-2xl">{dpts.length - bcns.length} </span>BCN restants</p>
                </li>
            </ul>
        </div>
    )
}