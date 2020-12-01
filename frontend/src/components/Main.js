import React, { Fragment, Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';

// Private Route
import PrivateRoute from '../components/Routing/PrivateRoute';

// Admin Links
import AdminLogin from './Admin/Login';
import AdminLanding from './Admin/ReviewsPerDay';
import FilterReviews from './Admin/FilterReviews';
import CompanySearch from './Admin/CompanySearch';
import CompanyAverageRating from './Admin/CompanyAverageRating';
import MostReviewedCompany from './Admin/MostReviewedCompany';
import TopStudentReviewers from './Admin/TopStudentReviewers';
import MostViewedCompanies from './Admin/MostViewedCompanies';
import TopCeo from './Admin/TopCeo';
import CompanyDetailsReviews from './Admin/CompanyDetailsReviews';
import CompanyDetailsStastics from './Admin/CompanyDetailsStastics';

//Company Links
import CompanyLanding from './Company/Landing';
import CompanySignUP from './Company/CompanySignUP';
import CompanyLogin from './Company/CompanyLogin';
import CompanyDashboard from './Company/CompanyDashboard';
import CompanyDashboardReviews from './Company/Reviews/CompanyReviews';
import CompanyOverview from './Student/CompanyOverview';
import CompanyEditProfile from './Company/CompanyEditProfile';
import CompanyJobPostings from './Company/JobPostings/CompanyJobPostings';
import ViewApplicants from './Company/JobPostings/ViewApplicants';
import CompanyCreateJob from './Company/JobPostings/CreatingJob';
import CompanyReplyMessage from './Company/Reviews/CompanyReviewReply';
import UpdateApplicantStatus from './Company/JobPostings/UpdateApplicantStatus';
// import ViewApplicantDetails from './Company/JobPostings/ViewApplicantDetails';

// Student Links
import Login from './Student/Login';
import StudentLandingPage from './Student/LandingPage';
import CompanyReviews from './Student/CompanyReviews';
import AddCompanyReview from './Student/AddCompanyReview';
import CompanyInterviews from './Student/CompanyInterviews';
import CompanySalaries from './Student/CompanySalaries';
import CompanyPhotos from './Student/CompanyPhotos';
import SearchResults from './Student/SearchResults';
import JobPreference from './Student/JobPreference';
import StudentProfile from './Student/StudentProfile';
import Demographics from './Student/Demographics';
import AddCompanySalary from './Student/AddCompanySalary';
import AddInterviewExp from './Student/AddInterviewExp';
import CompanySideBar from './Common/CompanySideBar';
import AddCompanyInterview from './Student/AddCompanyInterview';
import AddPhotos from './Student/AddPhotos';
// import JobsNav from './Student/JobsNav';

import setAuthToken from '../helpers/setAuthToken';
import { history } from '../helpers/history';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <Fragment>
        {/*Render Different Component based on Route*/}
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={Navbar} />
            <Route exact path='/company' component={CompanyLanding} />
            <Route exact path='/companysignup' component={CompanySignUP} />
            <Route exact path='/companysignin' component={CompanyLogin} />
            <Route exact path='/companyOverview' component={CompanyOverview} />
            <Route exact path='/companyReviews' component={CompanyReviews} />
            <Route
              exact
              path='/companyInterviews'
              component={CompanyInterviews}
            />
            <Route exact path='/companySalaries' component={CompanySalaries} />
            <Route exact path='/companyPhotos' component={CompanyPhotos} />
            <Route
              exact
              path='/company/upload/photos/:id'
              component={AddPhotos}
            />
            <Route
              exact
              path='/addCompanySalary'
              component={AddCompanySalary}
            />
            <Route exact path='/addInterviewExp' component={AddInterviewExp} />
            <Route exact path='/companySideBar' component={CompanySideBar} />
            <Route
              exact
              path='/addCompanyInterview'
              component={AddCompanyInterview}
            />

            <Route
              exact
              path='/addCompanyReview'
              component={AddCompanyReview}
            />
            <Route exact path='/student/signin' component={Login} />
            <Route
              exact
              path='/student/landing'
              component={StudentLandingPage}
            />
            <PrivateRoute
              exact
              path='/student/profile'
              component={StudentProfile}
            />
            <PrivateRoute
              exact
              path='/student/update/jobPreference'
              component={JobPreference}
            />
            <PrivateRoute
              exact
              path='/student/update/demographics'
              component={Demographics}
            />
            {/* <PrivateRoute exact path='/student/jobs' component={JobsNav} /> */}
            <PrivateRoute
              exact
              path='/companydashboard'
              component={CompanyDashboard}
            />
            <PrivateRoute
              exact
              path='/company/reviewspage'
              component={CompanyDashboardReviews}
            />
            <PrivateRoute
              exact
              path='/company/updateprofile'
              component={CompanyEditProfile}
            />
            <PrivateRoute
              exact
              path='/company/jobpostings'
              component={CompanyJobPostings}
            />
            <PrivateRoute
              exact
              path='/company/addjob'
              component={CompanyCreateJob}
            />
            <PrivateRoute
              exact
              path='/student/search/:data/:query'
              component={SearchResults}
            />
            <PrivateRoute
              exact
              path='/companydashboard'
              component={CompanyDashboard}
            />
            {/* <PrivateRoute */}
            <PrivateRoute
              exact
              path='/company/viewapplicants/:id'
              component={ViewApplicants}
            />
            <PrivateRoute
              exact
              path='/company/reviewspage'
              component={CompanyDashboardReviews}
            />
            <PrivateRoute
              exact
              path='/company/updateprofile'
              component={CompanyEditProfile}
            />
            <PrivateRoute
              exact
              path='/company/jobpostings'
              component={CompanyJobPostings}
            />
            <PrivateRoute
              exact
              path='/company/addjob'
              component={CompanyCreateJob}
            />
            <PrivateRoute
              exact
              path='/company/reply/review/:id'
              component={CompanyReplyMessage}
            />
            {/* <PrivateRoute exact path='/company/viewapplicantdetails/:id' component={ViewApplicantDetails}/> */}
            <PrivateRoute
              exact
              path='/company/reply/review/:id'
              component={CompanyReplyMessage}
            />
            <PrivateRoute exact path='/updateStatus/:id' component={UpdateApplicantStatus}
            />

            {/* Admin Routes */}
            <Route exact path='/admin/signin' component={AdminLogin} />
            <Route exact path='/admin/reviewsPerDay' component={AdminLanding} />
            <Route exact path='/admin/reviews' component={FilterReviews} />
            <Route
              exact
              path='/admin/companyAverageRating'
              component={CompanyAverageRating}
            />
            <Route
              exact
              path='/admin/mostReviewedCompany'
              component={MostReviewedCompany}
            />
            <Route
              exact
              path='/admin/topStudentReviewers'
              component={TopStudentReviewers}
            />
            <Route exact path='/admin/topCeo' component={TopCeo} />
            <Route
              exact
              path='/admin/mostViewedCompanies'
              component={MostViewedCompanies}
            />
            <Route
              exact
              path='/admin/companySearch'
              component={CompanySearch}
            />
            <Route
              exact
              path='/admin/companySearchResult/:data/:query'
              component={SearchResults}
            />
            <Route
              exact
              path='/admin/companyDetails/*'
              component={CompanyDetailsReviews}
            />
            <Route
              exact
              path='/admin/companyStastics/*'
              component={CompanyDetailsStastics}
            />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}
//Export The Main Component
export default Main;
