import axios from 'axios';
import configPath from '../../config';


const appyJobDispatcher = payload => {
    console.log("Inside appyJobDispatcher action: ", payload);
    return {
        type: "APPLY_JOB",
        payload
    };
};

export const appyJob = (payload) => {

    return dispatch => {

        console.log("appyJob payload: ", payload);
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
        axios.post(configPath.api_host + '/student/jobs/company' , payload)
            .then(response => {

                console.log("Actions: Apply job:", response);
                var applyJobMsg = response.data;

                if (response.status === 200) {
                    dispatch(appyJobDispatcher({
                        applyJobMsg,
                        applyJobFlag: true
                    })
                    );
                }
            }).catch(err => {
                console.log("error: ", err.data);

                dispatch(appyJobDispatcher({
                    applyJobFlag: false,
                })
            );
        });
    };
};