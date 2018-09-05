const defaultState = {
    profile : null,
    toasts: [],
    meetings: {
        loaded: false,
        list: []
    },
    tasks: {
        loaded: false,
        list: []
    }
};

function appReducer(state = defaultState, action) {
    switch(action.type) {
        case 'SET_PROFILE':
            return { ...state, profile: action.profile };
            
        case 'SHOW_TOAST':
            return { ...state, toasts: [ ...state.toasts, action.toast ]};

        case 'REMOVE_TOAST':
            return { ...state, toasts : state.toasts.filter( element => element !== action.toast ) };
            
        default:
            return state;
    }
}

export default appReducer;
