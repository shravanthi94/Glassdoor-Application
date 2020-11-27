import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import '../CSS/studentNavbar.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/student/auth';
import { Dropdown } from 'react-bootstrap';

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
          <i class='fas fa-search color'></i>
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
        {/* <div className='icon5'>
          <div className='dropdown'>
            <div className='material-icons' data-toggle='dropdown'>
              account_circle
            </div>
            <ul className='dropdown-menu pull-right'>
              <li>
                <a href='/customerProfile'>About me</a>
              </li>
              <li>
                <a href='/' onClick={logout}>
                  Sign Out
                </a>
              </li>
            </ul>
          </div>
        </div> */}
        <i class='fas fa-inbox fa-3x'></i>
        <Dropdown>
          <Dropdown.Toggle id='dropdown-basic' className='student-dropdown'>
            <i class='far fa-user-circle fa-2x user'></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href='/' onClick={logout}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Fragment>
  );
};

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
};
export default connect(null, { logout })(Navigation);
