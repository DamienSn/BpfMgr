import {SET_PANE, SET_PANE_ACTIVE} from '../actions/pane.actions'

const initialState = {
    id: null,
    validated: false,
    active: false
};

export default function paneReducer(state=initialState, action) {
    switch(action.type) {
        case SET_PANE:
            return action.payload;
        case SET_PANE_ACTIVE:
            return {...state, active: action.payload}
        default:
            return state;
    }
}