import axios from 'axios';
import configPath from '../../config';


const deleteResumeResumeDispatcher = payload => {
    console.log("Inside resume Dispatcher action: ", payload);
    return {
        type: "DELETE_RESUME",
        payload
    };
};

export const deleteResume = (payload) => {

    return dispatch => {

        console.log("makePrimaryResume payload: ", payload);
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
        axios.post(configPath.api_host + '/student/resume/remove', payload)
            .then(response => {

                console.log("Actions: Add Company Review:", response);
                var student = response.data;

                if (response.status === 200) {
                    dispatch(deleteResumeResumeDispatcher({
                        student,
                        deleteResumeFlag: true
                    })
                    );
                }
            }).catch(err => {
                console.log("error: ", err.data);

                dispatch(deleteResumeResumeDispatcher({
                    deleteResumeFlag: false,
                })
            );
        });
    };
};