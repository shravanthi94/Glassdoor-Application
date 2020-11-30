import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import '../CSS/overview.css';
import { getCompanyProfile } from '../../actions/company/getCompanyProfile';
// import StarRatings from 'react-star-ratings';
import Navigation from './Navigation';
import UtilityBar from './UtilityBar';

const CompanyPhotos = ({ getCompanyProfile, company }) => {
  useEffect(() => {
    getCompanyProfile('5fb2f87d828aa81479d846a1');
  }, []);

  const [image, setimage] = useState({
    file: '',
    fileText: '',
  });

  const onImageChange = (e) => {
    setimage({
      file: e.target.files[0],
      fileText: e.target.files[0].name,
    });
  };

  const onUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image.file);
    // uploadDishImage(formData, location.state.itemId);
  };

  const displayPhotos = () => {
    return company.overview.photos.map((each) => {
      return <Fragment>Hello</Fragment>;
    });
  };

  return (
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
          <div className='overview-company-name'>Hello</div>
          <table className='profile-row-one-table'>
            <td className='profile-titles-selected'>
              <div className='profile-counts'>
                <i class='fas fa-bullseye'></i>
              </div>
              <div className='profile-title'>Overview&emsp;</div>
            </td>
            <td>
              <div className='profile-counts'>4.0k</div>
              <Link
                to={{
                  pathname: '/companyReviews',
                  state: { data: company.overview._id },
                }}
              >
                <div className='profile-title'>Reviews&emsp;</div>
              </Link>
            </td>
            <td>
              <div className='profile-counts'>867</div>
              <div className='profile-title'>Jobs&emsp;</div>
            </td>
            <td>
              <div className='profile-counts'>8.4k</div>
              <Link
                to={{
                  pathname: '/companySalaries',
                  state: { data: company.overview._id },
                }}
              >
                <div className='profile-title'>Salaries&emsp;</div>
              </Link>
            </td>
            <td>
              <div className='profile-counts'>1.2k</div>
              <Link
                to={{
                  pathname: '/companyInterviews',
                  state: { data: company.overview._id },
                }}
              >
                <div className='profile-title'>Interviews&emsp;</div>
              </Link>
            </td>
            <td>
              <div className='profile-counts'>1.8k</div>
              <div className='profile-title'>Benefits&emsp;</div>
            </td>
            <td>
              <div className='profile-counts'>92</div>
              <Link
                to={{
                  pathname: '/companyPhotos',
                  state: { data: company.overview._id },
                }}
              >
                <div className='profile-title'>Photos&emsp;</div>
              </Link>
            </td>
          </table>
        </div>
        <div className='side-by-side-overview'>
          <div className='profile-row-two'>
            <div className='profile-row-two-row1'>
              <div>
                <form onSubmit={(e) => onUpload(e)}>
                  <div>
                    <input
                      type='file'
                      name='image'
                      accept='image/*'
                      onChange={(e) => onImageChange(e)}
                    />{' '}
                    <br />
                    <label htmlFor='image'>{image.fileText}</label>
                  </div>
                  <br />
                  <button type='submit' className='btn btn-primary'>
                    Add Photos
                  </button>
                </form>
              </div>
              <div className='profile-row-two-inside'>{displayPhotos()}</div>
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
                apple Locations
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
                      Apple - San Jose, CA
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
                      Apple - San Jose, CA
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
                      Apple - San Jose, CA
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
                      Apple - San Jose, CA
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
                      Apple - San Jose, CA
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
                      Apple - San Jose, CA
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
                      Apple - San Jose, CA
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
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  company: state.comStore.company,
});

export default connect(mapStateToProps, {
  getCompanyProfile,
})(CompanyPhotos);
