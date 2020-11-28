import { combineReducers } from 'redux';

import comStore from './company.reducer';
import alert from './alert';
import auth from './auth';
import companyprofile from './companyprofile';
import companyreviews from './companyreviews';
import companyjobs from './companyjobs';
import studentSearch from './studentSearch';

const rootReducer = combineReducers({
  comStore,
  alert,
  auth,
  companyprofile,
  companyreviews,
  companyjobs,
  studentSearch,
});

export default rootReducer;
