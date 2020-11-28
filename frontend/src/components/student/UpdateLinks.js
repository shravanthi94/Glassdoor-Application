import React from 'react';
import { Link } from 'react-router-dom';
import userImg from '../images/user_circle.png';
import '../CSS/studentLandingPage.css';

const UpdateLinks = () => {
  return (
    <div className='mt-2'>
      <img class='rounded mb-3' src={userImg} alt='img' height='70px' />
      <ul class='list-group list-group-flush'>
        <li class='list-group-item' style={{ backgroundColor: '#EAEAEA' }}>
          <Link className='font-weight-bold text-dark' to='/student/profile'>
            Profile
          </Link>
        </li>
        <li class='list-group-item' style={{ backgroundColor: '#EAEAEA' }}>
          <Link
            className='font-weight-bold text-dark'
            to='/student/update/resume'
          >
            Resumes
          </Link>
        </li>
        <li class='list-group-item' style={{ backgroundColor: '#EAEAEA' }}>
          <Link
            className='font-weight-bold text-dark'
            to='/student/update/jobPreference'
          >
            Job Preferences
          </Link>
        </li>
        <li class='list-group-item' style={{ backgroundColor: '#EAEAEA' }}>
          <Link
            className='font-weight-bold text-dark'
            to='/student/update/demographics'
          >
            Demographics
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UpdateLinks;
