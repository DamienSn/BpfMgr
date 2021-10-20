import { useContext, useState } from "react"
import { getBpfNumber } from "../utilities/bpfRequests";
import { StatNumber } from "./Stats"
import { UidContext } from "./AppContext";
import { useSelector } from "react-redux";

export function BpfStats() {
    const uid = useContext(UidContext);
    const data = useSelector(state => state.bpfs)

    return (
        <>
            <StatNumber number={data.length} description="BPF Faits" />
            <StatNumber number={541 - data.length} description="BPF Restants" />
            <StatNumber number={`${Math.floor((data.length / 541 * 100) * 100) / 100}%`} description="BPF Faits" />
        </>
    )
}

export function BcnStats() {
    const uid = useContext(UidContext);
    const data = useSelector(state => state.bcns)

    return (
        <>
            <StatNumber number={data.length} description="BCN Faits" />
            <StatNumber number={91 - data.length} description="BCN Restants" />
            <StatNumber number={`${Math.floor((data.length / 91 * 100) * 100) / 100}%`} description="BCN Faits" />
        </>
    )
}