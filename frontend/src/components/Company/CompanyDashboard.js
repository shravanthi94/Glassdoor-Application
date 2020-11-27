import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types' 
import {Link, Redirect, useHistory} from 'react-router-dom'
import {connect } from 'react-redux'
import {getCurrentCompanyProfile} from '../../actions/company/companyprofile';
import CmpNav2 from './CmpNav2';
import Spinner from '../Spinner/spinner';
import { PieChart } from 'react-minimal-pie-chart';
import '../CSS/CompanyDashboard.css';
// import CompanyReviews from './CompanyReviews';

const CompanyDashboard = ({getCurrentCompanyProfile, auth, companyprofile:{companyprofile, loading}}) => {
    useEffect(()=>{
        getCurrentCompanyProfile();
    },[])

    const history = useHistory();

    const reviewsRoute = () =>{ 
        let path = `/company/reviewspage`; 
        history.push(path);
      }
    const overviewRoute =() =>{
        let path = `/companydashboard`;
        history.push(path)
    }

    const jobsRoute =()=>{
        let path = `/company/jobpostings`;
        history.push(path)
    }

    const applicantsRoute = ()=>{
        let path=`/company/applicants`;
        history.push(path)
    }

    return (
        <Fragment>
            <CmpNav2/>
            <div className="contentholder-company text-company">
            {loading  && companyprofile ===null ? <Spinner/> : 
            <div className="overview-all">
                <div className="profile-row-one-company">
                    <img className="company-banner" src={require('../../components/images/' + companyprofile.name + '_banner.jpg').default} alt="" />
                    <img className="company-logo" src={require('../../components/images/' + companyprofile.name + '_logo.jpg').default} alt="" />
                    <div className="dashboard-company-name">{companyprofile.name}{' '}
                    <Link to="/company/updateprofile" style={{ fontSize: "14px", color: "#1861BF" }}>Update Profile</Link>
                    </div>
                    <table className="profile-row-one-table">
                        <td><div className="profile-counts"><i class="fas fa-bullseye"></i></div><div className="profile-title" onClick={overviewRoute}>Overview&emsp;</div></td>
                        <td><div className="profile-counts">4.0k</div><div className="profile-title" onClick={reviewsRoute}> Reviews&emsp;</div></td>
                        <td><div className="profile-counts">867</div><div className="profile-title" onClick={jobsRoute}>Jobs&emsp;</div></td>
                        <td><div className="profile-counts">8.4k</div><div className="profile-title">Salaries&emsp;</div></td>
                        <td><div className="profile-counts">1.2k</div><div className="profile-title" onClick={applicantsRoute}>Applicants&emsp;</div></td>
                        <td><div className="profile-counts">92</div><div className="profile-title">Photos&emsp;</div></td>
                        <td><div className="profile-counts"><i class="fas fa-chart-line"></i></div><div className="profile-title">Statistics&emsp;</div></td>
                        
                    </table>
                </div> 
                <div className="side-by-side-overview">
                    <div className="profile-row-two">
                        <div className="profile-row-two-row1">
                            <div className="profile-row-two-inside">
                                <div style={{ fontSize: "20px", color: "#0D0D0D", marginBottom: "20px" }}>{companyprofile.name} Overview</div>
                                <table className="overview-table">
                                    <tr><td>Website:</td><td>{companyprofile.website}</td><td>Headquarters:</td><td>{companyprofile.headquarters}</td></tr>
                                    <tr><td>Size:</td><td>{companyprofile.size}</td><td>Founded:</td><td>{companyprofile.founded}</td></tr>
                                    <tr><td>Type:</td><td>{companyprofile.type}</td><td>Industry:</td><td>{companyprofile.industry}</td></tr>
                                    <tr><td>Revenue:</td><td>{companyprofile.revenue}</td><td>Email:</td><td>{companyprofile.email}</td></tr>
                                </table>
                                <div className="overview-description">{companyprofile.description}</div>
                                <div className="overview-mission"> <span className="overview-mission-title">Mission: </span><span>{companyprofile.mission}</span></div>
                                <hr className="overview-hr" />
                                <div style={{ marginTop: "20px", fontSize: "22px", color: "#0D0D0D" }}>Glassdoor Awards</div>
                                <br />
                                <div style={{ marginTop: "20px" }}><span style={{ fontSize: "30px", color: "#13aa41" }}><i class="fas fa-trophy"></i></span><span style={{ fontSize: "18px", color: "#404040" }}><span>&emsp;Top CEOs:</span><span style={{ color: "#1861BF" }}>&nbsp;2019 (#34)</span></span></div>
                                <hr className="overview-hr" />
                            </div>
                        </div>
                        <div className="profile-row-two-row2">
                            <div className="profile-row-three-inside">
                                <div style={{ fontSize: "22px", color: "#0D0D0D" }}>{companyprofile.name} Reviews</div>
                                <table className="overview-charts">
                                    <tr>
                                        <td><PieChart
                                            data={[
                                                { title: 'One', value: companyprofile.overAllRating, color: '#13aa41' },
                                                { title: 'Two', value: (100 - companyprofile.overAllRating), color: '#dee0e3' }
                                            ]}
                                            totalValue={100}
                                            lineWidth={25}
                                            style={{ height: '70px' }}
                                            label={({ dataEntry }) => (dataEntry.title === "One" ? dataEntry.value + "%" : "")}
                                            labelStyle={{
                                                fontSize: '22px',
                                                fontFamily: 'sans-serif',
                                                fill: '#13aa41',
                                            }}
                                            labelPosition={0}/> 
                                        </td>
                                        <td> Over All Rating</td>
                                        <td><PieChart
                                            data={[
                                                { title: 'One', value: companyprofile.recommendationRating, color: '#13aa41' },
                                                { title: 'Two', value: (100 - companyprofile.recommendationRating), color: '#dee0e3' }
                                            ]} totalValue={100}
                                            lineWidth={25}
                                            style={{ height: '70px' }}
                                            label={({ dataEntry }) => (dataEntry.title === "One" ? dataEntry.value + "%" : "")}
                                            labelStyle={{
                                                fontSize: '22px',
                                                fontFamily: 'sans-serif',
                                                fill: '#13aa41',
                                            }}
                                            labelPosition={0}/>
                                        </td>
                                        <td>Recommend to a Friend</td>
                                        <td><PieChart
                                            data={[
                                                { title: 'One', value: companyprofile.ceoApprovalRating, color: '#13aa41' },
                                                { title: 'Two', value: (100 - companyprofile.ceoApprovalRating), color: '#dee0e3' }
                                            ]} totalValue={100}
                                            lineWidth={25}
                                            style={{ height: '70px' }}
                                            label={({ dataEntry }) => (dataEntry.title === "One" ? dataEntry.value + "%" : "")}
                                            labelStyle={{
                                                fontSize: '22px',
                                                fontFamily: 'sans-serif',
                                                fill: '#13aa41',
                                            }}
                                            labelPosition={0}/>
                                        </td>
                                        <td>Approve of CEO</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="profile-row-two-column2">
                        <div className="profile-row-two-column2-row1">
                            <div style={{ fontSize: "20px", marginLeft: "20px", marginTop: "20px" }}>{companyprofile.name} Locations</div>
                                <table className="overview-locations">
                                    <tr>Bengaluru (India)</tr> <br />
                                    <tr>Blanchardstown (Ireland)</tr> <br />
                                    <tr>Chandler (AZ)</tr> <br />
                                    <tr>Chennia (India)</tr> <br />
                                    <tr>Conshohocken (PA)</tr> <br />
                                </table>
                                {/* <hr className="overview-hr" /> */}
                                <div className="all-locations">See All Locations </div>
                        </div>
                    </div>
                </div> 
            </div>
          }
        </div>
        </Fragment>
    )
}

CompanyDashboard.propTypes = {
    getCurrentCompanyProfile : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    companyprofile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    companyprofile: state.companyprofile
})

export default connect(mapStateToProps, {getCurrentCompanyProfile})(CompanyDashboard);
