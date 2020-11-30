import axios from 'axios';
import { setAlert } from '../alert';
import { PHOTO_SUCCESS, PHOTO_ERROR } from '../types';

export const uploadCompanyPhotos = (formData, id, history) => async (
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
      `/company/images/photos/${id}`,
      formData,
      config,
    );
    console.log(res);

    dispatch(setAlert('Item Image Uploaded', 'success'));

    dispatch({
      type: PHOTO_SUCCESS,
      payload: res.data,
    });

    history.push({ pathname: '/companyPhotos', state: { company_id: id } });
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
