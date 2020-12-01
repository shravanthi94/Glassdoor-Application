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
import CompanyOverview from './Students/CompanyOverview';
import CompanyEditProfile from './Company/CompanyEditProfile';
import CompanyJobPostings from './Company/JobPostings/CompanyJobPostings';
import ViewApplicants from './Company/JobPostings/ViewApplicants';
import CompanyCreateJob from './Company/JobPostings/CreatingJob';
import CompanyReplyMessage from './Company/Reviews/CompanyReviewReply';
import UpdateApplicantStatus from './Company/JobPostings/UpdateApplicantStatus';
// import ViewApplicantDetails from './Company/JobPostings/ViewApplicantDetails';

// Student Links
import Login from './Students/Login';
import StudentLandingPage from './Students/LandingPage';
import CompanyReviews from './Students/CompanyReviews';
import AddCompanyReview from './Students/AddCompanyReview';
import CompanyInterviews from './Students/CompanyInterviews';
import CompanySalaries from './Students/CompanySalaries';
import CompanyPhotos from './Students/CompanyPhotos';
import SearchResults from './Students/SearchResults';
import JobPreference from './Students/JobPreference';
import StudentProfile from './Students/StudentProfile';
import Demographics from './Students/Demographics';
import AddCompanySalary from './Students/AddCompanySalary';
import AddInterviewExp from './Students/AddInterviewExp';
import CompanySideBar from './Common/CompanySideBar';
import AddCompanyInterview from './Students/AddCompanyInterview';
import CompanyJobs from './Students/CompanyJobs';
import CompanyJobDetails from './Students/CompanyJobDetails';
import AddPhotos from './Students/AddPhotos';
// import JobsNav from './Student/JobsNav';

// Student - Contributions
import StudentReviews from './Students/contributions/StudentReviews';
import StudentSalaries from './Students/contributions/StudentSalaries';

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
              path='/companyJobDetails'
              component={CompanyJobDetails}
            />
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
            <Route exact path='/companyJobs' component={CompanyJobs} />
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
            <PrivateRoute
              exact
              path='/student/contributions/reviews'
              component={StudentReviews}
            />
            <PrivateRoute
              exact
              path='/student/contributions/salaries'
              component={StudentSalaries}
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
            <PrivateRoute
              exact
              path='/updateStatus/:id'
              component={UpdateApplicantStatus}
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
