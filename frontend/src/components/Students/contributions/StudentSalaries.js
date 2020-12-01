import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';
import UtilityBar from '../UtilityBar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getStudentContributions,
  clearResults,
} from '../../../actions/student/profile';
import spinner from '../../Spinner/spinner';

const StudentSalaries = ({
  student: { contributions, loading },
  getStudentContributions,
  clearResults,
}) => {
  useEffect(() => {
    clearResults();
    getStudentContributions('salaries');
  }, [clearResults, getStudentContributions]);

  const displayEachCompanySalary = (salaries) => {
    // if (interviews.student.toString() === localStorage.id.toString()) {
    return salaries.map((each) => {
      return (
        <Fragment>
          <div class='card-body pb-0 mb-1'>
            <h5 class='card-title'>{each.title}</h5>
            <p class='card-text'>{each.description}</p>
            <p>{each.difficulty}</p>
          </div>
        </Fragment>
      );
    });
    // }
  };

  const displaySalaries = () => {
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
            {displayEachCompanySalary(each.salary)}
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
                class='list-group-item profile-titles-selected'
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
            <h3 className='p-2'>Salaries given by you</h3>
            <div className='container p-5'>{displaySalaries()}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

StudentSalaries.propTypes = {
  getStudentContributions: PropTypes.func.isRequired,
  clearResults: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  student: state.studentProfile,
});

export default connect(mapStateToProps, {
  getStudentContributions,
  clearResults,
})(StudentSalaries);
