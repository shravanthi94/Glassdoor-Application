import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CmpNav2 from '../CmpNav2';
import StarRatings from 'react-star-ratings';
import '../../CSS/CompanyJoblistings.css';
import '../../CSS/CompanyLanding.css';
import {
  getCurrentCompanyJobs,
  getJobDetailById,
} from '../../../actions/company/companyjobpostings';
import { getCurrentCompanyProfile } from '../../../actions/company/companyprofile';
import defaultLogo from '../../images/default_logo.png';
import Pagination from 'react-js-pagination';
// to={`/company/jobs/jobdetail/${job._id}

const CompanyJobPostings = ({
  getCurrentCompanyJobs,
  companyjobs: { companyjobs, companyjob, loading },
  getCurrentCompanyProfile,
  companyprofile: { companyprofile },
  getJobDetailById,
}) => {
  useEffect(() => {
    console.log('inside useEffect');
    getCurrentCompanyJobs();
    getCurrentCompanyProfile();
  }, []);

  useEffect(() => {
    if (companyjobs.length > 0) {
      getJobDetailById(companyjobs[0]._id);
    }
  }, [companyjobs, getJobDetailById]);

  const [activePage, setactivePage] = useState(1);

  // Logic for displaying current menu items
  const indexOfLast = activePage * 5;
  const indexOfFirst = indexOfLast - 5;

  const handlePageChange = (pageNumber) => {
    setactivePage(pageNumber);
  };

  const jobDetail = (rev_id) => {
    getJobDetailById(rev_id);
  };
  return (
    <Fragment>
      <CmpNav2 />
      <div className='contentholder-Jobs-company mt-1 mb-0'>
        <div className='contentholder-Jobs-company-sub'>
          <Link to='/company/addjob' className='link-company'>
            Add a new Job ?
          </Link>
        </div>
      </div>

      <div className='container text-company mt-1' style={{ margin: '1% 10%' }}>
        <div className='row' style={{ width: '1400px' }}>
          <div className='col-12'>
            <h1>Posted Jobs</h1>
          </div>
          <div className='col-5'>
            {companyprofile && companyjobs && companyjobs.length > 0 ? (
              companyjobs.slice(indexOfFirst, indexOfLast).map((job) => (
                <Fragment>
                  <div className='card mb-3'>
                    <div className='card-body'>
                      <div>{(job.date + '').substring(0, 10)}</div>
                      <table className='overview-reviews-table-all'>
                        <tr>
                          <td style={{ verticalAlign: 'top' }}>
                            <img
                              className='overview-logo-jobs'
                              src={
                                companyprofile.logo
                                  ? require('../../../components/images/' +
                                      companyprofile.logo +
                                      '_logo.jpg').default
                                  : companyprofile.logo
                              }
                              alt=''
                            />
                            <br />
                            <h6>
                              {(companyprofile.overAllRating * 5) / 100}{' '}
                              <StarRatings
                                rating={
                                  +(companyprofile.overAllRating * 5) / 100
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
                                  <h6 className='card-title'>{job.name}</h6>
                                </td>
                                <td>
                                  <h6 className='card-title'>{job.salary}</h6>
                                </td>
                              </tr>
                              <tr className='joblisting-title-company'>
                                <td>
                                  <Link
                                    className='active'
                                    onClick={(e) => jobDetail(job._id)}
                                  >
                                    "{job.title}"
                                  </Link>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h6 className='card-title'>{job.jobType}</h6>
                                </td>
                                <td>
                                  <h6 className='card-title'>
                                    {job.city}, {job.state}
                                  </h6>
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
            <br />
            <Pagination
              itemClass='page-item'
              linkClass='page-link'
              activeClass='gd-blue'
              activeLinkClass='paginate'
              activePage={activePage}
              itemsCountPerPage={5}
              totalItemsCount={companyjobs.length}
              pageRangeDisplayed={10}
              onChange={handlePageChange}
            />
          </div>
          <div class='col-7'>
            {!companyjob && companyjobs ? (
              <Fragment>
                {/* <div class="card" style={{ width: '50rem', height: '100%' }}>
                    <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Number of applicants: {companyjobs[0].applicants.length}
                    <Link to={`/company/viewapplicants/${companyjobs[0]._id}`} className='compnay-view-button ml-5'> View Applicants</Link> </h6>
                    <hr/>
                    <table className="overview-table">
                        <tr><td>Job Title:</td><td><div>{companyjobs[0].title}</div></td><td>Street:</td><td><div>{companyjobs[0].street}</div></td></tr>
                        <tr><td>Company:</td><td><div>{companyjobs[0].name}</div></td><td>City:</td><td><div>{companyjobs[0].city}</div></td></tr>
                        <tr><td>Industry:</td><td><div>{companyjobs[0].industry}</div></td><td>State:</td><td><div>{companyjobs[0].state}</div></td></tr>
                        <tr><td>Remote:</td><td><div>{companyjobs[0].Remote}</div></td><td>In-Person:</td><td><div>{companyjobs[0].inPerson}</div></td></tr>
                    </table>
                    <br/>
                    <div className='font-weight-bold'>Description: </div> {companyjobs[0].description}
                    <br/>
                    <br/>
                    <div className='font-weight-bold'>Qualifications: </div>
                    
                        {companyjobs[0].qualifications.length >0? companyjobs[0].qualifications.map(qualification=>(
                            <ul>
                            <li>
                                {qualification}
                            </li>
                            </ul>
                        )): <p>No Qualifications mentioned</p>}
                    
                    <div className='font-weight-bold'>Responsibilities: </div>
                    {companyjobs[0].responsibilities.length >0? companyjobs[0].responsibilities.map(responsibility=>(
                            <ul>
                            <li>
                                {responsibility}
                            </li>
                            </ul>
                        )): <p>No responsibilities mentioned</p>}

                    </div>
                    </div>
                    <br /> */}
              </Fragment>
            ) : (
              <Fragment>
                <div class='card' style={{ width: '50rem', height: '100%' }}>
                  <div class='card-body'>
                    <h6 class='card-subtitle mb-2 text-muted'>
                      Number of applicants: {companyjob.applicants.length}
                      <Link
                        to={`/company/viewapplicants/${companyjob._id}`}
                        className='compnay-view-button ml-5'
                      >
                        {' '}
                        View Applicants
                      </Link>{' '}
                    </h6>
                    <hr />
                    <table className='overview-table'>
                      <tr>
                        <td>Job Title:</td>
                        <td>
                          <div className='font-weight-bold'>
                            {companyjob.title}
                          </div>
                        </td>
                        <td>Street:</td>
                        <td>
                          <div>{companyjob.street}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>Company:</td>
                        <td>
                          <div>{companyjob.name}</div>
                        </td>
                        <td>City:</td>
                        <td>
                          <div>{companyjob.city}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>Industry:</td>
                        <td>
                          <div>{companyjob.industry}</div>
                        </td>
                        <td>State:</td>
                        <td>
                          <div>{companyjob.state}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>Remote:</td>
                        <td>
                          <div>{companyjob.Remote}</div>
                        </td>
                        <td>In-Person:</td>
                        <td>
                          <div>{companyjob.inPerson}</div>
                        </td>
                      </tr>
                      <tr>
                        <td>Salary Range:</td>
                        <td>
                          <div>{companyjob.salary}</div>
                        </td>
                        <td>Job-Type:</td>
                        <td>
                          <div>{companyjob.jobType}</div>
                        </td>
                      </tr>
                    </table>
                    <br />
                    <div className='font-weight-bold'>Description: </div>{' '}
                    {companyjob.description}
                    <br />
                    <br />
                    <div className='font-weight-bold'>Qualifications: </div>
                    {companyjob.qualifications.length > 0 ? (
                      companyjob.qualifications.map((qualification) => (
                        <ul>
                          <li>{qualification}</li>
                        </ul>
                      ))
                    ) : (
                      <p>No Qualifications mentioned</p>
                    )}
                    <div className='font-weight-bold'>Responsibilities: </div>
                    {companyjob.responsibilities.length > 0 ? (
                      companyjob.responsibilities.map((responsibility) => (
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
  );
};

CompanyJobPostings.propTypes = {
  getCurrentCompanyJobs: PropTypes.func.isRequired,
  companyjobs: PropTypes.object.isRequired,
  getCurrentCompanyProfile: PropTypes.func.isRequired,
  companyprofile: PropTypes.object.isRequired,
  getJobDetailById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  companyjobs: state.companyjobs,
  companyprofile: state.companyprofile,
});

export default connect(mapStateToProps, {
  getCurrentCompanyJobs,
  getCurrentCompanyProfile,
  getJobDetailById,
})(CompanyJobPostings);
