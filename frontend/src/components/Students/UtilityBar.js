import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/studentLandingPage.css';

const UtilityBar = () => {
  return (
    <div className='student-bar row-fix-results'>
      <div className='student-bar row-fix'>
        {' '}
        <h3 className='item-top-nav student-grey-icon'>
          <i class='fas fa-briefcase fa-lg'></i>{' '}
          <Link to='/student/allJobs' className='h5 on-hover'>
            Jobs
          </Link>
        </h3>
        <h3 className='item-top-nav student-grey-icon'>
          <i class='fas fa-city fa-lg'></i>{' '}
          <Link className='h5 on-hover'>Companies</Link>
        </h3>
        <h3 className='item-top-nav student-grey-icon'>
          <i class='fas fa-money-bill-wave fa-lg'></i>{' '}
          <Link to='/student/contributions/salaries' className='h5 on-hover'>
            Salaries
          </Link>
        </h3>
        <h3 className='item-top-nav student-grey-icon'>
          <i class='fas fa-comment-dots fa-lg'></i>{' '}
          <Link to='/student/contributions/interviews' className='h5 on-hover'>
            Interviews
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default UtilityBar;
