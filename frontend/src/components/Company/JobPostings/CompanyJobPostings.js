import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import CmpNav2 from '../CmpNav2'
import StarRatings from 'react-star-ratings';
import '../../CSS/CompanyJoblistings.css'
import '../../CSS/CompanyLanding.css'
import {getCurrentCompanyJobs} from '../../../actions/company/companyjobpostings'
import {getCurrentCompanyProfile} from '../../../actions/company/companyprofile'

const CompanyJobPostings = ({
    getCurrentCompanyJobs, 
    companyjobs:{companyjobs, loading}, 
    getCurrentCompanyProfile, 
    companyprofile:{companyprofile}}) => {
    useEffect(()=>{
        getCurrentCompanyJobs()
        getCurrentCompanyProfile()
    }, [])

    // const history = useHistory();

    // const jobDetail = (rev_id) =>{ 
    //     let path = `/company/jobs/jobdetail/${rev_id}`; 
    //     history.push(path);
    //   }
    return (
        <Fragment>
            <CmpNav2/>
            <div className="contentholder-Jobs-company mt-3">
                 <div className="contentholder-Jobs-company-sub">
                    <Link to='/company/addjob' className="link-company">Add a new Job ?</Link>
               </div> 
            </div>
            
             <div className="container text-company ml-5">
                <div className="row">
                    <div className="col-5">
                        {companyprofile && companyjobs && companyjobs.length>0 ? companyjobs.map(job=>(
                            <Fragment>
                            <div className="card" style={{ width: '29rem', border:'1px solid' }}>
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
                    2 nd
                    </div>
                </div>
            </div>
    
        </Fragment>
    )
}

CompanyJobPostings.propTypes = {
    getCurrentCompanyJobs:PropTypes.func.isRequired,
    companyjobs: PropTypes.object.isRequired,
    getCurrentCompanyProfile: PropTypes.func.isRequired,
    companyprofile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    companyjobs: state.companyjobs,
    companyprofile: state.companyprofile
})

export default connect(mapStateToProps, {getCurrentCompanyJobs, getCurrentCompanyProfile})(CompanyJobPostings)
