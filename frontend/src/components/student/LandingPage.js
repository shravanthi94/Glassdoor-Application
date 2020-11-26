import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Navigation from './Navigation';
import '../CSS/studentLandingPage.css';
import userIcon from '../images/user_circle.png';

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
          <img
            src={userIcon}
            alt='user-icon'
            height='60px'
            width='60px'
            className='user-img pl-25'
          />
          <h3 className='name py pl-25'>Shravanthi</h3>
          <br />
          <i class='fas fa-briefcase fa-lg pl-25'></i>{' '}
          <a href='/' className='student-job-link'>
            Add Job Title
          </a>
          <br /> <br />
          <i class='fas fa-map-marker-alt fa-lg pl-25'></i>{' '}
          <a href='/' className='student-location'>
            San Jose, CA
          </a>
          <hr />
          <h4 className='job-text pl-25'>Find the job you'll love</h4>
          <p className='info-text pl-25'>Next Step: Add Your Contact Info</p>
          <br />
          <Link to='/student/profile/update' className='profile-btn'>
            Finish Your Profile
          </Link>
          <br />
          <br />
          <br />
        </div>
      </div>
    </Fragment>
  );
};

export default LandingPage;
