import axios from 'axios';
import { setAlert } from '../alert';
import { PHOTO_SUCCESS, PHOTO_ERROR } from '../types';

export const uploadCompanyProfilePic = (formData, history) => async(
    dispatch,
) => {
    try {
        console.log('inside action formData: ', formData);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        const res = await axios.post(
            `/company/profilepic/upload`,
            formData,
            config,
        );
        console.log(res);

        dispatch(setAlert('Profile Image Uploaded', 'success'));

        dispatch({
            type: PHOTO_SUCCESS,
            payload: res.data,
        });

        history.push('/companydashboard');
    } catch (err) {
        console.log('error: ', err.data);
        // if (err) {
        //   err.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        // }

        dispatch({
            type: PHOTO_ERROR,
            payload: { msg: err },
        });
    }
};