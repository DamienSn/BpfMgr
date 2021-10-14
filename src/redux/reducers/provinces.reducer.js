import {GET_PROVINCES} from '../actions/provinces.actions'

const initialState = [];

export default function provincesReducer(state=initialState, action) {
    switch(action.type) {
        case GET_PROVINCES:
            return action.payload;
        default:
            return state;
    }
}