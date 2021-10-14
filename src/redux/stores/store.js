import { combineReducers, createStore, applyMiddleware } from "redux"
import userReducer from "../reducers/user.reducer";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import dptsReducer from "../reducers/dpts.reducer";
import provincesReducer from "../reducers/provinces.reducer";
import citiesReducer from "../reducers/cities.reducer";

const store = createStore(
    combineReducers({
        user: userReducer,
        dpts: dptsReducer,
        provinces: provincesReducer,
        cities: citiesReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;