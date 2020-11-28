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
          <div class='col-8'>Write your content here (Form details)</div>
        </div>
      </div>
    </Fragment>
  );
};

export default JobPreference;
