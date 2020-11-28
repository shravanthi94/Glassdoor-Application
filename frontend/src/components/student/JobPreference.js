/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import Navigation from './Navigation';
import UtilityBar from './UtilityBar';
import UpdateLinks from './UpdateLinks';

const JobPreference = () => {
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
                  <h6 className='mt-5'>What job titles are you looking for?</h6>
                  <small>Job Title</small>
                  <br />
                  <input className='mt-2' type='text' name='roles' />
                  <h6 className='mt-5'>What types of jobs are you open to?</h6>
                  <small>Job Types</small>
                  <br />
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
                  <h6 className='mt-5'>What is your target salary range?</h6>
                  <input className='mt-2' type='number' />
                  <h6 className='mt-5'>
                    What industries and company sizes do you prefer?
                  </h6>
                  <select className='dropdown dropdown-wide mt-2' name='query'>
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
                  <h6 className='mt-5'>Are you willing to relocate?</h6>
                  <select className='dropdown dropdown-wide' name='query'>
                    <option className='dropdownOptionLabel' value='true'>
                      Yes
                    </option>
                    <option className='dropdownOptionLabel' value='false'>
                      No
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

export default JobPreference;
