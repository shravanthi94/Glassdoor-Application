import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import '../CSS/studentNavbar.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/student/auth';

const Navigation = ({ logout }) => {
  const [searchData, setsearchData] = useState('');
  const [query, setquery] = useState('JOBS');

  return (
    <Fragment>
      <div className='nav-student'>
        <Link to='/' className='header-logo'>
          <img src={logo} className='logo' alt='logo-img' />
        </Link>

        <div className='input'>
          <i class='fas fa-search color fa-2x mt-1'></i>
          <input
            type='text'
            className='search-box'
            name='searchData'
            value={searchData}
            onChange={(e) => setsearchData(e.target.value)}
            placeholder='Job Title, Keywords, or Company'
            required
          />
        </div>
        <select
          className='dropdown'
          name='query'
          onChange={(e) => setquery(e.target.value)}
        >
          <option className='dropdownOptionLabel' value='JOBS'>
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
        <Link
          to={`/student/search/${searchData}/${query}`}
          className='btn-student'
        >
          Search
        </Link>
        {/* <div className='right-icons'>
          <i class='fas fa-inbox fa-2x'></i>
          <i class='far fa-user-circle fa-2x user'></i>
        </div> */}
        <i class='fas fa-inbox fa-2x' style={{ color: '#505863' }}></i>
        <div className='icon5'>
          <div className='dropdown ml-0 pl-0'>
            <button
              className='btn btn-link dropdown-toggle pl-1'
              style={{ color: '#505863' }}
              type='button'
              id='dropdownMenuButton'
              data-toggle='dropdown'
            >
              <i class='far fa-user-circle fa-2x user'></i>
              <span class='caret'></span>
            </button>
            <ul class='dropdown-menu' role='menu'>
              <li>
                <a className='dropdown-item' href='/student/profile'>
                  Home
                </a>
              </li>
              <li>
                <a className='dropdown-item' href='/' onClick={logout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
};
export default connect(null, { logout })(Navigation);
