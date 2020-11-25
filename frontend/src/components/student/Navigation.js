import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import '../CSS/studentNavbar.css';

const Navigation = () => {
  return (
    <Fragment>
      <div className='nav-student'>
        <Link to='/' className='header-logo'>
          <img src={logo} className='logo' alt='logo-img' />
        </Link>

        <div className='input'>
          <i class='fas fa-search color'></i>
          <input
            type='text'
            className='search-box'
            placeholder='Job Title, Keywords, or Company'
            required
          />
        </div>
        <select className='dropdown'>
          <option className='dropdownOptionLabel' value='Jobs'>
            Jobs
          </option>
          <option className='dropdownOptionLabel' value='Companies'>
            Companies
          </option>
          <option className='dropdownOptionLabel' value='Salaries'>
            Salaries
          </option>
          <option className='dropdownOptionLabel' value='Interviews'>
            Interviews
          </option>
        </select>
        <div className='input location'>
          <input
            type='text'
            className='search-box'
            placeholder='San Jose, CA'
          />
        </div>
        <Link to='/student/search' className='btn-student'>
          Search
        </Link>
        <div className='right-icons'>
          <i class='fas fa-inbox fa-2x'></i>
          <i class='far fa-user-circle fa-2x user'></i>
        </div>
      </div>
    </Fragment>
  );
};

export default Navigation;
