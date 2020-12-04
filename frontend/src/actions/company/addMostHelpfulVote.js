import axios from 'axios';
import configPath from '../../config';


const addHelpfulVoteDispatcher = payload => {
    console.log("Inside addSalariesDispatcher action: ", payload);
    return {
        type: "ADD_COMPANY_REVIEW_HELPFUL_VOTE",
        payload
    };
};

export const addMostHelpfulVote = (payload) => {

    return dispatch => {

        console.log("addSalary payload: ", payload);
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
        axios.post(configPath.api_host + '/company/review/helpful' , payload)
            .then(response => {

                console.log("Actions: Add Company Review:", response.data);
                var reviews = response.data;

                if (response.status === 200) {
                    dispatch(addHelpfulVoteDispatcher({
                        reviews,
                        addHelpfulFlag: true
                    })
                    );
                }
            }).catch(err => {
                console.log("error: ", err.data);

                dispatch(addHelpfulVoteDispatcher({
                    addHelpfulFlag: false,
                })
            );
        });
    };
};