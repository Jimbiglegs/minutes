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
            return { ...state, toasts: [ ...state.toasts, action.newToast ]};
            
        default:
            return state;
    }
}

export default appReducer;