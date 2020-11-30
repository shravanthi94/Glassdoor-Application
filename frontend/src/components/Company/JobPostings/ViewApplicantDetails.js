import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import CmpNav2 from '../CmpNav2'
import '../../CSS/CompanyJoblistings.css'
import '../../CSS/CompanyLanding.css'
import {getJobDetailById} from '../../../actions/company/companyjobpostings'


const ViewApplicantDetails = ({getJobDetailById, companyjobs:{companyjob, loading}, match}) => {

    useEffect(()=>{
        getJobDetailById(match.params.id)
    }, [])

    const applicantDetail = (applicant_id) =>{ 
        getJobDetailById(applicant_id)
      }

    return (
        <Fragment>
            <CmpNav2/>
            <div className="contentholder-Jobs-company mt-3">
                 {/* <div className="contentholder-Jobs-company-sub">
                    <Link to='/company/addjob' className="link-company">Add a new Job ?</Link>
               </div>  */}
            </div>
            
             <div className="container text-company mt-1">
                <div className="row">
                    <div className="col-5">
                        {companyjob && !loading && companyjob.applicants.length>0 ? companyjob.applicants.map(applicant=>(
                            <Fragment>
                            <div className="card" style={{ width: '29rem', border:'1px solid #888' }}>
                                <div className="card-body">
                                    <div className="joblisting-date-company ">{(applicant.appliedDate + "").substring(0, 10)}</div>
                                        <table className="overview-reviews-table-all">
                                            <tr>
                                                {/* <td style={{ verticalAlign: "top" }}><img className="overview-logo-jobs" src={require('../../../components/images/' + companyprofile.logo + '_logo.jpg').default} alt="" /><br/>
                                                    <h6>{(companyprofile.overAllRating * 5) / 100}{' '}<StarRatings rating={+(companyprofile.overAllRating * 5) / 100} starDimension='20px' starSpacing='1px' starRatedColor='#0caa41' numberOfStars={1} name='rating' /></h6>
                                                </td> */}
                                                <td>
                                                    <table>
                                                        <tr><td> <h6 className="joblisting-title-company"><Link className='active' onClick={(e)=> applicantDetail(companyjob._id)}>{applicant.student.name}</Link></h6></td></tr>
                                                        <tr className="card-title"><td>"{applicant.student.email}"</td></tr>
                                                        <tr><td><h6 className="card-title font-weight-bold">Application Status: {applicant.applicantStatus}</h6></td></tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                </Fragment>)): <p>No Jobs posted yet</p>}
            
                            </div>
                    <div class="col-7">
                    {companyjob?
                    <Fragment>
                    <div class="card" style={{ width: '50rem', height: '100%' }}>
                        <div class="card-body">
                        <h6 className='joblisting-title-company'>{companyjob? companyjob.title:''} &emsp;
                                <Link to='#' className='compnay-view-button ml-7'> Update Status</Link> </h6>
                                <hr/>
                                <div className='font-weight-bold'>Job Preference: </div>
                                {companyjob && !loading && companyjob.applicants[0].student.jobPreference? 
                                <Fragment>
                                <table className="overview-table">
                                    <tr><td>Status:</td><td><div>{companyjob.applicants[0].student.jobPreference.status}</div></td></tr>
                                    <tr><td>Title:</td><td><div>{companyjob.applicants[0].student.jobPreference.title}</div></td></tr>
                                    <tr><td>Salary:</td><td><div>{companyjob.applicants[0].student.jobPreference.salary}</div></td></tr>
                                    <tr><td>Relocation:</td><td><div>{companyjob.applicants[0].student.jobPreference.relocation? "Yes" : "No"}</div></td></tr>
                                    <tr><td>Industry:</td><td><div>{companyjob.applicants[0].student.jobPreference.industry}</div></td></tr>
                                </table>
                                </Fragment> : <p> No Job Preference Mentioned </p>}
                                <hr/>
                                <div className='font-weight-bold'>Demographics: </div>
                                {companyjob && !loading && companyjob.applicants[0].student.demographics? 
                                <Fragment>
                                <table className="overview-table">
                                    <tr><td>Ethinicity:</td><td><div>{companyjob.applicants[0].student.demographics.ethnicity}</div></td></tr>
                                    <tr><td>Gender:</td><td><div>{companyjob.applicants[0].student.demographics.gender}</div></td></tr>
                                    <tr><td>Disability:</td><td><div>{companyjob.applicants[0].student.demographics.disability}</div></td></tr>
                                    <tr><td>Veteran:</td><td><div>{companyjob.applicants[0].student.demographics.veteran}</div></td></tr>
                                </table>
                                </Fragment>: <p>No Demographics Specified</p>}
                

                        </div>
                    </div>
                    <br />
                    </Fragment>:''}
                    </div>
                </div>
            </div>
    
        </Fragment>
    )
}

ViewApplicantDetails.propTypes = {
    getJobDetailById: PropTypes.func.isRequired,

}
const mapStateToProps = state =>({
    companyjobs: state.companyjobs
})

export default connect(mapStateToProps, {getJobDetailById})(ViewApplicantDetails)
