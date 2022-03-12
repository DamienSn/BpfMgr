import { combineReducers, createStore, applyMiddleware } from "redux"
import {composeWithDevTools} from 'redux-devtools-extension';
import userReducer from "../reducers/user.reducer";
import thunk from 'redux-thunk';
import dptsReducer from "../reducers/dpts.reducer";
import provincesReducer from "../reducers/provinces.reducer";
import citiesReducer from "../reducers/cities.reducer";
import bpfsReducer from "../reducers/bpfs.reducer";
import bcnsReducer from "../reducers/bcns.reducer";
import searchReducer from "../reducers/search.reducer";
import {bannerReducer, addReducer, footerReducer, loaderReducer} from "../reducers/ui.reducer";
import mapCoordsReducer from "../reducers/mapCoords.reducer";

const compose = import.meta.env.PROD ? applyMiddleware(thunk) : composeWithDevTools(applyMiddleware(thunk));

const store = createStore(
    combineReducers({
        user: userReducer,
        dpts: dptsReducer,
        provinces: provincesReducer,
        cities: citiesReducer,
        search: searchReducer,
        banner: bannerReducer,
        footer: footerReducer,
        addCity: addReducer,
        bpfs: bpfsReducer,
        bcns: bcnsReducer,
        mapCoords: mapCoordsReducer,
        loader: loaderReducer
    }),
    compose
)

export default store;