/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react';
import Navigation from './Navigation';
import UtilityBar from './UtilityBar';
import UpdateLinks from './UpdateLinks';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../Spinner/spinner';
import { updateStudentJobPreference } from '../../actions/student/jobPreference';
import { getCurrentProfile } from '../../actions/student/profile';

const JobPreference = ({
  updateStudentJobPreference,
  getCurrentProfile,
  profile: { profile, loading },
  history,
}) => {
  const [formData, setformData] = useState({
    status: '',
    title: '',
    salary: '',
    relocation: false,
    industry: '',
  });

  const { status, title, salary, relocation, industry } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    getCurrentProfile();
    if (!loading) {
      console.log('Here: ', profile.jobPreference.title);
    }
    setformData({
      status:
        loading || !profile.jobPreference.status
          ? ''
          : profile.jobPreference.status,
      title:
        loading || !profile.jobPreference.title
          ? ''
          : profile.jobPreference.title,
      salary:
        loading || !profile.jobPreference.salary
          ? ''
          : profile.jobPreference.salary,
      relocation:
        loading || !profile.jobPreference.relocation
          ? false
          : profile.jobPreference.relocation,
      industry:
        loading || !profile.jobPreference.industry
          ? ''
          : profile.jobPreference.industry,
    });
  }, [loading]);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateStudentJobPreference(formData, history);
  };

  return loading || !profile ? (
    spinner
  ) : (
    <Fragment>
      <Navigation />
      <UtilityBar />
      <div class='container my-4'>
        <div class='row'>
          <div class='col-4'>
            <UpdateLinks />
          </div>
          <div class='col-8'>
            <div className='container'>
              <div class='card'>
                <div class='card-body'>
                  <h3>Job Preferences</h3>
                  <p className='mt-3'>
                    Tell us what you’re looking for in a job and we’ll use this
                    information to recommend the best jobs to you. This
                    information will not be visible to employers.
                  </p>
                  <h6 className='mt-5'>Where are you in your job search?</h6>
                  <small>Select Job Search Status</small>
                  <br />
                  <select
                    className='dropdown dropdown-wide'
                    name='status'
                    value={status}
                    onChange={(e) => onChange(e)}
                  >
                    <option className='dropdownOptionLabel'>Select</option>
                    <option className='dropdownOptionLabel' value='Not Looking'>
                      Not Looking
                    </option>
                    <option
                      className='dropdownOptionLabel'
                      value='Casually Looking'
                    >
                      Casually Looking
                    </option>
                    <option
                      className='dropdownOptionLabel'
                      value='Actively Looking'
                    >
                      Actively Looking
                    </option>
                  </select>
                  <br />

                  <h6 className='mt-5'>What job titles are you looking for?</h6>
                  <small>Job Title</small>
                  <br />
                  <input
                    className='mt-2 w-50'
                    type='text'
                    name='title'
                    value={title}
                    onChange={(e) => onChange(e)}
                  />

                  <h6 className='mt-5'>What is your target salary range?</h6>
                  <small>Salary Range</small>
                  <br />
                  <input
                    className='mt-2 w-50'
                    type='number'
                    name='salary'
                    value={salary}
                    onChange={(e) => onChange(e)}
                  />

                  <h6 className='mt-5'>
                    What industries and company sizes do you prefer?
                  </h6>
                  <select
                    className='dropdown dropdown-wide mt-2'
                    name='industry'
                    value={industry}
                    onChange={(e) => onChange(e)}
                  >
                    <option className='dropdownOptionLabel'>Select</option>
                    <option className='dropdownOptionLabel' value='Education'>
                      Education
                    </option>
                    <option className='dropdownOptionLabel' value='Finance'>
                      Finance
                    </option>
                    <option className='dropdownOptionLabel' value='Government'>
                      Government
                    </option>
                    <option
                      className='dropdownOptionLabel'
                      value='Information Technology'
                    >
                      Information Technology
                    </option>
                    <option className='dropdownOptionLabel' value='Health Care'>
                      Health Care
                    </option>
                    <option
                      className='dropdownOptionLabel'
                      value='Travel & Tourism'
                    >
                      Travel & Tourism
                    </option>
                  </select>

                  <h6 className='mt-5'>Are you willing to relocate?</h6>
                  <select
                    className='dropdown dropdown-wide'
                    name='relocation'
                    value={relocation}
                    onChange={(e) => onChange(e)}
                  >
                    <option className='dropdownOptionLabel'>Select</option>
                    <option className='dropdownOptionLabel' value='true'>
                      Yes
                    </option>
                    <option className='dropdownOptionLabel' value='false'>
                      No
                    </option>
                  </select>
                  <br />

                  <button
                    onClick={(e) => handleUpdate(e)}
                    className='btn btn-primary my-4'
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

JobPreference.propTypes = {
  updateStudentJobPreference: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.studentProfile,
});

export default connect(mapStateToProps, {
  updateStudentJobPreference,
  getCurrentProfile,
})(JobPreference);
