import axios from 'axios';
import configPath from '../../config';


const getCompanyJobsDispatcher = payload => {
    console.log("Inside getCompanyJobsDispatcher action: ", payload);
    return {
        type: "GET_COMPANY_JOBS",
        payload
    };
};

export const getCompanyJobs = (payload) => {

    return dispatch => {

        console.log("payload: ", payload);
        // axios.defaults.headers.common['authorization'] = localStorage.getItem('cToken');
        axios.get(configPath.api_host + '/company/job/' + payload)
            .then(response => {

                console.log("Actions: Get Company Jobs:", response);
                var jobs = response.data;

                if (response.status === 200) {
                    dispatch(getCompanyJobsDispatcher({
                        jobs
                    })
                    );
                }
            }).catch(err => {
                console.log("error: ", err.data);

                dispatch(getCompanyJobsDispatcher({
                    reviews: null,
                })
            );
        });
    };
};