/* eslint-disable array-callback-return */
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';
import UtilityBar from '../UtilityBar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudentContributions } from '../../../actions/student/profile';
import spinner from '../../Spinner/spinner';
import { BACKEND_URL } from '../../../helpers/constants';

const StudentPhotos = ({
  student: { contributions, loading },
  getStudentContributions,
}) => {
  useEffect(() => {
    getStudentContributions('photos');
  }, [getStudentContributions]);

  const displayEachCompanyPhotos = (photos) => {
    return photos.map((each) => {
      if (each.student.toString() === localStorage.id.toString()) {
        return (
          <Fragment>
            <div class='p-1 m-1 pl-2'>
              <img
                src={`${BACKEND_URL}/company/images/photos/${each.file}`}
                alt=''
                height='200px'
                width='200px'
              />
            </div>
          </Fragment>
        );
      }
    });
  };

  const displayPhotos = () => {
    if (contributions.length === 0) {
      return <p>No salary reviews added by you.</p>;
    }
    return contributions.map((each) => {
      return (
        <Fragment>
          <div class='card mb-3  bg-light'>
            <h5 class='card-header gd-blue' style={{ color: 'white' }}>
              {each.name}
            </h5>
            <div className='container'>
              <div className='row'>{displayEachCompanyPhotos(each.photos)}</div>
            </div>
          </div>
        </Fragment>
      );
    });
  };

  return loading ? (
    spinner
  ) : (
    <Fragment>
      <Navigation />
      <UtilityBar />
      <div class='container my-4'>
        <div class='row'>
          <div class='col-4'>
            <ul class='list-group list-group-flush'>
              <li
                class='list-group-item'
                style={{ backgroundColor: '#EAEAEA' }}
              >
                <Link
                  className='font-weight-bold text-dark'
                  to='/student/contributions/reviews'
                >
                  Reviews
                </Link>
              </li>
              <li
                class='list-group-item'
                style={{ backgroundColor: '#EAEAEA' }}
              >
                <Link
                  className='font-weight-bold text-dark'
                  to='/student/contributions/interviews'
                >
                  Interviews
                </Link>
              </li>
              <li
                class='list-group-item'
                style={{ backgroundColor: '#EAEAEA' }}
              >
                <Link
                  className='font-weight-bold text-dark'
                  to='/student/contributions/salaries'
                >
                  Salaries
                </Link>
              </li>
              <li
                class='list-group-item profile-titles-selected'
                style={{ backgroundColor: '#EAEAEA' }}
              >
                <Link
                  className='font-weight-bold text-dark'
                  to='/student/contributions/photos'
                >
                  Photos
                </Link>
              </li>
              <hr />
            </ul>
          </div>
          <div class='col-8' style={{ backgroundColor: 'white' }}>
            <h3 className='p-2'>Company photos shared by you</h3>
            <div className='container p-4'>{displayPhotos()}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

StudentPhotos.propTypes = {
  getStudentContributions: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  student: state.studentProfile,
});

export default connect(mapStateToProps, {
  getStudentContributions,
})(StudentPhotos);
