import { combineReducers, createStore, applyMiddleware } from "redux"
import userReducer from "../reducers/user.reducer";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(
    combineReducers({
        user: userReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;