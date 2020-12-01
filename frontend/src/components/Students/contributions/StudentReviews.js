import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';
import UtilityBar from '../UtilityBar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudentContributions } from '../../../actions/student/profile';
import spinner from '../../Spinner/spinner';

const StudentReviews = ({
  student: { contributions, loading },
  getStudentContributions,
}) => {
  useEffect(() => {
    getStudentContributions('reviews');
  }, [getStudentContributions]);

  const displayReviews = () => {
    if (contributions.length === 0) {
      return <p>No reviews added by you.</p>;
    }
    return contributions.map((review) => {
      return (
        <Fragment>
          <div class='card mb-3  bg-light'>
            <h5 class='card-header gd-blue' style={{ color: 'white' }}>
              {review.company.name}
            </h5>
            <div class='card-body pb-0 mb-1'>
              <h5 class='card-title'>{review.headline}</h5>
              <p class='card-text'>{review.comment}</p>
              <p>{review.approvalStatus}</p>
            </div>

            <ul class='list-group list-group-flush'>
              <li class='list-group-item text-success pl-1 pb-0 ml-1 mb-0'>
                <h6 className='text-dark'>
                  <i class='fas fa-list-ul'></i> PROS
                </h6>
                <p>{review.pros}</p>
              </li>
              <li class='list-group-item text-danger pl-1 pb-0 ml-1 mb-0'>
                <h6 className='text-dark'>
                  <i class='fas fa-list-ul'></i> CONS
                </h6>
                <p>{review.cons}</p>
              </li>
            </ul>
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
                class='list-group-item profile-titles-selected'
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
                class='list-group-item'
                style={{ backgroundColor: '#EAEAEA' }}
              >
                <Link
                  className='font-weight-bold text-dark'
                  to='/student/contributions/photos'
                >
                  Photos
                </Link>
              </li>
            </ul>
          </div>
          <div class='col-8' style={{ backgroundColor: 'white' }}>
            <h3 className='p-2'>Reviews given by you</h3>
            <div className='container p-5'>{displayReviews()}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

StudentReviews.propTypes = {
  getStudentContributions: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  student: state.studentProfile,
});

export default connect(mapStateToProps, {
  getStudentContributions,
})(StudentReviews);
