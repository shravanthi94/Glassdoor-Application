import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import UtilityBar from './UtilityBar';
import { getAllJobs, getJobDetails } from '../../actions/student/jobpostings';
import '../CSS/studentLandingPage.css';
import logo from '../images/default_logo.png';
import Pagination from 'react-js-pagination';

const JobsHomePage = ({
  getAllJobs,
  studentJobs: { jobs, job, loading },
  getJobDetails,
  match,
}) => {
  const [displayJobs, setdisplayJobs] = useState([]);

  const [sort, setsort] = useState('');
  const [rating, setrating] = useState('');
  const [jobType, setjobType] = useState('');
  const [location, setlocation] = useState('');
  const [salaryRange, setsalaryRange] = useState('');

  const [activePage, setactivePage] = useState(1);

  // Logic for displaying current menu items
  const indexOfLast = activePage * 5;
  const indexOfFirst = indexOfLast - 5;

  const handlePageChange = (pageNumber) => {
    setactivePage(pageNumber);
  };

  useEffect(() => {
    getAllJobs();
  }, [getAllJobs]);

  useEffect(() => {
    setdisplayJobs(jobs);
    if (jobs.length > 0) {
      getJobDetails(jobs[0]._id);
    }
  }, [getJobDetails, jobs]);

  // console.log('display jobs: ', displayJobs);

  const onSortChange = (e) => {
    setsort(e.target.value);
    const selectedSort = e.target.value;
    if (selectedSort === 'Oldest') {
      setdisplayJobs(
        jobs.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        }),
      );
    } else {
      setdisplayJobs(
        jobs.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        }),
      );
    }
  };

  const onRatingChange = (e) => {
    setrating(e.target.value);
    if (rating === 'Most Rated') {
      setdisplayJobs(
        jobs.sort((a, b) =>
          a.company.overAllRating > b.company.overAllRating ? 1 : -1,
        ),
      );
    } else {
      setdisplayJobs(
        jobs.sort((a, b) =>
          a.company.overAllRating > b.company.overAllRating ? -1 : 1,
        ),
      );
    }
  };

  const onTypeChange = (e) => {
    const selectedType = e.target.value;
    setjobType(e.target.value);

    if (selectedType === '') {
      setdisplayJobs(jobs);
    }
    if (selectedType === 'Full-time') {
      setdisplayJobs(jobs.filter((each) => each.jobType === selectedType));
    } else if (selectedType === 'Part-time') {
      setdisplayJobs(jobs.filter((each) => each.jobType === selectedType));
    } else if (selectedType === 'Internship') {
      setdisplayJobs(jobs.filter((each) => each.jobType === selectedType));
    }
  };

  const onLocationChange = (e) => {
    if (e.target.value === '') {
      setdisplayJobs(jobs);
    }
    setlocation(e.target.value);
    setdisplayJobs(jobs.filter((each) => each.city.includes(location)));
  };

  const onSalaryChange = (e) => {
    if (e.target.value === '') {
      setdisplayJobs(jobs);
    }
    setsalaryRange(e.target.value);
    const selectedRange = e.target.value;
    setdisplayJobs(jobs.filter((each) => each.salary === selectedRange));
  };

  const allJobsDisplay = (e) => {
    setdisplayJobs(jobs);
  };

  const jobDetail = (jobId) => {
    getJobDetails(jobId);
  };

  return (
    <Fragment>
      <Navigation />
      <UtilityBar />
      <Fragment>
        <div
          className='container text-company mt-1'
          style={{ maxWidth: '1500px' }}
        >
          <div className='row'>
            <div className='col-12 student-jobs-bar'>
              <select
                className='dropdown mr-3'
                name='sort'
                value={sort}
                onChange={(e) => onSortChange(e)}
              >
                <option className='dropdownOptionLabel' value=''>
                  Sort Date
                </option>
                <option className='dropdownOptionLabel' value='Newest'>
                  Newest
                </option>
                <option className='dropdownOptionLabel' value='Oldest'>
                  Oldest
                </option>
              </select>

              <select
                className='dropdown mr-3'
                name='rating'
                value={rating}
                onChange={(e) => onRatingChange(e)}
              >
                <option className='dropdownOptionLabel' value=''>
                  Ratings
                </option>
                <option className='dropdownOptionLabel' value='Most Rated'>
                  Most Rated
                </option>
                <option className='dropdownOptionLabel' value='Least Rated'>
                  Least Rated
                </option>
              </select>

              <select
                className='dropdown mr-3'
                name='salaryRange'
                value={salaryRange}
                onChange={(e) => onSalaryChange(e)}
              >
                <option className='dropdownOptionLabel' value=''>
                  Salary Range
                </option>
                <option className='dropdownOptionLabel' value='$50k-$100k'>
                  $50k-$100k
                </option>
                <option className='dropdownOptionLabel' value='$101k-$150k'>
                  $101k-$150k
                </option>
                <option className='dropdownOptionLabel' value='$151k-$200k'>
                  $151k-$200k
                </option>
                <option
                  className='dropdownOptionLabel'
                  value='$201k and more...'
                >
                  $201k and more...
                </option>
              </select>

              <select
                className='dropdown mr-3'
                name='jobType'
                value={jobType}
                onChange={(e) => onTypeChange(e)}
              >
                <option className='dropdownOptionLabel' value=''>
                  Job Type
                </option>
                <option className='dropdownOptionLabel' value='Full-time'>
                  Full-time
                </option>
                <option className='dropdownOptionLabel' value='Part-time'>
                  Part-time
                </option>
                <option className='dropdownOptionLabel' value='Internship'>
                  Internship
                </option>
              </select>

              <input
                type='text'
                placeholder='Search location'
                className='w-20 ml-5'
                name='location'
                value={location}
                onChange={(e) => onLocationChange(e)}
              ></input>

              <button
                className='btn btn-primary gd-blue'
                style={{ marginLeft: '3%' }}
                onClick={(e) => allJobsDisplay(e)}
              >
                All Jobs
              </button>

              <Link
                to='/student/applications'
                className='btn btn-primary gd-blue'
                style={{ marginLeft: '22%' }}
              >
                Applied Jobs
              </Link>
            </div>
            <div className='col-5 m-0'>
              {!loading && displayJobs.length > 0 ? (
                displayJobs.slice(indexOfFirst, indexOfLast).map((jobItem) => (
                  <Fragment>
                    <div className='card mb-2'>
                      <div className='card-body'>
                        <div className='joblisting-date-company '>
                          {(jobItem.date + '').substring(0, 10)}
                        </div>
                        <table className='overview-reviews-table-all'>
                          <tr>
                            <td style={{ verticalAlign: 'top' }}>
                              <img
                                className='overview-logo-jobs'
                                src={logo}
                                alt=''
                              />
                              <br />
                              <h6>
                                {(jobItem.company.overAllRating * 5) / 100}{' '}
                                <StarRatings
                                  rating={
                                    +(jobItem.company.overAllRating * 5) / 100
                                  }
                                  starDimension='20px'
                                  starSpacing='1px'
                                  starRatedColor='#0caa41'
                                  numberOfStars={1}
                                  name='rating'
                                />
                              </h6>
                            </td>
                            <td>
                              <table>
                                <tr>
                                  <td>
                                    {' '}
                                    <h6 className='card-title text-dark'>
                                      {jobItem.name}
                                    </h6>
                                  </td>
                                </tr>
                                <tr className='joblisting-title-company'>
                                  <td>
                                    <Link
                                      className='active'
                                      onClick={(e) => jobDetail(jobItem._id)}
                                    >
                                      "{jobItem.title}"
                                    </Link>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <h6
                                      style={{
                                        marginBottom: '1%',
                                        marginTop: '3%',
                                      }}
                                    >
                                      {jobItem.city}, {jobItem.state}
                                    </h6>
                                    <small>{jobItem.salary}</small>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </Fragment>
                ))
              ) : (
                <p>No Jobs posted yet</p>
              )}
              <div>
                <Pagination
                  itemClass='page-item'
                  linkClass='page-link'
                  activeClass='gd-blue'
                  activeLinkClass='paginate'
                  activePage={activePage}
                  itemsCountPerPage={5}
                  totalItemsCount={displayJobs.length}
                  pageRangeDisplayed={10}
                  onChange={handlePageChange}
                />
              </div>
            </div>
            <div class='col-7' style={{ margin: '0' }}>
              {!job ? (
                <Fragment></Fragment>
              ) : (
                <Fragment>
                  <div class='card'>
                    <div class='card-body'>
                      <h2>{job.title}</h2>
                      <h4>{job.name}</h4>
                      <table className='overview-table'>
                        <tr>
                          <td>Job Title:</td>
                          <td>
                            <div>{job.title}</div>
                          </td>
                          <td>Street:</td>
                          <td>
                            <div>{job.street}</div>
                          </td>
                        </tr>
                        <tr>
                          <td>Company:</td>
                          <td>
                            <div>{job.name}</div>
                          </td>
                          <td>City:</td>
                          <td>
                            <div>{job.city}</div>
                          </td>
                        </tr>
                        <tr>
                          <td>Industry:</td>
                          <td>
                            <div>{job.industry}</div>
                          </td>
                          <td>State:</td>
                          <td>
                            <div>{job.state}</div>
                          </td>
                        </tr>
                        <tr>
                          <td>Remote:</td>
                          <td>
                            <div>{job.Remote}</div>
                          </td>
                          <td>In-Person:</td>
                          <td>
                            <div>{job.inPerson}</div>
                          </td>
                        </tr>
                      </table>
                      <br />
                      <div className='font-weight-bold'>Description: </div>{' '}
                      {job.description}
                      <br />
                      <br />
                      <div className='font-weight-bold'>Qualifications: </div>
                      {job.qualifications.length > 0 ? (
                        job.qualifications.map((qualification) => (
                          <ul>
                            <li>{qualification}</li>
                          </ul>
                        ))
                      ) : (
                        <p>No Qualifications mentioned</p>
                      )}
                      <div className='font-weight-bold'>Responsibilities: </div>
                      {job.responsibilities.length > 0 ? (
                        job.responsibilities.map((responsibility) => (
                          <ul>
                            <li>{responsibility}</li>
                          </ul>
                        ))
                      ) : (
                        <p>No responsibilities mentioned</p>
                      )}
                    </div>
                  </div>
                  <br />
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
};

JobsHomePage.propTypes = {
  getAllJobs: PropTypes.func.isRequired,
  studentJobs: PropTypes.object.isRequired,
  getJobDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  studentJobs: state.studentJobs,
});

export default connect(mapStateToProps, { getAllJobs, getJobDetails })(
  JobsHomePage,
);
