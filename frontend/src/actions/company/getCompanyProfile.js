import axios from 'axios';
import configPath from '../../config';


const getCompanyProfileDispatcher = payload => {
    console.log("Inside updateCusProfileDispatcher action: ", payload);
    return {
        type: "GET_COMPANY_PROFILE",
        payload
    };
};

export const getCompanyProfile = (payload) => {

    return dispatch => {

        console.log("payload: ", payload);
        // axios.defaults.headers.common['authorization'] = localStorage.getItem('cToken');
        axios.get(configPath.api_host + '/company/overview/' + payload)
            .then(response => {

                console.log("Actions: Get Company Profile:", response);
                var company = response.data;

                if (response.status === 200) {
                    dispatch(getCompanyProfileDispatcher({
                        company
                    })
                    );
                }
            }).catch(err => {
                console.log("error: ", err.data);

                dispatch(getCompanyProfileDispatcher({
                    company: null,
                })
            );
        });
    };
};