import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import glassdoor from './images/glassdoor.png';
import './CSS/navbar.css';

const Navbar = () => {
  return (
    <Fragment>
      <div className='top-nav'>
        <div className='left-nav'>
          <Link to='/' className='header-nav-link'>
            <img src={glassdoor} className='logo' alt='logo-img' />
          </Link>
        </div>
        <div className='right-nav'>
          <Link to='/signin' className='header-nav-button'>
            Signin
          </Link>
          <Link to='#' className='header-nav-link job-link'>
            Post Jobs
          </Link>
          <Link to='/companyOverview' className='header-nav-link job-link'>
            Company Overview
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
