import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/studentLandingPage.css';

const UpdateLinks = () => {
  return (
    <div>
      <div
        className='nav flex-column nav-pills'
        id='v-pills-tab'
        role='tablist'
      >
        <Link
          className='nav-link student-update-links'
          id='v-pills-home-tab'
          data-toggle='pill'
          href='/student/profile'
          role='tab'
        >
          Profile
        </Link>
        <a
          className='nav-link'
          id='v-pills-profile-tab'
          data-toggle='pill'
          href='/student/resume/update'
          role='tab'
        >
          Resumes
        </a>
        <a
          className='nav-link'
          id='v-pills-messages-tab'
          data-toggle='pill'
          href='/student/update/jobPreference'
          role='tab'
        >
          Job Preferences
        </a>
        <a
          className='nav-link'
          id='v-pills-settings-tab'
          data-toggle='pill'
          href='/student/update/demographics'
          role='tab'
        >
          Demographics
        </a>
      </div>
    </div>
  );
};

export default UpdateLinks;
