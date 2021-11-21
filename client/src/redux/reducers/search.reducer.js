const SET_SEARCH = 'SET_SEARCH'
const SET_SEARCH_PAGE = 'SET_SEARCH_PAGE'
const SET_MODAL_ACTIVE = 'SET_MODAL_ACTIVE'

const initialState = {
    page: "home",
    id: null,
    active: false
};

export default function searchReducer(state=initialState, action) {
    switch(action.type) {
        case SET_SEARCH_PAGE:
            return {...state, page: action.payload};
        case SET_SEARCH:
            return action.payload;
        case SET_MODAL_ACTIVE:
            return {...state, active: action.payload}
        default:
            return state;
    }
}
