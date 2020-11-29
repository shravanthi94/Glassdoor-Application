import axios from 'axios';
import configPath from '../../config';


const addInterviewDispatcher = payload => {
    console.log("Inside addInterviewDispatcher action: ", payload);
    return {
        type: "ADD_COMPANY_INTERVIEW",
        payload
    };
};

export const addInterview = (payload) => {

    return dispatch => {

        console.log("addInterview payload: ", payload);
        // axios.defaults.headers.common['authorization'] = localStorage.getItem('cToken');
        axios.post(configPath.api_host + '/company/interview' , payload)
            .then(response => {

                console.log("Actions: Add Company Interview:", response);
                var addMsg = response.data.msg;

                if (response.status === 200) {
                    dispatch(addInterviewDispatcher({
                        addMsg,
                        addFlag: true
                    })
                    );
                }
            }).catch(err => {
                console.log("error: ", err.data);

                dispatch(addInterviewDispatcher({
                    addFlag: false,
                })
            );
        });
    };
};