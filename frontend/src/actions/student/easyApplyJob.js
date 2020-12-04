import axios from 'axios';
import configPath from '../../config';


const easyApplyJobDispatcher = payload => {
    console.log("Inside easyApplyJob Dispatcher action: ", payload);
    return {
        type: "EASY_APPLY_JOB",
        payload
    };
};

export const easyApplyJob = (payload) => {

    return dispatch => {

        console.log("easyApplyJob payload: ", payload);
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
        axios.post(configPath.api_host + '/student/applications/easy/apply' , payload)
            .then(response => {

                console.log("Actions: easyApplyJobDispatcher:", response);
                var applyJobMsg = response.data;

                if (response.status === 200) {
                    dispatch(easyApplyJobDispatcher({
                        applyJobMsg,
                        applyJobFlag: true
                    })
                    );
                }
            }).catch(err => {
                console.log("error: ", err.data);

                dispatch(easyApplyJobDispatcher({
                    applyJobFlag: false,
                })
            );
        });
    };
};