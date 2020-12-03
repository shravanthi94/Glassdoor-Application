import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../Spinner/spinner';
import { getCurrentProfile } from '../../actions/student/profile';
import Navigation from './Navigation';
import '../CSS/studentLandingPage.css';
import userIcon from '../images/user_circle.png';
import { BACKEND_URL } from '../../helpers/constants';

const LandingPage = ({ getCurrentProfile, student: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading || !profile ? (
    spinner
  ) : (
    <Fragment>
      <Navigation />
      <div className='container-1'>
        <div className='student-bar'>
          <div className='item'>
            <h2>Hello, what would you like to explore today?</h2>
            <div className='bar-right'>
              <strong>For Employers</strong>
              <strong>Post Jobs</strong>
            </div>
          </div>
          <div>
            <div className='student-bar row-fix'>
              {' '}
              <h3 className='item-top-nav'>
                <i class='fas fa-briefcase fa-lg gd-color'></i>{' '}
                <Link to='/student/allJobs' className='h5'>
                  Jobs
                </Link>
              </h3>
              <h3 className='item-top-nav'>
                <i class='fas fa-city fa-lg gd-color'></i>{' '}
                <Link to='/student/allCompanies' className='h5'>
                  Companies
                </Link>
              </h3>
              <h3 className='item-top-nav'>
                <i class='fas fa-money-bill-wave fa-lg gd-color'></i>{' '}
                <Link to='/student/salaries' className='h5'>
                  Salaries
                </Link>
              </h3>
              <h3 className='item-top-nav'>
                <i class='fas fa-comment-dots fa-lg gd-color'></i>{' '}
                <Link to='/student/interviews' className='h5'>
                  Interviews
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className='section'>
        <div className='profile-student-box'>
          {!profile.profilePic ? (
            <img
              src={userIcon}
              alt='user-icon'
              height='60px'
              width='60px'
              className='user-img pl-25'
            />
          ) : (
            <img
              className='user-img pl-25'
              src={`${BACKEND_URL}/student/profile/view/${profile.profilePic.image}`}
              alt=''
              height='100px'
              width='120px'
            />
          )}
          <h3 className='name py pl-25'>{profile.name}</h3>
          <i class='fas fa-briefcase fa-lg mt-3'></i>{' '}
          <a href='/' className='student-job-link'>
            Add Job Title
          </a>
          <br />
          <i class='fas fa-map-marker-alt fa-lg mt-2'></i>{' '}
          <a href='/' className='student-location'>
            San Jose, CA
          </a>
          <hr />
          <h4 className='job-text pl-25'>Find the job you'll love</h4>
          <br />
          <p className='info-text pl-25'>Next Step: Add Your Contact Info</p>
          <br />
          <Link to='/student/profile' className='profile-btn'>
            Finish Your Profile
          </Link>
          <br />
          <br />
          <br />
        </div>
        <div className='right-panel'>
          <h1 className='job-location-title'>Jobs near San Jose, CA</h1>
          <span>
            Recommendations are based on your profile, job preferences, and
            activity on Glassdoor.
          </span>
          <br />
          <hr />
          <div class='container'>
            <div class='row'>
              <div class='col-sm'>
                <div class='card' style={{ width: '400px' }}>
                  <div class='card-body'>
                    <h5 class='card-title'>Apple</h5>
                    <h6 class='card-subtitle mb-2 text-muted'>Cupertino, CA</h6>
                    <p class='card-text'>
                      Apple Inc. is an American multinational technology company
                      headquartered in Cupertino, CA, that designs, computer
                      software, and online services.
                    </p>
                  </div>
                </div>
              </div>
              <div class='col-sm'>
                {' '}
                <div class='card' style={{ width: '400px' }}>
                  <div class='card-body'>
                    <h5 class='card-title'>Google</h5>
                    <h6 class='card-subtitle mb-2 text-muted'>
                      Mountain View, CA
                    </h6>
                    <p class='card-text'>
                      Google, LLC is an American multinational technology
                      company that specializes in Internet-related services and
                      products.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div class='row'>
              <div class='col-sm'>
                <div class='card' style={{ width: '400px' }}>
                  <div class='card-body'>
                    <h5 class='card-title'>PayPal</h5>
                    <h6 class='card-subtitle mb-2 text-muted'>San Jose, CA</h6>
                    <p class='card-text'>
                      PayPal Holdings, Inc. is an American company operating a
                      worldwide online payments system that supports online
                      money transfers.
                    </p>
                  </div>
                </div>
              </div>
              <div class='col-sm'>
                {' '}
                <div class='card' style={{ width: '400px' }}>
                  <div class='card-body'>
                    <h5 class='card-title'>Amazon</h5>
                    <h6 class='card-subtitle mb-2 text-muted'>Seattle, WA</h6>
                    <p class='card-text'>
                      Amazon.com, Inc., is an American multinational technology
                      company based in Seattle, WA, which focuses on e-commerce
                      and cloud computing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

LandingPage.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  student: state.studentProfile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
})(LandingPage);
