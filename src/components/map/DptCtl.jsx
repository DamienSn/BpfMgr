import { useMap } from "@monsonjeremy/react-leaflet";
import L from 'leaflet'
import { useSelector } from "react-redux";
import { dptsSelector } from "../../redux/selectors/dpts.selectors";
import { useEffect } from "react";

/**
 * Departement Control
 */
 export default function DptCtl(props) {
    // Control
    const map = useMap();

    // List of dpts and provinces
    const dpts = useSelector(dptsSelector);

    L.Control.Dpts = L.Control.extend({
        onAdd(map) {
            const container = L.DomUtil.create('div');
            const input = L.DomUtil.create('input', container);

            
            return container;
        },
        onRemove(map) {}
    })

    L.Control.dpts = function (opts) {
        return new L.Control.Dpts(opts);
    }

    useEffect(() => {
        const control = L.Control.dpts({ position: props.position })
        map.addControl(control)

        return () => {
            map.removeControl(control)
        }
    }, [dpts])

    return null;
}