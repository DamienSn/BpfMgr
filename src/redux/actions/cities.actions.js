import axios from "axios";

export const GET_CITIES = "GET_CITIES";
export const getCities = () => {
    return async (dispatch) => {
        try {
            const res = await axios({
                method: "get",
                url: `${import.meta.env.VITE_API_URL}cities/all`,
            });
            dispatch({ type: GET_CITIES, payload: res.data.data });
        } catch (err) {
            (err) => console.log("CITIES FETCH ERROR --- " + err);
        }
    };
};
