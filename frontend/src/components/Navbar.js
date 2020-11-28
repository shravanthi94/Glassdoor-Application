import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signup } from '../actions/student/auth';
import glassdoor from './images/glassdoor.png';
import './CSS/navbar.css';

const Navbar = ({ isAuthenticated, signup }) => {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    signup({ name, email, password });
  };

  if (isAuthenticated) {
    return <Redirect to='/student/profile' />;
  }
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
            <Link to='/student/signin' className='header-nav-button'>
              Signin
            </Link>
            <Link to='/company' className='header-nav-link job-link'>
              Post Jobs
            </Link>
            <Link to='/companyOverview' className='header-nav-link job-link'>
              Company Overview
            </Link>
            <Link to='/admin/signin' className='header-nav-link job-link'>
              Admin?
            </Link>
          </div>
        </div>

        <h1 className='heading'> Find The Job That Fits Your Life</h1>
        <div className='container-nav'>
          <p className='legal-copy'>
            By continuing, you agree to our Terms of Use and Privacy Policy.
          </p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='name'
                id='name'
                name='name'
                value={name}
                onChange={(e) => onChange(e)}
                placeholder='Your Full Name'
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                id='email'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
                placeholder='Create account with Email'
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                id='password'
                name='password'
                value={password}
                minlength='4'
                onChange={(e) => onChange(e)}
                placeholder='Password'
                required
              />
            </div>
            <input type='submit' value='Continue with Email' />
          </form>
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

Navbar.propTypes = {
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Navbar);
