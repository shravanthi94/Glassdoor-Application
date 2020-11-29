import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import '../CSS/adminNavbar.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/admin/auth';

const Navigation = ({ logout }) => {
  const [searchData, setsearchData] = useState('');
  const [query, setquery] = useState('JOBS');
  
  return (
    <Fragment>
      <div className='nav-student'>
          <img src={logo} className='logo' alt='logo-img' />

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

        <Link
          to={`/admin/companySearchResult/${searchData}/${query}`}
          className='btn-student'
        >
          Search
        </Link>
        &emsp; &emsp;

        <i class='fas fa-inbox fa-2x' style={{ color: '#505863' }}></i>

        <div className='icon5' >
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
                <a className='dropdown-item' href='/admin/reviewsPerDay'>
                  Analytics Dashboard
                </a>
              </li>
              <li>
                <a className='dropdown-item' href='/admin/reviews'>
                  Approve Reviews
                </a>
              </li>
              <li>
                <a className='dropdown-item' href='/admin/photos'>
                  Approve Photos
                </a>
              </li>
              <li>
                <a className='dropdown-item' href='/admin/companySearch'>
                  Company Search
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

export default connect(null, { logout })(Navigation);
