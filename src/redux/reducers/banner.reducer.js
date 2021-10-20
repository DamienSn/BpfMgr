const SET_BANNER = 'SET_BANNER'

const initialState = true;

export default function bannerReducer(state=initialState, action) {
    switch(action.type) {
        case SET_BANNER:
            return action.payload;
        default:
            return state;
    }
}