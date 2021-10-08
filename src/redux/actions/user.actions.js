import axios from "axios";

export const GET_USER = 'GET_USER';

export const getUser = (uid) => {
    return async (dispatch) => {
      try {
        const res = await axios
          .get(`${import.meta.env.VITE_API_URL}users/${uid}`);
        dispatch({ type: GET_USER, payload: res.data.data });
      } catch (err) {
        return console.log(err);
      }
    };
  };