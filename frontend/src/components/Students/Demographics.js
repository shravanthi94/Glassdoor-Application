/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from 'react';
import Navigation from './Navigation';
import UtilityBar from './UtilityBar';
import UpdateLinks from './UpdateLinks';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../Spinner/spinner';
import studentDemographics from '../images/student_demographics.png';
import { updateStudentDemographics } from '../../actions/student/demographics';
import { getCurrentProfile } from '../../actions/student/profile';

const Demographics = ({
  updateStudentDemographics,
  getCurrentProfile,
  profile: { profile, loading },
  history,
}) => {
  const [formData, setformData] = useState({
    ethnicity: '',
    gender: '',
    disability: '',
    vetran: false,
  });

  const { ethnicity, gender, disability, vetran } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    getCurrentProfile();

    setformData({
      ethnicity:
        loading || !profile.demographics.ethnicity
          ? ''
          : profile.demographics.ethnicity,
      gender:
        loading || !profile.demographics.gender
          ? ''
          : profile.demographics.gender,
      disability:
        loading || !profile.demographics.disability
          ? ''
          : profile.demographics.disability,
      vetran:
        loading || !profile.demographics.vetran
          ? false
          : profile.demographics.vetran,
    });
  }, [loading]);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateStudentDemographics(formData, history);
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
            <h3>Demographics</h3>
            <span class='badge badge-light'>Private</span>
            <hr />
            <div className='row'>
              <div className='col-7'>
                <h5>Help End Inequality</h5>
                <p>
                  Shine a light on inequities in the workplace. Anonymously
                  share your demographics to help pinpoint pay and diversity
                  disparities.
                </p>
                <p>
                  Providing your demographic information is optional and, if
                  provided, it will not be shared with employers. This
                  information will be collected and used in accordance with our
                  Privacy Policy.
                </p>
              </div>
              <div className='col-5'>
                <img
                  src={studentDemographics}
                  alt='img'
                  className='w-100 h-75'
                />
              </div>
            </div>
            <hr />
            <div class='container mt-3'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='mt-1'>Race/Ethinicity</h5>
                  <select
                    className='dropdown dropdown-wide'
                    name='ethnicity'
                    value={ethnicity}
                    onChange={(e) => onChange(e)}
                  >
                    <option className='dropdownOptionLabel'>Select</option>
                    <option
                      className='dropdownOptionLabel'
                      value='American Indian'
                    >
                      American Indian
                    </option>
                    <option
                      className='dropdownOptionLabel'
                      value='Alaska Native Asian'
                    >
                      Alaska Native Asian
                    </option>
                    <option
                      className='dropdownOptionLabel'
                      value='African American'
                    >
                      African American
                    </option>
                    <option
                      className='dropdownOptionLabel'
                      value='Native Hawaiian'
                    >
                      Native Hawaiian or Other Pacific Islander White
                    </option>
                  </select>

                  <h5 className='mt-5'>Gender</h5>
                  <select
                    className='dropdown dropdown-wide'
                    name='gender'
                    value={gender}
                    onChange={(e) => onChange(e)}
                  >
                    <option className='dropdownOptionLabel'>Select</option>
                    <option className='dropdownOptionLabel' value='Male'>
                      Male
                    </option>
                    <option className='dropdownOptionLabel' value='Female'>
                      Female
                    </option>
                  </select>

                  <h5 className='mt-5'>Disability</h5>
                  <select
                    className='dropdown dropdown-wide'
                    name='disability'
                    value={disability}
                    onChange={(e) => onChange(e)}
                  >
                    <option className='dropdownOptionLabel'>Select</option>
                    <option className='dropdownOptionLabel' value='Yes'>
                      Yes
                    </option>
                    <option className='dropdownOptionLabel' value='No'>
                      No
                    </option>
                  </select>

                  <h5 className='mt-5'>Vetran Status</h5>
                  <select
                    className='dropdown dropdown-wide'
                    name='vetran'
                    value={vetran}
                    onChange={(e) => onChange(e)}
                  >
                    <option className='dropdownOptionLabel'>Select</option>
                    <option className='dropdownOptionLabel' value='Yes'>
                      Yes
                    </option>
                    <option className='dropdownOptionLabel' value='No'>
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

Demographics.propTypes = {
  updateStudentDemographics: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.studentProfile,
});

export default connect(mapStateToProps, {
  updateStudentDemographics,
  getCurrentProfile,
})(Demographics);
