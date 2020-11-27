import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../Spinner/spinner';
import Navigation from './Navigation';
import '../CSS/studentLandingPage.css';

const SearchResults = ({ match }) => {
  console.log(match.params.data, match.params.query);
  return (
    <Fragment>
      <Navigation />
      <div className='container'>
        <div className='student-bar row-fix-results'>
          <div className='student-bar row-fix'>
            {' '}
            <h3 className='item-top-nav student-grey-icon'>
              <i class='fas fa-briefcase fa-lg'></i> Jobs
            </h3>
            <h3 className='item-top-nav student-grey-icon'>
              <i class='fas fa-city fa-lg'></i> Companies
            </h3>
            <h3 className='item-top-nav student-grey-icon'>
              <i class='fas fa-money-bill-wave fa-lg'></i> Salaries
            </h3>
            <h3 className='item-top-nav student-grey-icon'>
              <i class='fas fa-comment-dots fa-lg'></i> Interviews
            </h3>
          </div>
        </div>
        <h1 className='pt-2 py-sm m-0'>
          {' '}
          Showing results for <strong class='capitalize'>Apple</strong> in{' '}
          <strong class='capitalize'>San Jose, CA </strong>
        </h1>
      </div>
    </Fragment>
  );
};

export default SearchResults;
