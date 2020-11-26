import React, { Fragment } from 'react';
// import { Link, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Navigation from './Navigation';
import '../CSS/studentLandingPage.css';

const LandingPage = () => {
  return (
    <Fragment>
      <Navigation />
      <div className='container'>
        <div className='student-bar'>
          <div className='item'>
            <h2>Hello, what would you like to explore today?</h2>
            <div className='bar-right'>
              <strong>For Employers</strong>
              <strong>Post Jobs</strong>
            </div>
          </div>
          <div className='line-break'></div>
          <div>
            <div className='student-bar row-fix'>
              {' '}
              <h3 className='item-top-nav'>
                <i class='fas fa-briefcase fa-lg gd-color'></i> Jobs
              </h3>
              <h3 className='item-top-nav'>
                <i class='fas fa-city fa-lg gd-color'></i> Companies
              </h3>
              <h3 className='item-top-nav'>
                <i class='fas fa-money-bill-wave fa-lg gd-color'></i> Salaries
              </h3>
              <h3 className='item-top-nav'>
                <i class='fas fa-comment-dots fa-lg gd-color'></i> Interviews
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className='section'>
        <div className='profile-student-box'>
          <i class='fas fa-user fa-3x'></i>
          <p>Shravanthi</p>
        </div>
      </div>
    </Fragment>
  );
};

export default LandingPage;
