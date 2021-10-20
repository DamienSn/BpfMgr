import {GET_BPFS} from '../actions/bpfs.actions'

const initialState = [];

export default function bpfsReducer(state=initialState, action) {
    switch(action.type) {
        case GET_BPFS:
            return action.payload;
        default:
            return state;
    }
}