import React from 'react';
import '../CSS/studentLandingPage.css';

const UtilityBar = () => {
  return (
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
  );
};

export default UtilityBar;
