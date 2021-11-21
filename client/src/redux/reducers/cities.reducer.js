import {GET_CITIES} from '../actions/cities.actions'

const initialState = [];

export default function citiesReducer(state=initialState, action) {
    switch(action.type) {
        case GET_CITIES:
            return action.payload;
        default:
            return state;
    }
}