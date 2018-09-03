const AllAppActions = (dispatch) => ({

    /**
     * Method to fire SET_PROFILE reducer action.
     */
    setUserProfile: (profile) => {
        dispatch({
            type : 'SET_PROFILE',
            profile : profile
        });
    },

    showErrorToast: (toastTitle) => {
        dispatch({
            type : 'SHOW_TOAST',
            toast: { title : toastTitle, level : 'danger' }
        });
    },

    showToast: (toastTitle, toastLevel) => {
        dispatch({
            type : 'SHOW_TOAST',
            toast: { title : toastTitle, level : toastLevel }
        });
    },

    setMeetingTitle : (title) => {
        dispatch({
            type: 'SET_TITLE',
            title: title
        });
    },

    setMeetingDate : (date) => {
        dispatch({
            type: 'SET_DATE',
            date: date
        });
    },

    setMeetingTime : (time) => {
        dispatch({
            type: 'SET_TIME',
            time: time
        });
    },

    setMeetingLocation : (location) => {
        dispatch({
            type: 'SET_LOCATION',
            location: location
        });
    },

    setMeetingAttendees : (attendees) => {
        dispatch({
            type: 'SET_ATTENDEES',
            attendees: attendees
        });
    },
   
    setMeetingTitleError : (titleError) => {
        dispatch({
            type: 'SET_MEETING_TITLE_ERROR',
            titleError: titleError
        });
    },

    setMeetingDateError : (dateError) => {
        dispatch({
            type: 'SET_MEETING_DATE_ERROR',
            dateError: dateError
        });
    },

    setMeetingTimeError : (timeError) => {
        dispatch({
            type: 'SET_MEETING_TIME_ERROR',
            timeError: timeError
        });
    },

    setMeetingLocationError : (locationError) => {
        dispatch({
            type: 'SET_MEETING_LOCATION_ERROR',
            locationError: locationError
        });
    },

    setMeetingAttendeesError : (attendeesError) => {
        dispatch({
            type: 'SET_MEETING_ATTENDEES_ERROR',
            attendeesError: attendeesError
        });
    },


});

export default AllAppActions;
