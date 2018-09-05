const AppStoreActions = (dispatch) => ({

    setUserProfile: (profile) => {
        dispatch({
            type : 'SET_PROFILE',
            profile : profile
        });
    },

    showToast: (toastTitle, toastLevel) => {
        const toast = { title : toastTitle, level : toastLevel };
        dispatch({
            type : 'SHOW_TOAST',
            toast: toast
        });

        setTimeout(() => {
            dispatch({
                type: 'REMOVE_TOAST',
                toast: toast
            })
        }, 2000);
    }

});

export default AppStoreActions;
