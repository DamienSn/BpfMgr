import { useMap } from "@monsonjeremy/react-leaflet";
import L from 'leaflet'
import { useSelector } from "react-redux";
import { provincesSelector } from "../../redux/selectors/provinces.selectors";

/**
 * Province Control
 */
 export default function ProvinceCtl(props) {
    // Control
    const map = useMap();

    // List of dpts and provinces
    const provinces = useSelector(provincesSelector);

    const handleProvinceSelectChange = (e) => {
        let val = e.target.value;
        provinces.forEach(pro => {
            if (pro.province_name == val) {
                props.handler(pro.province_dpts);
            } else if (e.target.value === "") {
                props.handler("")
            }
        })
    }

    return (
        <div className="leaflet-top leaflet-left">
            <div className="leaflet-control leaflet-bar">
                <input type="text" list="province-ctl-list" placeholder="Filtrer par province" onInput={handleProvinceSelectChange} />
                <datalist id="province-ctl-list">
                    {provinces.map((province, index) =>
                        <option value={province.province_name} key={index}>{province.province_dpts.join(", ")}</option>
                    )}
                </datalist>
            </div>
        </div>
    )
}