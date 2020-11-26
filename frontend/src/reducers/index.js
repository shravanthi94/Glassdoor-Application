import { combineReducers } from 'redux';

import comStore from './company.reducer';
import alert from './alert';
import auth from './auth';
import companyprofile from './companyprofile';
import companyreviews from './companyreviews';

const rootReducer = combineReducers({
    comStore,
    alert,
    auth,
    companyprofile,
    companyreviews
});

export default rootReducer;