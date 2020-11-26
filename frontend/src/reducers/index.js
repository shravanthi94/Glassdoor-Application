import { combineReducers } from 'redux';

import comStore from './company.reducer';
import alert from './alert';
import auth from './auth';
import companyprofile from './companyprofile';

const rootReducer = combineReducers({
    comStore,
    alert,
    auth,
    companyprofile
});

export default rootReducer;