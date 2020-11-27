import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/studentLandingPage.css';
import userIcon from '../images/user_circle.png';
import { Card } from 'react-bootstrap';

const LandingPage = () => {
  return (
    <Fragment>
      <Navigation />
      <div className='container'>
        <div className='student-bar'>
          <div className='item'>
            <h2>Hello, what would you like to explore today?</h2>
            <div className='bar-right'>
              <strong>For Employers</strong>
              <strong>Post Jobs</strong>
            </div>
          </div>
          <div style={{ paddingBottom: '3%' }}>
            <div className='student-bar row-fix'>
              {' '}
              <h3 className='item-top-nav'>
                <i class='fas fa-briefcase fa-lg gd-color'></i> Jobs
              </h3>
              <h3 className='item-top-nav'>
                <i class='fas fa-city fa-lg gd-color'></i> Companies
              </h3>
              <h3 className='item-top-nav'>
                <i class='fas fa-money-bill-wave fa-lg gd-color'></i> Salaries
              </h3>
              <h3 className='item-top-nav'>
                <i class='fas fa-comment-dots fa-lg gd-color'></i> Interviews
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className='section'>
        <div className='profile-student-box'>
          <img
            src={userIcon}
            alt='user-icon'
            height='60px'
            width='60px'
            className='user-img pl-25'
          />
          <h3 className='name py pl-25'>Shravanthi</h3>
          <br />
          <i class='fas fa-briefcase fa-lg'></i>{' '}
          <a href='/' className='student-job-link'>
            Add Job Title
          </a>
          <br />
          <i class='fas fa-map-marker-alt fa-lg'></i>{' '}
          <a href='/' className='student-location'>
            San Jose, CA
          </a>
          <hr />
          <h4 className='job-text pl-25'>Find the job you'll love</h4>
          <br />
          <p className='info-text pl-25'>Next Step: Add Your Contact Info</p>
          <br />
          <Link to='/student/profile/update' className='profile-btn'>
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
          <br /> <br />
          <div className='student-cards'>
            <div className='card'>
              {/* <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>PayPal</Card.Title>
                  <Card.Subtitle className='mb-2 text-muted'>
                    Card Subtitle
                  </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card> */}
            </div>
            <div class='card'>
              <div class='card-body'>This is some text within a card body.</div>
            </div>
            <div className='student-card-single'>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Apple</Card.Title>
                  <Card.Subtitle className='mb-2 text-muted'>
                    Card Subtitle
                  </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Card.Link href='#'>Card Link</Card.Link>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LandingPage;
