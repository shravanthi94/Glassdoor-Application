import React, { Fragment, Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import CompanyLanding from './Company/Landing';
import CompanySignUP from './Company/CompanySignUP';
import CompanyLogin from './Company/CompanyLogin';
import CompanyDashboard from './Company/CompanyDashboard';
import CompanyOverview from '../components/student/CompanyOverview';

// Student Links
import Login from '../components/student/Login';
import StudentLandingPage from '../components/student/LandingPage';
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
            {/* <Route exact path='/companyOverview' component={CompanyOverview} /> */}
            <Route exact path='/company' component={CompanyLanding} />
            <Route exact path='/companysignup' component={CompanySignUP} />
            <Route exact path='/companysignin' component={CompanyLogin} />
            <Route exact path='/companydashboard' component={CompanyDashboard}/>
            <Route exact path='/companyOverview' component={CompanyOverview} />
            <Route exact path='/student/signin' component={Login} />
            <Route
              exact
              path='/student/profile'
              component={StudentLandingPage}
            />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}
//Export The Main Component
export default Main;
