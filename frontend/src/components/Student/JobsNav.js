
import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/studentJobsNav.css';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Navigation from './Navigation';
import UtilityBar from './UtilityBar';

const JobsNav = () => {

    const [currentTab, setCurrentTab] = React.useState('jobs');
    const handleTab = (event, newTab) => {
        setCurrentTab(newTab);
    };

    return (
        <Fragment>
            <Navigation />
            <UtilityBar />
            <div className='student-bar'>
                <ToggleButtonGroup
                    value={currentTab}
                    exclusive
                    onChange={handleTab}
                    aria-label="job search inside jobs"
                >
                    <ToggleButton value="jobs" aria-label="left aligned">
                        Jobs
                    </ToggleButton>
                    <ToggleButton value="applications" aria-label="centered">
                        Applications
                    </ToggleButton>

                </ToggleButtonGroup>
            </div>
            <div>Job cards</div>
            <div>Job details </div>
        </Fragment>
    );
};

export default JobsNav;

/*
<div className='student-bar row-fix'>
{' '}
<h3 className='item-top-nav student-grey-icon'>
  <i class='fas fa-briefcase fa-lg'></i>{' '}
  <Link to='/student/allJobs' className='h5 on-hover'>
    Jobs
  </Link>
</h3>
<h3 className='item-top-nav student-grey-icon'>
  <i class='fas fa-city fa-lg'></i>{' '}
  <Link to='/student/allJobs' className='h5 on-hover'>
    Companies
  </Link>
</h3>

</div>

*/