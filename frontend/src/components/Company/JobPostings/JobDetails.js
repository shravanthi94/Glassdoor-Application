import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import CmpNav2 from '../CmpNav2'
import StarRatings from 'react-star-ratings';
import '../../CSS/CompanyJoblistings.css'
import '../../CSS/CompanyLanding.css'
import {getCurrentCompanyJobs, getJobDetailById} from '../../../actions/company/companyjobpostings'
import {getCurrentCompanyProfile} from '../../../actions/company/companyprofile'

const JobDetails = ({
    getCurrentCompanyJobs, 
    companyjobs:{companyjobs, companyjob, loading}, 
    getCurrentCompanyProfile, 
    companyprofile:{companyprofile},
    getJobDetailById,
    match
}) => {
    console.log( "jobid detail",match.params.jobid)
    useEffect(()=>{
        getCurrentCompanyJobs()
        getCurrentCompanyProfile()
        getJobDetailById(match.params.jobid)
    }, [])

    return (
        <Fragment>
            <CmpNav2/>
            <div className="contentholder-Jobs-company mt-3">
                 <div className="contentholder-Jobs-company-sub">
                    <Link to='/company/addjob' className="link-company">Add a new Job ?</Link>
               </div> 
            </div>
            
             <div className="container text-company">
                <div className="row">
                    <div className="col-5">
                        {companyprofile && companyjobs && companyjobs.length>0 ? companyjobs.map(job=>(
                            <Fragment>
                            <div className="card" style={{ width: '29rem', border:'1px solid #888' }}>
                                <div className="card-body">
                                    <div className="joblisting-date-company ">{(job.date + "").substring(0, 10)}</div>
                                        <table className="overview-reviews-table-all">
                                            <tr>
                                                <td style={{ verticalAlign: "top" }}><img className="overview-logo-jobs" src={require('../../../components/images/' + companyprofile.logo + '_logo.jpg').default} alt="" /><br/>
                                                    <h6>{(companyprofile.overAllRating * 5) / 100}{' '}<StarRatings rating={+(companyprofile.overAllRating * 5) / 100} starDimension='20px' starSpacing='1px' starRatedColor='#0caa41' numberOfStars={1} name='rating' /></h6>
                                                </td>
                                                <td>
                                                    <table>
                                                        <tr><td> <h6 className="card-title">{job.name}</h6></td></tr>
                                                        <tr className="joblisting-title-company"><td><Link to={`/company/jobs/jobdetail/${job._id}`}>"{job.title}"</Link></td></tr>
                                                        <tr><td><h6 className="card-title">{job.city}, {job.state}</h6></td></tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                </Fragment>)): <p>No Jobs posted yet</p>}
            
                            </div> 
                    <div class="col-7">
                    {companyprofile && companyjob?
                    <Fragment>
                    <div class="card" style={{ width: '50rem', height: '100%' }}>
                        <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">Number of applicants: {companyjob.applicants.length}
                        <Link to='/company/viewapplicants' className='compnay-view-button ml-5'> View Applicants</Link> </h6>
                        <hr/>
                        <table className="overview-table">
                            <tr><td>Job Title:</td><td><div>{companyjob.title}</div></td><td>Street:</td><td><div>{companyjob.street}</div></td></tr>
                            <tr><td>Company:</td><td><div>{companyjob.name}</div></td><td>City:</td><td><div>{companyjob.city}</div></td></tr>
                            <tr><td>Industry:</td><td><div>{companyjob.industry}</div></td><td>State:</td><td><div>{companyjob.state}</div></td></tr>
                            <tr><td>Remote:</td><td><div>{companyjob.Remote}</div></td><td>In-Person:</td><td><div>{companyjob.inPerson}</div></td></tr>
                        </table>
                        <br/>
                        <div className='font-weight-bold'>Description: </div> {companyjob.description}
                        <br/>
                        <br/>
                        <div className='font-weight-bold'>Qualifications: </div>
                        
                            {companyjob.qualifications.length >0? companyjob.qualifications.map(qualification=>(
                                <ul>
                                <li>
                                    {qualification}
                                </li>
                                </ul>
                            )): <p>No Qualifications mentioned</p>}
                        
                        <div className='font-weight-bold'>Responsibilities: </div>
                        {companyjob.responsibilities.length >0? companyjob.responsibilities.map(responsibility=>(
                                <ul>
                                <li>
                                    {responsibility}
                                </li>
                                </ul>
                            )): <p>No responsibilities mentioned</p>}

                        </div>
                        </div>
                        <br />
                    </Fragment>:<p>No Job Detail for this post yet</p>}
                    </div>
                </div>
            </div>
    
        </Fragment>
    )
}

JobDetails.propTypes = {
    getCurrentCompanyJobs:PropTypes.func.isRequired,
    companyjobs: PropTypes.object.isRequired,
    getCurrentCompanyProfile: PropTypes.func.isRequired,
    companyprofile: PropTypes.object.isRequired,
    getJobDetailById: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    companyjobs: state.companyjobs,
    companyprofile: state.companyprofile
})


export default connect(mapStateToProps, {getCurrentCompanyJobs, getCurrentCompanyProfile, getJobDetailById})(JobDetails)