/* eslint-disable array-callback-return */
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../CSS/overview.css';
import spinner from '../Spinner/spinner';
import { getCompanyProfile } from '../../actions/company/getCompanyProfile';
import { uploadCompanyPhotos } from '../../actions/student/photos';
import { BACKEND_URL } from '../../helpers/constants';
import Navigation from './Navigation';
import UtilityBar from './UtilityBar';
import jwt_decode from 'jwt-decode';

const CompanyPhotos = ({ getCompanyProfile, company }) => {
  useEffect(() => {
    getCompanyProfile(company.overview._id);
  }, [company.overview._id, getCompanyProfile]);

  const displayPhotos = () => {
    const decoded = jwt_decode(localStorage.token);
    const currentUserId = decoded.user.id.toString();
    if (company.overview.photos.length === 0) {
      return <p>No company photos to display</p>;
    }
    return company.overview.photos.map((each) => {
      if (
        each.status === 'approved' ||
        each.student.toString() === currentUserId
      ) {
        return (
          <Fragment>
            <img
              className='rounded float-left p-2'
              src={`${BACKEND_URL}/company/images/photos/${each.file}`}
              alt=''
              height='200px'
              width='200px'
            />
          </Fragment>
        );
      }
    });
  };

  return !company ? (
    spinner
  ) : (
    <Fragment>
      <div className='overview-all'>
        <Navigation />
        <UtilityBar />
        <div className='profile-row-one'>
          <img
            className='company-banner-blur'
            src={
              require('../../components/images/' +
                company.overview.logo +
                '_banner.jpg').default
            }
            alt=''
          />
          <img
            className='overview-logo'
            src={
              require('../../components/images/' +
                company.overview.logo +
                '_logo.jpg').default
            }
            alt=''
          />
          <div className='overview-company-name'>{company.overview.name}</div>
          <table className='profile-row-one-table'>
            <td>
              <div className='profile-counts'>
                <i class='fas fa-bullseye'></i>
              </div>
              <Link
                to={{
                  pathname: '/companyOverview',
                  state: { data: company.overview._id },
                }}
                style={{ textDecoration: 'none' }}
              >
                <div className='profile-title'>Overview&emsp;</div>
              </Link>
            </td>
            <td>
              <div className='profile-counts'>
                {company.overview.numberOfReviews}
              </div>
              <Link
                to={{
                  pathname: '/companyReviews',
                  state: { data: company.overview._id },
                }}
                style={{ textDecoration: 'none' }}
              >
                <div className='profile-title'>Reviews&emsp;</div>
              </Link>
            </td>
            <td>
              <div className='profile-counts'>10</div>
              <div className='profile-title'>Jobs&emsp;</div>
            </td>
            <td>
              <div className='profile-counts'>
                {company.overview.numberOfSalaries}
              </div>
              <Link
                to={{
                  pathname: '/companySalaries',
                  state: { data: company.overview._id },
                }}
                style={{ textDecoration: 'none' }}
              >
                <div className='profile-title'>Salaries&emsp;</div>
              </Link>
            </td>
            <td>
              <div className='profile-counts'>
                {company.overview.numberOfInterviews}
              </div>
              <Link
                to={{
                  pathname: '/companyInterviews',
                  state: { data: company.overview._id },
                }}
                style={{ textDecoration: 'none' }}
              >
                <div className='profile-title'>Interviews&emsp;</div>
              </Link>
            </td>
            <td>
              <div className='profile-counts'>12</div>
              <div className='profile-title'>Benefits&emsp;</div>
            </td>
            <td className='profile-titles-selected'>
              <div className='profile-counts'>6</div>
              <Link
                to={{
                  pathname: '/companyPhotos',
                  state: { data: company.overview._id },
                }}
                style={{ textDecoration: 'none' }}
              >
                <div className='profile-title'>Photos&emsp;</div>
              </Link>
            </td>
          </table>
        </div>
        <div className='side-by-side-overview'>
          <div className='profile-row-two'>
            <div className='profile-row-two-row1'>
              <div
                className='profile-row-two-inside'
                style={{ paddingLeft: '12px', width: '650px' }}
              >
                <div className='container'>
                  <div className='row'>
                    <div className='col-8'>
                      <h4>{company.overview.name} Office Photos</h4>
                    </div>
                    <div className='col-4'>
                      <Link
                        to={`/company/upload/photos/${company.overview._id}`}
                        className='btn btn-outline-primary'
                        style={{ marginLeft: '250%', color: '#1861BF' }}
                      >
                        Add Photos
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='mt-5'>{displayPhotos()}</div>
              </div>
            </div>
          </div>
          <div className='profile-row-two-column2'>
            <div className='profile-row-two-column2-row1'>
              <div
                style={{
                  fontSize: '20px',
                  marginLeft: '20px',
                  marginTop: '20px',
                }}
              >
                {company.overview.name} Locations
              </div>
              <table className='overview-locations'>
                <tr>Bengaluru (India)</tr> <br />
                <tr>Blanchardstown (Ireland)</tr> <br />
                <tr>Chandler (AZ)</tr> <br />
                <tr>Chennia (India)</tr> <br />
                <tr>Conshohocken (PA)</tr> <br />
              </table>
              <hr className='overview-hr' style={{ width: '300px' }} />
              <div className='all-locations'>See All Locations </div>
            </div>
            <div className='profile-row-two-column2-row2'>
              <div
                style={{
                  fontSize: '20px',
                  marginLeft: '20px',
                  marginTop: '20px',
                }}
              >
                {' '}
                Jobs You May Like{' '}
              </div>
              <table className='overview-jobs-like'>
                <tr>
                  <td>
                    <img
                      className='overview-logo-jobs'
                      src={
                        require('../../components/images/' +
                          company.overview.logo +
                          '_logo.jpg').default
                      }
                      alt=''
                    />
                  </td>
                  <td style={{ marginLeft: '20px' }}>
                    <tr>Software Engineer Intern</tr>
                    <tr className='overview-job-location'>
                      {company.overview.name} - San Jose, CA
                    </tr>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img
                      className='overview-logo-jobs'
                      src={
                        require('../../components/images/' +
                          company.overview.logo +
                          '_logo.jpg').default
                      }
                      alt=''
                    />
                  </td>
                  <td>
                    <tr className='overview-job-title'>Software Engineer I</tr>
                    <tr className='overview-job-location'>
                      {company.overview.name} - San Jose, CA
                    </tr>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img
                      className='overview-logo-jobs'
                      src={
                        require('../../components/images/' +
                          company.overview.logo +
                          '_logo.jpg').default
                      }
                      alt=''
                    />
                  </td>
                  <td>
                    <tr className='overview-job-title'>Software Engineer II</tr>
                    <tr className='overview-job-location'>
                      {company.overview.name} - San Jose, CA
                    </tr>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img
                      className='overview-logo-jobs'
                      src={
                        require('../../components/images/' +
                          company.overview.logo +
                          '_logo.jpg').default
                      }
                      alt=''
                    />
                  </td>
                  <td>
                    <tr className='overview-job-title'>
                      Software Engineer III
                    </tr>
                    <tr className='overview-job-location'>
                      {company.overview.name} - San Jose, CA
                    </tr>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img
                      className='overview-logo-jobs'
                      src={
                        require('../../components/images/' +
                          company.overview.logo +
                          '_logo.jpg').default
                      }
                      alt=''
                    />
                  </td>
                  <td>
                    <tr className='overview-job-title'>
                      Machine Learning Engineer{' '}
                    </tr>
                    <tr className='overview-job-location'>
                      {company.overview.name} - San Jose, CA
                    </tr>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img
                      className='overview-logo-jobs'
                      src={
                        require('../../components/images/' +
                          company.overview.logo +
                          '_logo.jpg').default
                      }
                      alt=''
                    />
                  </td>
                  <td>
                    <tr className='overview-job-title'>
                      Back End Software Engineer
                    </tr>
                    <tr className='overview-job-location'>
                      {company.overview.name} - San Jose, CA
                    </tr>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img
                      className='overview-logo-jobs'
                      src={
                        require('../../components/images/' +
                          company.overview.logo +
                          '_logo.jpg').default
                      }
                      alt=''
                    />
                  </td>
                  <td>
                    <tr className='overview-job-title'>Product Manager</tr>
                    <tr className='overview-job-location'>
                      {company.overview.name} - San Jose, CA
                    </tr>
                  </td>
                </tr>
              </table>
              <br />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

CompanyPhotos.propTypes = {
  getCompanyProfile: PropTypes.func.isRequired,
  uploadCompanyPhotos: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  company: state.comStore.company,
});

export default connect(mapStateToProps, {
  getCompanyProfile,
  uploadCompanyPhotos,
})(CompanyPhotos);
