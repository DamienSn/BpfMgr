const initialState = []
export default function mapCoordsReducer(state=initialState, action) {
    switch(action.type) {
        case 'SET_MAP_COORDS':
            return action.payload;
        default:
            return state;
    }
}