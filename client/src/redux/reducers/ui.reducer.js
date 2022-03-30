// Banner reducer
export function bannerReducer(state=true, action) {
    switch(action.type) {
        case 'SET_BANNER':
            return action.payload;
        default:
            return state;
    }
}

// Footer reducer
export function footerReducer(state=true, action) {
    switch(action.type) {
        case 'SET_FOOTER':
            return action.payload;
        default:
            return state;
    }
}

// Add city reducer
export function addReducer(state="", action) {
    switch(action.type) {
        case 'SET_CITY_INPUT':
            return action.payload;
        default:
            return state;
    }
}

export function paneReducer(state=initialState, action) {
    switch(action.type) {
        case SET_PANE:
            return action.payload;
        case SET_PANE_ACTIVE:
            return {...state, active: action.payload}
        default:
            return state;
    }
}

// Loader reducer
export function loaderReducer(state=false, action) {
    switch (action.type) {
        case 'SET_LOADER':
            return action.payload;
        default:
            return state;
    }
}

// TABLE reducer
export function selBpfReducer(state=[], action) {
    switch (action.type) {
        case 'SET_SEL_BPF':
            return action.payload
            // let arr = state;
            // const index = arr.indexOf(action.payload)
            // if (index === -1) {
            //     arr.push(action.payload);
            // } else {
            //     arr.splice(index, 1);
            // }
            // return arr;
        case "CLEAR_SEL_BPF":
            return [];
        default:
            return state;
    }
}
export function selBcnReducer(state=[], action) {
    switch (action.type) {
        case 'SET_SEL_BCN':
            console.log(state)
            const index = state.indexOf(action.payload)
            if (index === -1) {
                state.push(action.payload);
            } else {
                state.splice(index, 1);
            }
            return state;
        default:
            return state;
    }
}