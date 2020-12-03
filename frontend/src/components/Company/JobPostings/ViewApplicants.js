import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import CmpNav2 from '../CmpNav2'
import '../../CSS/CompanyJoblistings.css'
import '../../CSS/CompanyLanding.css'
import {getJobDetailById,getStudentDetailByEmail} from '../../../actions/company/companyjobpostings'
import  {BACKEND_URL}  from '../../../helpers/constants';
import pdf from '../../files/resume-1606883439279.pdf'

const ViewApplicants = ({
    getJobDetailById, 
    companyjobs:{companyjob, loading}, 
    getStudentDetailByEmail, 
    studentProfile:{profile},
    match}) => {
    useEffect(()=>{
        console.log(match.params.id)
        getJobDetailById(match.params.id)
        console.log("after useeffect")
    }, [])
    
    const studentDetail = (stuId) =>{ 
        getStudentDetailByEmail(stuId)
        //history.push(path);
      }
    
    let filteredapplicants = false
    if (companyjob)
    {
        filteredapplicants = companyjob.applicants.filter(applicant=>applicant.applicantStatus !== "withdraw")
        console.log ("filtered applicants is ",filteredapplicants)
    }


    return (
        <Fragment>
            <CmpNav2/>
            <div className="container text-company mt-5">
                <div className="row">
                
                        <div className="col-5">
                        {companyjob && !loading && filteredapplicants.length>0 ? filteredapplicants.map(applicant=>(
                    <Fragment>
                            <div className="card" style={{ width: '29rem', border:'1px solid #888' }}>
                                <div className="card-body">
                                    <div className="joblisting-date-company ">{(applicant.appliedDate + "").substring(0, 10)}</div>
                                    <table className="overview-reviews-table-all">
                                        <tr>
                                            <td>
                                            {/* file:///Users/harika_pradeep/Downloads/CMPE273_Fall2020/GlassDoor_App/Glassdoor-Application/frontend/src/components/files/"+applicant.student.resume} */}
                                            {/* '/Users/harika_pradeep/Downloads/CMPE273LabResume3.pdf' */}
                                                <table>
                                                    <tr><td> <h6><Link onClick={(e)=> studentDetail(applicant.email)} className="joblisting-title-company">{applicant.student.name}</Link></h6></td></tr>
                                                    <tr className="card-title"><td>"{applicant.student.email}"</td></tr>
                                                    <a href={pdf} download>Sample</a>
                                                    <tr className="card-title"><td><a href={`file:/Users/harika_pradeep/Downloads/CMPE273_Fall2020/GlassDoor_App/Glassdoor-Application/frontend/src/components/files/${applicant.resume}`} download>{applicant.resume}</a></td></tr>
                                                    <Link to={`file:../../files/${applicant.resume}`} target="_blank" download>Download</Link>
                                    
                                                    <tr><td><h6 className="card-title font-weight-bold">Application Status: {applicant.applicantStatus}</h6></td>
                                                        <td><Link to={`/updateStatus/${applicant._id}`} className='compnay-view-button ml-7'>Update Status</Link></td>
                                            
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            </Fragment>)):<div className="card"> <div className='card-body joblisting-title-company'><p>No applicants yet</p></div></div>}
                        </div>
                    
                    <div class="col-7">
                        <div class="card" style={{ width: '50rem', height: '100%' }}>
                            <div class="card-body">
                                {!profile && companyjob? <Fragment>
                                    <h6 className='joblisting-title-company'>{companyjob? companyjob.title:''} &emsp;
                                {/* <Link to='#' className='compnay-view-button ml-7'> Update Status</Link>  */}
                                </h6>
                                <hr/>
                                <div className='font-weight-bold'>Job Preference: </div>
                                {companyjob && !loading && companyjob.applicants[0] && companyjob.applicants[0].student && companyjob.applicants[0].student.jobPreference? 
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
                                {companyjob && !loading && companyjob.applicants[0] && companyjob.applicants[0].student && companyjob.applicants[0].student.demographics? 
                                <Fragment>
                                <table className="overview-table">
                                    <tr><td>Ethinicity:</td><td><div>{companyjob.applicants[0].student.demographics.ethnicity}</div></td></tr>
                                    <tr><td>Gender:</td><td><div>{companyjob.applicants[0].student.demographics.gender}</div></td></tr>
                                    <tr><td>Disability:</td><td><div>{companyjob.applicants[0].student.demographics.disability}</div></td></tr>
                                    <tr><td>Veteran:</td><td><div>{companyjob.applicants[0].student.demographics.veteran}</div></td></tr>
                                </table>
                                </Fragment>: <p>No Demographics Specified</p>}
                                </Fragment>: 
                                <Fragment> 
                                <h6 className='joblisting-title-company'>{companyjob? companyjob.title:''} &emsp;
                                <Link className='compnay-view-button ml-7'> Update Status</Link> </h6>
                                <hr/>
                                <div className='font-weight-bold'>Job Preference: </div>
                                {profile? 
                                <Fragment>
                                <table className="overview-table">
                                    <tr><td>Status:</td><td><div>{profile.jobPreference.status}</div></td></tr>
                                    <tr><td>Title:</td><td><div>{profile.jobPreference.title}</div></td></tr>
                                    <tr><td>Salary:</td><td><div>{profile.jobPreference.salary}</div></td></tr>
                                    <tr><td>Relocation:</td><td><div>{profile.jobPreference.relocation? "Yes" : "No"}</div></td></tr>
                                    <tr><td>Industry:</td><td><div>{profile.jobPreference.industry}</div></td></tr>
                                </table>
                                </Fragment> : <p> No Job Preference Mentioned </p>}
                                <hr/>
                                <div className='font-weight-bold'>Demographics: </div>
                                {profile? 
                                <Fragment>
                                <table className="overview-table">
                                    <tr><td>Ethinicity:</td><td><div>{profile.demographics.ethnicity}</div></td></tr>
                                    <tr><td>Gender:</td><td><div>{profile.demographics.gender}</div></td></tr>
                                    <tr><td>Disability:</td><td><div>{profile.demographics.disability}</div></td></tr>
                                    <tr><td>Veteran:</td><td><div>{profile.demographics.veteran}</div></td></tr>
                                </table>
                                </Fragment>: <p>No Demographics Specified</p>}</Fragment>}  
                            </div>                                   
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
               
    )
}

ViewApplicants.propTypes = {
    getJobDetailById: PropTypes.func.isRequired,
    getStudentDetailByEmail: PropTypes.func.isRequired,
    companyjobs: PropTypes.object.isRequired,
    studentProfile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    companyjobs: state.companyjobs,
    studentProfile: state.studentProfile
})


export default connect(mapStateToProps, {getJobDetailById, getStudentDetailByEmail})(ViewApplicants)
