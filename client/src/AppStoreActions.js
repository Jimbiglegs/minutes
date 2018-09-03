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

    showToast: (toastTitle, toastLevel) => {
        dispatch({
            type : 'SHOW_TOAST',
            newToast: { title : toastTitle, level : toastLevel }
        });
    }

});

export default AllAppActions;
