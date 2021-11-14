const SET_LOG_MODAL = 'SET_LOG_MODAL'

export default function logReducer(state="in", action) {
    switch(action.type) {
        case SET_LOG_MODAL:
            return action.payload
        default:
            return state;
    }
}