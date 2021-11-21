import {GET_USER} from '../actions/user.actions';

const initialState = {};

function userReducer (state=initialState, action) {
    switch(action.type) {
        case GET_USER:
            return action.payload;
        default:
            return state;
    }
}

export default userReducer;