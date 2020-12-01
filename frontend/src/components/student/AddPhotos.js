import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../CSS/overview.css';
import { uploadCompanyPhotos } from '../../actions/student/photos';
import Navigation from './Navigation';
import UtilityBar from './UtilityBar';

const AddPhotos = ({ match, uploadCompanyPhotos, history }) => {
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
    uploadCompanyPhotos(formData, match.params.id, history);
    setimage({ file: '', fileText: '' });
  };

  return (
    <Fragment>
      <Navigation />
      <UtilityBar />
      <div className='side-by-side-overview' style={{ width: '100%' }}>
        <div className='profile-row-two' style={{ width: '78%' }}>
          <div
            className='profile-row-two-row1 mt-4 ml-5'
            style={{ width: '95%' }}
          >
            <div
              className='profile-row-two-inside'
              style={{ padding: '10% 40%' }}
            >
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
          </div>
        </div>

        <div
          className='profile-row-two-column2-row1 mt-4'
          style={{ width: '20%' }}
        >
          <div
            style={{
              fontSize: '20px',
              marginLeft: '20px',
              marginTop: '20px',
            }}
          >
            Photo Guidelines
          </div>
          <ul className='p-5'>
            <li>JPG, GIF, PNG, or BMP file formats only.</li> <br />
            <li>No more than 5MB per photo.</li> <br />
            <li>Only original, non-copyrighted images.</li> <br />
            <li>
              No logos, website screenshots or marketing materials. (Logos
              pictured on walls, buildings, or automobiles are OK.)
            </li>{' '}
            <br />
            <li>
              Videoconferencing photos are allowed but cannot contain employee
              names, locations, or images of minors
            </li>{' '}
            <br />
            <li>
              No portraits of an individual, incriminating photos of workplace
              violations, patients in a healthcare setting, or photos that are
              irrelevant to the employment setting (cartoons, etc.)
            </li>
            <br />
            <li>
              Photo captions must be considered appropriate in accordance with
              our guidelines
            </li>
            <br />
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

AddPhotos.propTypes = {
  uploadCompanyPhotos: PropTypes.func.isRequired,
};

export default connect(null, {
  uploadCompanyPhotos,
})(AddPhotos);
