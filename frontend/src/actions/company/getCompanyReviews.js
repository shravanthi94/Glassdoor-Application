import axios from 'axios';
import configPath from '../../config';


const getCompanyReviewsDispatcher = payload => {
    console.log("Inside getCompanyReviewsDispatcher action: ", payload);
    return {
        type: "GET_COMPANY_REVIEWS",
        payload
    };
};

export const getCompanyReviews = (payload) => {

    return dispatch => {

        console.log("payload: ", payload);
        // axios.defaults.headers.common['authorization'] = localStorage.getItem('cToken');
        axios.get(configPath.api_host + '/company/review/' + payload)
            .then(response => {

                console.log("Actions: Get Company Reviews:", response);
                var reviews = response.data;

                if (response.status === 200) {
                    dispatch(getCompanyReviewsDispatcher({
                        reviews
                    })
                    );
                }
            }).catch(err => {
                console.log("error: ", err.data);

                dispatch(getCompanyReviewsDispatcher({
                    reviews: null,
                })
            );
        });
    };
};