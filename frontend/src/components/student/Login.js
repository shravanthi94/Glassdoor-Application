import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/student/auth';
import glassdoor from '../images/glassdoor.png';
import '../CSS/navbar.css';

const Login = ({ isAuthenticated, login }) => {
  const [formData, setformData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
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
            <Link to='/' className='header-nav-button'>
              Signup
            </Link>
            <Link to='/company' className='header-nav-link job-link'>
              Post Jobs
            </Link>
            <Link to='/companyOverview' className='header-nav-link job-link'>
              Company Overview
            </Link>
          </div>
        </div>
        <h1 className='heading'>
          Sign In to get instant access to <br /> <br />
          <br /> <br /> millions of salaries and reviews
        </h1>
        <br />
        <div className='container'>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='email'
                id='email'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
                placeholder='Sign In with Email'
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                id='password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
                placeholder='Password'
                required
              />
            </div>
            <input type='submit' value='Sign In' />
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
