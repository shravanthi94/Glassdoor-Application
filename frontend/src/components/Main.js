import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './Navbar';
import EmployerLanding from './Employer/Landing';

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Route exact path='/' component={Navbar} />
        <Route exact path='/company' component={EmployerLanding} />
      </div>
    );
  }
}
//Export The Main Component
export default Main;
