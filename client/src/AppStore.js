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

        case 'DELETE_TOAST':
            return { ...state, toasts : state.toasts.filter( element => element !== action.toast ) };

        case 'SET_TITLE':
            return { ...state, meeting: { ...state.meeting, title: action.title } };

        case 'SET_DATE':
            return { ...state, meeting: { ...state.meeting, date: action.date } };
            
        case 'SET_TIME':
            return { ...state, meeting: { ...state.meeting, time: action.time } };
        
        case 'SET_LOCATION':
            return { ...state, meeting: { ...state.meeting, location: action.location } };

        case 'SET_ATTENDEES':
            return { ...state, meeting: { ...state.meeting, attendees: action.attendees } };
        
        case 'SET_MEETING_TITLE_ERROR':
            return { ...state, meetingError: { ...state.meetingError, titleError: action.titleError } };

        case 'SET_MEETING_DATE_ERROR':
            return { ...state, meetingError: { ...state.meetingError, dateError: action.dateError } };

        case 'SET_MEETING_TIME_ERROR':
            return { ...state, meetingError: { ...state.meetingError, timeError: action.timeError } };

        case 'SET_MEETING_LOCATION_ERROR':
            return { ...state, meetingError: { ...state.meetingError, locationError: action.locationError } };

        case 'SET_MEETING_ATTENDEES_ERROR':
            return { ...state, meetingError: { ...state.meetingError, attendeesError: action.attendeesError } };            

        case 'CLEAR_MEETING_ERRORS':
            return { ...state, meetingError: {
                titleError: false,
                dateError: false,
                timeError: false,
                locationError: false,
                attendeesError: false
            } };
            
        default:
            return state;
    }
}

export default appReducer;