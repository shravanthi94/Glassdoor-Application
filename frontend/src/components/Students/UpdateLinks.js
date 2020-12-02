/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import userImg from '../images/user_circle.png';
import { BACKEND_URL } from '../../helpers/constants';
import '../CSS/studentLandingPage.css';
import { uploadStudentImage } from '../../actions/student/profile';
import spinner from '../Spinner/spinner';

const UpdateLinks = ({ uploadStudentImage, history, student: { profile } }) => {
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
    console.log('onUpload: ', formData);
    uploadStudentImage(formData, history);
    setimage({ file: '', fileText: '' });
    window.location.reload();
  };

  return !profile ? (
    spinner
  ) : (
    <div className='mt-2'>
      <div class='row'>
        <div class='col-xs-6'>
          <img
            className='rounded float-left p-2 mb-4 ml-4'
            src={`${BACKEND_URL}/student/profile/view/${profile.profilePic.image}`}
            alt=''
            height='100px'
            width='100px'
          />
        </div>
        <div class='col-xs-6 mt-3 ml-2'>
          <a href='#' data-toggle='modal' data-target='#modalProfilePic'>
            Add a photo
          </a>

          {/* <!-- Modal --> */}
          <div
            class='modal fade'
            id='modalProfilePic'
            tabindex='-1'
            role='dialog'
          >
            <div class='modal-dialog' role='document'>
              <div class='modal-content'>
                <div class='modal-header'>
                  <h5 class='modal-title' id='exampleModalLabel'>
                    Modal title
                  </h5>
                  <button
                    type='button'
                    class='close'
                    data-dismiss='modal'
                  ></button>
                </div>
                <div class='modal-body'>
                  {' '}
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
                <div class='modal-footer'>
                  <button
                    type='button'
                    class='btn btn-secondary'
                    data-dismiss='modal'
                  >
                    Close
                  </button>
                  {/* <button type='button' class='btn btn-primary'>
                    Upload
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul class='list-group list-group-flush'>
        <li class='list-group-item' style={{ backgroundColor: '#EAEAEA' }}>
          <Link className='font-weight-bold text-dark' to='/student/profile'>
            Profile
          </Link>
        </li>
        <li class='list-group-item' style={{ backgroundColor: '#EAEAEA' }}>
          <Link
            className='font-weight-bold text-dark'
            to='/student/update/resume'
          >
            Resumes
          </Link>
        </li>
        <li class='list-group-item' style={{ backgroundColor: '#EAEAEA' }}>
          <Link
            className='font-weight-bold text-dark'
            to='/student/update/jobPreference'
          >
            Job Preferences
          </Link>
        </li>
        <li class='list-group-item' style={{ backgroundColor: '#EAEAEA' }}>
          <Link
            className='font-weight-bold text-dark'
            to='/student/update/demographics'
          >
            Demographics
          </Link>
        </li>
      </ul>
    </div>
  );
};

UpdateLinks.propTypes = {
  uploadStudentImage: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.studentProfile,
});

export default connect(mapStateToProps, {
  uploadStudentImage,
})(UpdateLinks);
