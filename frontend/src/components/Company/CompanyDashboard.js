import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types' 
import {Link} from 'react-router-dom'
import {connect } from 'react-redux'
import {getCurrentCompanyProfile} from '../../actions/company/companyprofile';
import CmpNav from './CmpNav';
import Spinner from '../Spinner/spinner';
import { PieChart } from 'react-minimal-pie-chart';

const CompanyDashboard = ({getCurrentCompanyProfile, auth, companyprofile:{companyprofile, loading}}) => {
    useEffect(()=>{
        getCurrentCompanyProfile();
    },[])

    return (
        <Fragment>
            <CmpNav/>
            <div className="contentholder-company text-company">
            {loading ? <Spinner/> : (companyprofile === null ? 
                       <div><h4> New to Glassdoor ? </h4> 
                       <Link to="/creatcompanyprofile"> Create Company Profile</Link>
                       </div>:
            <div className="overview-all">
                <div className="profile-row-one">
                    <img className="company-banner" src={require('../images/companyplaceholder.jpg')} alt="" />
                    <img className="overview-logo" src={require('../images/companylogo-placeholder.png')} alt="" />
                    <div className="overview-company-name">{companyprofile.name}</div>
                    <table className="profile-row-one-table">
                        <td><div className="profile-counts"><i class="fas fa-bullseye"></i></div><div className="profile-title">Overview&emsp;</div></td>
                        <td><div className="profile-counts">4.0k</div><div className="profile-title">Reviews&emsp;</div></td>
                        <td><div className="profile-counts">867</div><div className="profile-title">Jobs&emsp;</div></td>
                        <td><div className="profile-counts">8.4k</div><div className="profile-title">Salaries&emsp;</div></td>
                        <td><div className="profile-counts">1.2k</div><div className="profile-title">Interviews&emsp;</div></td>
                        <td><div className="profile-counts">1.8k</div><div className="profile-title">Benefits&emsp;</div></td>
                        <td><div className="profile-counts">92</div><div className="profile-title">Photos&emsp;</div></td>
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
                            <div style={{ fontSize: "20px", marginLeft: "20px", marginTop: "20px" }}>{companyprofile.name}'s Info</div>
                            <br/>
                            <hr/>
                            <Link style={{ fontSize: "20px", marginLeft: "20px", marginTop: "20px",}} to="/company/update"> Update Profile</Link>
                            <br/>
                            <br/>
                            <Link style={{ fontSize: "20px", marginLeft: "20px", marginTop: "20px",}} to="/company/applicantspage"> Applicants</Link>
                            <br/>
                            <br/>
                            <Link style={{ fontSize: "20px", marginLeft: "20px", marginTop: "20px",}} to="/company/reviewspage"> Reviews</Link>
                            <br/>
                            <br/>
                            <Link style={{ fontSize: "20px", marginLeft: "20px", marginTop: "20px",}} to="/company/joblistingspage"> Job Postings</Link>
                            <br/>
                            <br/>
                            <Link style={{ fontSize: "20px", marginLeft: "20px", marginTop: "20px",}} to="/company/statistics"> Statistics</Link>
                            <br/>
                            <br/>
                        </div>
                    </div>
                </div> 
            </div>
            )
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
