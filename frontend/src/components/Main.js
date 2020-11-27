import React, { Fragment, Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';

// Private Route
import PrivateRoute from '../components/Routing/PrivateRoute';

//Company Links
import CompanyLanding from './Company/Landing';
import CompanySignUP from './Company/CompanySignUP';
import CompanyLogin from './Company/CompanyLogin';
import CompanyDashboard from './Company/CompanyDashboard';
import CompanyDashboardReviews from './Company/CompanyReviews';
import CompanyOverview from './Student/CompanyOverview';
import CompanyEditProfile from './Company/CompanyEditProfile';
import CompanyJobPostings from './Company/JobPostings/CompanyJobPostings';
import CompanyCreateJob from './Company/JobPostings/CreatingJob';
// import CompanyOverview from './Student/CompanyOverview';

// Student Links
import Login from './Student/Login';
import StudentLandingPage from './Student/LandingPage';
import CompanyReviews from './Student/CompanyReviews';
import AddCompanyReview from './Student/AddCompanyReview';
import SearchResults from './Student/SearchResults';

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
              path='/addCompanyReview'
              component={AddCompanyReview}
            />
            <Route exact path='/student/signin' component={Login} />
            <Route
              exact
              path='/student/profile'
              component={StudentLandingPage}
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
            {/* <PrivateRoute
              exact
              path='/companydashboard'
              component={CompanyDashboard}
            /> */}
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
          </Switch>
        </Router>
      </Fragment>
    );
  }
}
//Export The Main Component
export default Main;
