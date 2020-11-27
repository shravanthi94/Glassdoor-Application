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
import CompanyOverview from './student/CompanyOverview';
import CompanyEditProfile from './Company/CompanyEditProfile';
// import CompanyOverview from './Student/CompanyOverview';

// Student Links
import Login from './student/Login';
import StudentLandingPage from './student/LandingPage';
import CompanyReviews from './student/CompanyReviews';
// import Login from '../components/student/Login';

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
            <Route exact path='/student/signin' component={Login} />
            <Route
              exact
              path='/student/profile'
              component={StudentLandingPage}
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
            <PrivateRoute exact path='/company/updateprofile' component={CompanyEditProfile}/>
          </Switch>
        </Router>
      </Fragment>
    );
  }
}
//Export The Main Component
export default Main;
