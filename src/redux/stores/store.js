import { combineReducers, createStore, applyMiddleware } from "redux"
import userReducer from "../reducers/user.reducer";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import dptsReducer from "../reducers/dpts.reducer";
import provincesReducer from "../reducers/provinces.reducer";
import citiesReducer from "../reducers/cities.reducer";
import bpfsReducer from "../reducers/bpfs.reducer";
import bcnsReducer from "../reducers/bcns.reducer";
import logReducer from "../reducers/log.reducer";
import searchReducer from "../reducers/search.reducer";
import {bannerReducer, addReducer, paneReducer, footerReducer, loaderReducer} from "../reducers/ui.reducer";
import mapCoordsReducer from "../reducers/mapCoords.reducer";

const store = createStore(
    combineReducers({
        user: userReducer,
        dpts: dptsReducer,
        provinces: provincesReducer,
        cities: citiesReducer,
        mapPane: paneReducer,
        logModal: logReducer,
        search: searchReducer,
        banner: bannerReducer,
        footer: footerReducer,
        addCity: addReducer,
        bpfs: bpfsReducer,
        bcns: bcnsReducer,
        mapCoords: mapCoordsReducer,
        loader: loaderReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;