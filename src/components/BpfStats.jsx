import { useContext, useState } from "react"
import { getBpfNumber } from "../utilities/bpfRequests";
import { StatNumber } from "./Stats"
import { UidContext } from "./AppContext";

export default function BpfStats() {
    const uid = useContext(UidContext);
    const [bpfNumber, setBpfNumber] = useState();

    getBpfNumber(uid, setBpfNumber);

    return (
        <>
            <StatNumber number={bpfNumber} description="BPF Pointés" />
            <StatNumber number={541 - bpfNumber} description="BPF Restants" />
            <StatNumber number={`${Math.floor((bpfNumber / 541 * 100) * 100) / 100}%`} description="BPF Faits" />
        </>
    )
}