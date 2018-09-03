const AllAppActions = (dispatch) => ({

    /**
     * Method to fire SET_PROFILE reducer action.
     */
    setUserProfile: (profile) => {
        dispatch({
            type : 'SET_PROFILE',
            profile : profile
        });
    }

});

export default AllAppActions;
