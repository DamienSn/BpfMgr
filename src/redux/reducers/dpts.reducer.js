import {GET_DPTS} from '../actions/dpts.actions'

const initialState = [];

export default function dptsReducer(state=initialState, action) {
    switch(action.type) {
        case GET_DPTS:
            return action.payload;
        default:
            return state;
    }
}