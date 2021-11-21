export const SET_PANE = 'SET_PANE'
export const SET_PANE_ACTIVE = 'SET_PANE_ACTIVE'

export const setPane = (payload) => {
    return dispatch => dispatch({type: SET_PANE, payload})
}