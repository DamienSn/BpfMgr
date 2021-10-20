const SET_BANNER = 'SET_BANNER'

const initialStateBanner = true;

export function bannerReducer(state=initialStateBanner, action) {
    switch(action.type) {
        case SET_BANNER:
            return action.payload;
        default:
            return state;
    }
}

const SET_CITY_INPUT = 'SET_CITY_INPUT'

const initialStateCity = "";

export function addReducer(state=initialStateCity, action) {
    switch(action.type) {
        case SET_CITY_INPUT:
            return action.payload;
        default:
            return state;
    }
}