import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../Spinner/spinner';
import Navigation from './Navigation';
import UtilityBar from './UtilityBar';
import { getAllJobs, getJobDetails } from '../../actions/student/jobpostings';
// import {getJobDetailById} from '../../actions/company/companyjobpostings';
import '../CSS/studentLandingPage.css';
import Alert from '../Alert';
import Pagination from 'react-js-pagination';

const JobsHomePage = ({getAllJobs, studentJobs:{jobs, job, loading}, getJobDetails, match}) => {
    useState(()=>{
        getAllJobs()
    }, [])

    const jobDetail = (jobId) =>{ 
        getJobDetails(jobId)
      }
    return (
        <Fragment>
            <Navigation/>
            <UtilityBar/>
            <Fragment>
            {/* {require('../images' + job.company.logo + '_logo.jpg').default} */}
             <div className="container text-company mt-1">
                 <div className="row">
                     <div className="col-12 bg-light ml-5">
                     <select
          className='dropdown mr-3 p-1'
          name='query'
        //   onChange={(e) => setquery(e.target.value)}
        >
          <option className='dropdownOptionLabel'>Sort Date</option>
          <option className='dropdownOptionLabel' value='Newest'>
            Newest 
          </option>
          <option className='dropdownOptionLabel' value='Oldest'>
            Oldest
          </option>
        </select>

        <select
          className='dropdown mr-3 p-1'
          name='query'
        //   onChange={(e) => setquery(e.target.value)}
        >
          <option className='dropdownOptionLabel'>Ratings</option>
          <option className='dropdownOptionLabel' value='Most Rated'>
            Most Rated
          </option>
          <option className='dropdownOptionLabel' value='Least Rated'>
          Least Rated
          </option>
        </select>

        <select
          className='dropdown mr-3 p-1' 
          name='query'
        //   onChange={(e) => setquery(e.target.value)}
        >
          <option className='dropdownOptionLabel'>Salary Range</option>
          <option className='dropdownOptionLabel' value='$50k-$100k'>
            $50k-$100k
          </option>
          <option className='dropdownOptionLabel' value='$101k-$150k'>
            $101k-$150k
          </option>
          <option className='dropdownOptionLabel' value='$151k-$200k'>
          $151k-$200k
          </option>
          <option className='dropdownOptionLabel' value='$201k and more...'>
          $201k and more...
          </option>
        </select>

        <input type='text' placeholder="Location" className="mt-2 w-20 p-1">
        </input>

        <select
          className='dropdown mr-3 p-1'
          name='query'
        //   onChange={(e) => setquery(e.target.value)}
        >
          <option className='dropdownOptionLabel'>Job Type</option>
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
        <Link to="#" className='btn btn-primary gd-blue' style={{marginLeft:"15%"}}>Applied Jobs</Link>
                     </div>
                 </div>
                <div className="row">
                    <div className="col-5">
                        {!loading && jobs.length>0 ? jobs.map(jobItem=>(
                            <Fragment>
                            <div className="card" style={{ width: '29rem', border:'1px solid #888' }}>
                                <div className="card-body">
                                    <div className="joblisting-date-company ">{(jobItem.date + "").substring(0, 10)}</div>
                                        <table className="overview-reviews-table-all">
                                            <tr>
                                                <td style={{ verticalAlign: "top" }}><img className="overview-logo-jobs" src='#' alt="" /><br/>
                                                    <h6>{(jobItem.company.overAllRating * 5) / 100}{' '}<StarRatings rating={+(jobItem.company.overAllRating * 5) / 100} starDimension='20px' starSpacing='1px' starRatedColor='#0caa41' numberOfStars={1} name='rating' /></h6>
                                                </td>
                                                <td>
                                                    <table>
                                                        <tr><td> <h6 className="card-title">{jobItem.name}</h6></td><td><h6 className='card-title'>{jobItem.salary}</h6></td></tr>
                                                        <tr className="joblisting-title-company"><td><Link className='active' onClick={(e)=> jobDetail(jobItem._id)}>"{jobItem.title}"</Link></td></tr>
                                                        <tr><td><h6 className="card-title">{jobItem.city}, {jobItem.state}</h6></td></tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                </Fragment>)): <p>No Jobs posted yet</p>}
            
                            </div>
                    <div class="col-7">
                    {!job?
                <Fragment>
                
                </Fragment>:
                    <Fragment>
                    <div class="card" style={{ width: '50rem', height: '100%' }}>
                        <div class="card-body">
    
                        <table className="overview-table">
                            <tr><td>Job Title:</td><td><div>{job.title}</div></td><td>Street:</td><td><div>{job.street}</div></td></tr>
                            <tr><td>Company:</td><td><div>{job.name}</div></td><td>City:</td><td><div>{job.city}</div></td></tr>
                            <tr><td>Industry:</td><td><div>{job.industry}</div></td><td>State:</td><td><div>{job.state}</div></td></tr>
                            <tr><td>Remote:</td><td><div>{job.Remote}</div></td><td>In-Person:</td><td><div>{job.inPerson}</div></td></tr>
                        </table>
                        <br/>
                        <div className='font-weight-bold'>Description: </div> {job.description}
                        <br/>
                        <br/>
                        <div className='font-weight-bold'>Qualifications: </div>
                        
                            {job.qualifications.length >0? job.qualifications.map(qualification=>(
                                <ul>
                                <li>
                                    {qualification}
                                </li>
                                </ul>
                            )): <p>No Qualifications mentioned</p>}
                        
                        <div className='font-weight-bold'>Responsibilities: </div>
                        {job.responsibilities.length >0? job.responsibilities.map(responsibility=>(
                                <ul>
                                <li>
                                    {responsibility}
                                </li>
                                </ul>
                            )): <p>No responsibilities mentioned</p>}

                        </div>
                        </div>
                        <br />
                    </Fragment>
                    }
                    </div>
                </div>
            </div>
    
        </Fragment>
        </Fragment>
    )
}

JobsHomePage.propTypes = {
    getAllJobs: PropTypes.func.isRequired,
    studentJobs: PropTypes.object.isRequired,
    getJobDetails: PropTypes.func.isRequired,
}

const mapStateToProps = state =>({
    studentJobs: state.studentJobs
})

export default connect(mapStateToProps, {getAllJobs, getJobDetails})(JobsHomePage)
