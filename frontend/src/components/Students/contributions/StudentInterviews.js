import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';
import UtilityBar from '../UtilityBar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudentContributions } from '../../../actions/student/profile';
import spinner from '../../Spinner/spinner';

const StudentInterviews = ({
  student: { contributions, loading },
  getStudentContributions,
}) => {
  useEffect(() => {
    getStudentContributions('interviews');
  }, [getStudentContributions]);

  const displayEachCompanyInterview = (interviews) => {
    return interviews.map((each) => {
      if (each.student === localStorage.id) {
        return (
          <Fragment>
            <div class='card-body pb-0 mb-1'>
              <Link
                to={{
                  pathname: '/student/viewInterviews',
                  state: { data: each },
                }}
                style={{ textDecoration: 'none' }}
                className='text-dark'
              >
                <h5 class='card-title'>{each.title}</h5>
              </Link>
              <p class='card-text'>{each.description}</p>
              <p>{each.difficulty}</p>
            </div>
          </Fragment>
        );
      }
    });
  };

  const displayInterviews = () => {
    if (contributions.length === 0) {
      return <p>No interview reviews added by you.</p>;
    }
    return contributions.map((each) => {
      return (
        <Fragment>
          <div class='card mb-3  bg-light'>
            <h5 class='card-header gd-blue' style={{ color: 'white' }}>
              {each.name}
            </h5>
            {displayEachCompanyInterview(each.interview)}
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
                class='list-group-item profile-titles-selected'
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
            <h3 className='p-2'>Interview experiences shared by you</h3>
            <div className='container p-5'>{displayInterviews()}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

StudentInterviews.propTypes = {
  getStudentContributions: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  student: state.studentProfile,
});

export default connect(mapStateToProps, {
  getStudentContributions,
})(StudentInterviews);
