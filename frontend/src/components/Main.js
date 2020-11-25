import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import CompanyLanding from './Employer/Landing';
import CmpSignUP from './Employer/CmpSignUP';
import CompanyOverview from '../components/student/CompanyOverview';

import { history } from '../helpers/history';


//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={Navbar} />
            <Route exact path="/companyOverview" component={CompanyOverview} />
          </Switch>
        </Router>
      </div>
    );
  }
}
//Export The Main Component
export default Main;