import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/admin/auth';
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
    return <Redirect to='/admin/home' />;
  }
  return (
    <Fragment>
      <div className='landingAdmin'>
        <div className='top-nav'>
          <div className='left-nav'>
            <Link to='/' className='header-nav-link'>
              <img src={glassdoor} className='logo' alt='logo-img' />
            </Link>
            <br/>
          </div>
        </div>
        <h1 className='headingAdmin'>
          Sign In to get instant access to <br /> <br />
          <br /> <br /> stastics about companies and jobs
        </h1>
        <br />
        <div className='container' style={{marginLeft:'40%'}}>
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
            <input type='submit' value='Sign In' style={{marginLeft:'8%'}}/>
          </form>
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
