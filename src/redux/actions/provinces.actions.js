import axios from "axios";

export const GET_PROVINCES = "GET_PROVINCES";
export const getProvinces = () => {
    return async (dispatch) => {
        try {
            const res = await axios({
                method: "get",
                url: `${import.meta.env.VITE_API_URL}provinces/get/all`,
            });

            let data = res.data.data;
            data.forEach((province) => {
                province.province_dpts = province.province_dpts.split(',');
            })

            dispatch({ type: GET_PROVINCES, payload: data });
        } catch (err) {
            (err) => console.log("PROVINCES FETCH ERROR --- " + err);
        }
    };
};