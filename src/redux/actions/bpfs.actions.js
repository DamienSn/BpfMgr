import axios from "axios";

export const GET_BPFS = "GET_BPFS";
export const getBpfs = (uid) => {
    return async (dispatch) => {
        try {
            const res = await axios({
                method: "get",
                url: `${import.meta.env.VITE_API_URL}bpf/get/all_by_user?id=${uid}`,
                headers: {
                    "x-api-key": import.meta.env.VITE_API_KEY
                }
            });
            dispatch({ type: GET_BPFS, payload: res.data.data });
        } catch (err) {
            (err) => console.log("BPFS FETCH ERROR --- " + err);
        }
    };
};
