import axios from "axios";

export const GET_BCNS = "GET_BCNS";
export const getBcns = (uid) => {
    return async (dispatch) => {
        try {
            const res = await axios({
                method: "get",
                url: `${import.meta.env.VITE_API_URL}bcn/get/all_by_user?id=${uid}`,
            });
            dispatch({ type: GET_BCNS, payload: res.data.data });
        } catch (err) {
            (err) => console.log("BCNS FETCH ERROR --- " + err);
        }
    };
};
