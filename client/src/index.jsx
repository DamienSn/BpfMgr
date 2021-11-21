import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from 'react-redux';
import store from "./redux/stores/store";

import SimpleReactLightbox from 'simple-react-lightbox';

ReactDOM.render(
    <React.StrictMode>
        <SimpleReactLightbox>
            <Provider store={store}>
                <App />
            </Provider>
        </SimpleReactLightbox>
    </React.StrictMode>,
    document.getElementById("root")
);
