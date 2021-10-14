import axios from "axios";

export const GET_DPTS = "GET_DPTS";
export const getDpts = () => {
    return async (dispatch) => {
        try {
            const res = await axios({
                method: "get",
                url: "https://geo.api.gouv.fr/departements",
            });
            dispatch({ type: GET_DPTS, payload: res.data });
        } catch (err) {
            (err) => console.log("DPTS FETCH ERROR --- " + err);
        }
    };
};
