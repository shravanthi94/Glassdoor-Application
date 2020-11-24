import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './Navbar';
import Overview from '../components/company/Overview';

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Route path='/' component={Navbar} />
        <Route exact path="/companyOverview" component={Overview} />
      </div>
    );
  }
}
//Export The Main Component
export default Main;
