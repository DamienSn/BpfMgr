// Banner reducer
export function bannerReducer(state=true, action) {
    switch(action.type) {
        case 'SET_BANNER':
            return action.payload;
        default:
            return state;
    }
}

// Footer reducer
export function footerReducer(state=true, action) {
    switch(action.type) {
        case 'SET_FOOTER':
            return action.payload;
        default:
            return state;
    }
}

// Add city reducer
export function addReducer(state="", action) {
    switch(action.type) {
        case 'SET_CITY_INPUT':
            return action.payload;
        default:
            return state;
    }
}

// Pane Reducer
import {SET_PANE, SET_PANE_ACTIVE} from '../actions/pane.actions'

const initialState = {
    id: null,
    validated: false,
    active: false
};

export function paneReducer(state=initialState, action) {
    switch(action.type) {
        case SET_PANE:
            return action.payload;
        case SET_PANE_ACTIVE:
            return {...state, active: action.payload}
        default:
            return state;
    }
}

// Loader reducer
export function loaderReducer(state=false, action) {
    switch (action.type) {
        case 'SET_LOADER':
            return action.payload;
        default:
            return state;
    }
}