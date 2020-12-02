import axios from 'axios';
import configPath from '../../config';


const addSalariesDispatcher = payload => {
    console.log("Inside addSalariesDispatcher action: ", payload);
    return {
        type: "ADD_COMPANY_SALARIES",
        payload
    };
};

export const addSalaries = (payload) => {

    return dispatch => {

        console.log("addSalary payload: ", payload);
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
        axios.post(configPath.api_host + '/company/salary' , payload)
            .then(response => {

                console.log("Actions: Add Company Review:", response);
                var addMsg = response.data.msg;

                if (response.status === 200) {
                    dispatch(addSalariesDispatcher({
                        addMsg,
                        addFlag: true
                    })
                    );
                }
            }).catch(err => {
                console.log("error: ", err.data);

                dispatch(addSalariesDispatcher({
                    addFlag: false,
                })
            );
        });
    };
};