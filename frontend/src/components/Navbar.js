import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import glassdoor from './images/glassdoor.png';
import './CSS/navbar.css';

const Navbar = () => {
  return (
    <Fragment>
      <div className='landing'>
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
            <Link to='/company' className='header-nav-link job-link'>
              Post Jobs
            </Link>
            <Link to='/companyOverview' className='header-nav-link job-link'>
              Company Overview
            </Link>
          </div>
        </div>

        <h1 className='heading'> Find The Job That Fits Your Life</h1>
        <div className='container'>
          <p className='legal-copy'>
            By continuing, you agree to our Terms of Use and Privacy Policy.
          </p>
          <form className='form'>
            <div className='form-group'>
              <input type='name' placeholder='Your Full Name' required />
            </div>
            <div className='form-group'>
              <input
                type='email'
                placeholder='Create account with Email'
                required
              />
            </div>
            <div className='form-group'>
              <input type='password' placeholder='Password' required />
            </div>
            <input type='submit' value='Continue with Email' />
          </form>
          <br />
          <p className='hiring-note'>
            Are you Hiring?{' '}
            <Link to='/company' className='text-light'>
              Post Jobs
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
