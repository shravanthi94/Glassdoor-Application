import axios from 'axios';
import configPath from '../../config';


const addReviewDispatcher = payload => {
    console.log("Inside addReviewDispatcher action: ", payload);
    return {
        type: "ADD_COMPANY_REVIEWS",
        payload
    };
};

export const addReviews = (payload) => {

    return dispatch => {

        console.log("addReview payload: ", payload);
        // axios.defaults.headers.common['authorization'] = localStorage.getItem('cToken');
        axios.post(configPath.api_host + '/company/review' , payload)
            .then(response => {

                console.log("Actions: Add Company Review:", response);
                var addMsg = response.data.msg;

                if (response.status === 200) {
                    dispatch(addReviewDispatcher({
                        addMsg,
                        addFlag: true
                    })
                    );
                }
            }).catch(err => {
                console.log("error: ", err.data);

                dispatch(addReviewDispatcher({
                    addFlag: false,
                })
            );
        });
    };
};