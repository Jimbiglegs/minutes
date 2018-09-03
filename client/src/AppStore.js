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
    },
    //schedule state
    meeting: {
        title : null,
        date: null,
        time: null,
        location: null,
        attendees: [],
    },
    meetingError: {
        titleError: false,
        dateError: false,
        timeError: false,
        locationError: false,
        attendeesError: false
    }
};

function appReducer(state = defaultState, action) {
    switch(action.type) {
        case 'SET_PROFILE':
            return { ...state, profile: action.profile };
            
        case 'SHOW_TOAST':
            return { ...state, toasts: [ ...state.toasts, action.toast ]};
        case 'SET_TITLE':
            return { ...state, title: action.title };
        case 'SET_DATE':
            return { ...state, date: action.date };
        case 'SET_TIME':
            return { ...state, time: action.time };   
        case 'SET_LOCATION':
            return { ...state, location: action.location }; 
        case 'SET_ATTENDEES':
            return { ...state, attendees: [ ...state.attendees, action.attendees ]}; 
        case 'SET_MEETING_TITLE_ERROR':
            return { ...state, titleError: action.titleError }; 
        case 'SET_MEETING_DATE_ERROR':
            return { ...state, dateError: action.dateError }; 
        case 'SET_MEETING_TIME_ERROR':
            return { ...state, timeError: action.timeError }; 
        case 'SET_MEETING_LOCATION_ERROR':
            return { ...state, locationError: action.locationError }; 
        case 'SET_MEETING_ATTENDEES_ERROR':
            return { ...state, attendeesError: [ ...state.attendeesError, action.attendeesError ]}; 
            

        default:
            return state;
    }
}

export default appReducer;