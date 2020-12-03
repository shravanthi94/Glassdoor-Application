import axios from 'axios';
import configPath from '../../config';


const resumeDispatcher = payload => {
    console.log("Inside resume Dispatcher action: ", payload);
    return {
        type: "UPLOAD_STUDENT_RESUME",
        payload
    };
};

export const resume = (payload) => {

    return dispatch => {

        console.log("resume payload: ", payload);
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
        axios.post(configPath.api_host + '/student/resume' , payload)
            .then(response => {

                console.log("Actions: Add Company Review:", response);
                var student = response.data;

                if (response.status === 200) {
                    dispatch(resumeDispatcher({
                        student,
                        uploadResumeFlag: true
                    })
                    );
                }
            }).catch(err => {
                console.log("error: ", err.data);

                dispatch(resumeDispatcher({
                    uploadResumeFlag: false,
                })
            );
        });
    };
};