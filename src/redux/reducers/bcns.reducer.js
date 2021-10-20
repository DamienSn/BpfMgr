import {GET_BCNS} from '../actions/bcns.actions'

const initialState = [];

export default function bcnsReducer(state=initialState, action) {
    switch(action.type) {
        case GET_BCNS:
            return action.payload;
        default:
            return state;
    }
}