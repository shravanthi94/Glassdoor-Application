import { combineReducers } from 'redux';

import comStore from './company.reducer';
import alert from './alert';
import auth from './auth';
import companyprofile from './companyprofile';
import companyreviews from './companyreviews';
import companyjobs from './companyjobs';
import studentProfile from './studentProfile';
import studentSearch from './studentSearch';
import studentJobs from './studentJobs';
import image from './image';
import adminAnalytics from './adminanalytics';
import adminReviewsFilter from './adminReviewsFilter';
import adminCompanyDetails from './adminCompanyDetails';
import adminImagesFilter from './adminImagesFilter';
import studentApplications from './studentApplications';

const rootReducer = combineReducers({
    comStore,
    alert,
    auth,
    companyprofile,
    companyreviews,
    companyjobs,
    studentProfile,
    studentSearch,
    studentApplications,
    studentJobs,
    image,
    adminAnalytics,
    adminReviewsFilter,
    adminCompanyDetails,
    adminImagesFilter,
});

export default rootReducer;