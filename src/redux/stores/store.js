import { combineReducers, createStore, applyMiddleware } from "redux"
import userReducer from "../reducers/user.reducer";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import dptsReducer from "../reducers/dpts.reducer";
import provincesReducer from "../reducers/provinces.reducer";
import citiesReducer from "../reducers/cities.reducer";
import bpfsReducer from "../reducers/bpfs.reducer";
import bcnsReducer from "../reducers/bcns.reducer";
import paneReducer from "../reducers/pane.reducer";
import logReducer from "../reducers/log.reducer";
import searchReducer from "../reducers/search.reducer";
import {bannerReducer, addReducer} from "../reducers/ui.reducer";

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
        addCity: addReducer,
        bpfs: bpfsReducer,
        bcns: bcnsReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;