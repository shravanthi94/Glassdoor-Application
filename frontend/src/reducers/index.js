import { combineReducers } from 'redux';

import comStore from './company.reducer';
import alert from './alert';
import auth from './auth';
import companyprofile from './companyprofile';
import companyreviews from './companyreviews';
import companyjobs from './companyjobs';
import studentProfile from './studentProfile';
import studentSearch from './studentSearch';
import adminAnalytics from './adminanalytics';

const rootReducer = combineReducers({
  comStore,
  alert,
  auth,
  companyprofile,
  companyreviews,
  companyjobs,
  studentProfile,
  studentSearch,
  adminAnalytics,
});

export default rootReducer;
