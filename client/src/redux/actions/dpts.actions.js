import axios from "axios";

export const GET_DPTS = "GET_DPTS";
export const getDpts = () => {
    return async (dispatch) => {
        try {
            const res = await axios({
                url: `${import.meta.env.VITE_API_URL}dpts/all`,
                method: "get",
                withCredentials: true,
                headers: {
                    "x-api-key": import.meta.env.VITE_API_KEY
                }
            });
            dispatch({ type: GET_DPTS, payload: res.data.data });
        } catch (err) {
            (err) => console.log("DPTS FETCH ERROR --- " + err);
        }
    };
};
