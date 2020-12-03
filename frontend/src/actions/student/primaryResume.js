import axios from 'axios';
import configPath from '../../config';


const makePrimaryResumeDispatcher = payload => {
    console.log("Inside resume Dispatcher action: ", payload);
    return {
        type: "UPDATE_PRIMARY_RESUME",
        payload
    };
};

export const primaryResume = (payload) => {

    return dispatch => {

        console.log("makePrimaryResume payload: ", payload);
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
        axios.post(configPath.api_host + '/student/resume/primary' , payload)
            .then(response => {

                console.log("Actions: Add Company Review:", response);
                var student = response.data;

                if (response.status === 200) {
                        dispatch(makePrimaryResumeDispatcher({
                            student,
                            primaryResumeFlag: true
                        })
                    );
                }
            }).catch(err => {
                console.log("error: ", err.data);

                dispatch(makePrimaryResumeDispatcher({
                    primaryResumeFlag: false,
                })
            );
        });
    };
};