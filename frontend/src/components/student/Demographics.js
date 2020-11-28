import React, { Fragment } from 'react';
import Navigation from './Navigation';
import UtilityBar from './UtilityBar';
import UpdateLinks from './UpdateLinks';
import studentDemographics from '../images/student_demographics.png';

const Demographics = () => {
  return (
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
                  <select className='dropdown dropdown-wide' name='query'>
                    <option className='dropdownOptionLabel' value='JOBS'>
                      Jobs
                    </option>
                    <option className='dropdownOptionLabel' value='Companies'>
                      Companies
                    </option>
                    <option className='dropdownOptionLabel' value='Salaries'>
                      Salaries
                    </option>
                    <option className='dropdownOptionLabel' value='Interviews'>
                      Interviews
                    </option>
                  </select>

                  <h5 className='mt-5'>Gender</h5>
                  <select className='dropdown dropdown-wide' name='query'>
                    <option className='dropdownOptionLabel' value='JOBS'>
                      Jobs
                    </option>
                    <option className='dropdownOptionLabel' value='Companies'>
                      Companies
                    </option>
                    <option className='dropdownOptionLabel' value='Salaries'>
                      Salaries
                    </option>
                    <option className='dropdownOptionLabel' value='Interviews'>
                      Interviews
                    </option>
                  </select>

                  <h5 className='mt-5'>Sexual Orientation</h5>
                  <select className='dropdown dropdown-wide' name='query'>
                    <option className='dropdownOptionLabel' value='JOBS'>
                      Jobs
                    </option>
                    <option className='dropdownOptionLabel' value='Companies'>
                      Companies
                    </option>
                    <option className='dropdownOptionLabel' value='Salaries'>
                      Salaries
                    </option>
                    <option className='dropdownOptionLabel' value='Interviews'>
                      Interviews
                    </option>
                  </select>

                  <h5 className='mt-5'>Disability</h5>
                  <select className='dropdown dropdown-wide' name='query'>
                    <option className='dropdownOptionLabel' value='JOBS'>
                      Jobs
                    </option>
                    <option className='dropdownOptionLabel' value='Companies'>
                      Companies
                    </option>
                    <option className='dropdownOptionLabel' value='Salaries'>
                      Salaries
                    </option>
                    <option className='dropdownOptionLabel' value='Interviews'>
                      Interviews
                    </option>
                  </select>

                  <h5 className='mt-5'>Vetran Status</h5>
                  <select className='dropdown dropdown-wide' name='query'>
                    <option className='dropdownOptionLabel' value='JOBS'>
                      Jobs
                    </option>
                    <option className='dropdownOptionLabel' value='Companies'>
                      Companies
                    </option>
                    <option className='dropdownOptionLabel' value='Salaries'>
                      Salaries
                    </option>
                    <option className='dropdownOptionLabel' value='Interviews'>
                      Interviews
                    </option>
                  </select>
                  <br />
                  <button className='btn btn-primary my-4'>Update</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Demographics;
