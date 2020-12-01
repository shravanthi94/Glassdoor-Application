import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navigation from './Navigation';
import UtilityBar from './UtilityBar';
import UpdateLinks from './UpdateLinks';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../Spinner/spinner';
import {
  getCurrentProfile,
  updateBasicDetails,
} from '../../actions/student/profile';

const StudentProfile = ({
  updateBasicDetails,
  getCurrentProfile,
  profile: { profile, loading },
  history,
}) => {
  const [formData, setformData] = useState({
    name: '',
    email: '',
  });

  const { name, email } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    getCurrentProfile();
    setformData({
      name: loading || !profile.name ? '' : profile.name,
      email: loading || !profile.email ? '' : profile.email,
    });
  }, [getCurrentProfile, loading, profile.email, profile.name]);

  const usehistory = useHistory();

  const handleUpdate = (e) => {
    e.preventDefault();
    updateBasicDetails(formData, history);
    window.location.reload();
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
                  <h4>{profile.name}</h4>
                  {/* <button>update details</button> */}
                  {/* <!-- Button trigger modal --> */}
                  <span>
                    <button
                      type='button'
                      class='btn btn-primary'
                      data-toggle='modal'
                      data-target='#exampleModal'
                    >
                      Update profile
                    </button>
                  </span>

                  {/* <!-- Modal --> */}
                  <div
                    class='modal fade'
                    id='exampleModal'
                    tabindex='-1'
                    role='dialog'
                  >
                    <div class='modal-dialog' role='document'>
                      <div class='modal-content'>
                        <div class='modal-header'>
                          <h5 class='modal-title' id='exampleModalLabel'>
                            Update Student Details
                          </h5>
                          <button
                            type='button'
                            class='close'
                            data-dismiss='modal'
                          ></button>
                        </div>
                        <div class='modal-body'>
                          <h6 className='mt-1'>Name</h6>
                          <input
                            className='mt-1 w-50'
                            type='text'
                            name='name'
                            value={name}
                            onChange={(e) => onChange(e)}
                          />

                          <br />

                          <h6 className='mt-5'>Email</h6>
                          <input
                            className='mt-1 w-50'
                            type='text'
                            name='email'
                            value={email}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                        <div class='modal-footer'>
                          <button
                            type='button'
                            class='btn btn-secondary'
                            data-dismiss='modal'
                          >
                            Close
                          </button>
                          <button
                            type='button'
                            class='btn btn-primary'
                            onClick={(e) => handleUpdate(e)}
                          >
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

StudentProfile.propTypes = {
  updateBasicDetails: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.studentProfile,
});

export default connect(mapStateToProps, {
  updateBasicDetails,
  getCurrentProfile,
})(StudentProfile);
