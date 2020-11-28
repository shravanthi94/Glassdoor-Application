import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/salaries.css';
import { getCompanyReviews } from '../../actions/company/getCompanyReviews';
import { Redirect } from 'react-router';
import Navigation from './Navigation';

class CompanySalaries extends Component {

    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            isRedirect: false,
            redirectPath: "",
            company_id: this.props.location.state.company_id,
            data: ""
        }

        this.redirectHandler = this.redirectHandler.bind(this);
    }

    componentDidMount() {
        // this.props.getCompanyReviews(this.state.company_id);
    }

    redirectHandler = (e) => {
        console.log("redirect value: ", e);
        var path = "";
        var data = "";

        if (e === "overview") {
            path = "/companyOverview"
            data = this.state.company_id
        } else if (e === "add-reviews") {
            path = "/addCompanyReview"
            data = {
                company_id: this.state.company_id,
                logo: this.props.company.overview.logo,
                company_name: this.props.company.overview.name
            }
        } else if (e === "interviews") {
            path = "/companyInterviews"
            data = this.state.company_id
        }
        else if (e == "reviews") {
            path = "/companyReviews"
        }
        else if (e == "salaries") {
            path = "/companySalaries"
        }

        this.setState({
            isRedirect: true,
            redirectPath: path,
            data: data
        })
    }


    render() {
        var company_name = ""
        if (this.props.company) {
            company_name = this.props.company.overview.name;
        }
        var redirectVar = "";

        if (this.state.isRedirect) {
            redirectVar = <Redirect to={{ pathname: this.state.redirectPath, state: { data: this.state.data } }} />
        }
        return (
            <div>
                {redirectVar}
                { (this.props.company) ?
                    <div className="overview-all">
                        {/* <div style={{ backgroundColor: "#13aa41", height: "150px" }}> Search bar </div> */}
                        <Navigation />
                        <div className="profile-row-one">
                            <img className="company-banner-blur" src={require('../../components/images/' + this.props.company.overview.logo + '_banner.jpg').default} alt="" />
                            <img className="overview-logo" src={require('../../components/images/' + this.props.company.overview.logo + '_logo.jpg').default} alt="" />
                            <div className="overview-company-name">{company_name}</div>
                            <table className="profile-row-one-table">
                                <td><div className="profile-counts"><i class="fas fa-bullseye"></i></div><div className="profile-title" onClick={() => this.redirectHandler("overview")}>Overview&emsp;</div></td>
                                <td ><div className="profile-counts">4.0k</div><div className="profile-title" onClick={() => this.redirectHandler("reviews")}>Reviews&emsp;</div></td>
                                <td><div className="profile-counts">867</div><div className="profile-title">Jobs&emsp;</div></td>
                                <td className="profile-titles-selected"><div className="profile-counts">8.4k</div><div className="profile-title" onClick={() => this.redirectHandler("salaries")}>Salaries&emsp;</div></td>
                                <td><div className="profile-counts">1.2k</div><div className="profile-title" onClick={() => this.redirectHandler("interviews")}>Interviews&emsp;</div></td>
                                <td><div className="profile-counts">1.8k</div><div className="profile-title">Benefits&emsp;</div></td>
                                <td><div className="profile-counts">92</div><div className="profile-title">Photos&emsp;</div></td>
                            </table>
                            <div className="profile-add-button-position"><div className="overview-profile-add-button" onClick={() => this.redirectHandler("add-reviews")}><i class="fa fa-plus"></i> &nbsp;Add Salary</div></div>
                        </div>
                        <div className="side-by-side-overview">
                            <div className="profile-row-two">
                                <div className="profile-row-two-row1">

                                    <div className="profile-row-two-inside">
                                        <div style={{ fontSize: "22px", color: "#0D0D0D" }}>{company_name} Salaries</div>

                                        <div style={{ fontSize: "15px", color: "#505863", marginTop: "15px" }}>How much do PayPal employees make? Glassdoor has salaries, wages, tips, bonuses, and hourly pay based upon employee reports and estimates.</div>
                                        <div style={{ fontSize: "18px", color: "#0D0D0D", marginTop: "15px" }}>Find {company_name} Salaries by Job Title</div>
                                        <div style={{ fontSize: "15px", color: "#505863", marginTop: "15px" }}> Many PayPal employees have shared their salaries on Glassdoor. Select your job title and find out how much you could make at PayPal.</div>

                               

                                        <hr className="overview-hr" />

                                        <form></form>

                                        {(this.props.company.overview.salary && this.props.company.overview.salary !== 0) ?

                                            this.props.company.overview.salary.map(salary => (
                                                <table>
                                                       <tr><td className="company-salary-job-title">{salary.jobTitle}</td></tr>
                                                    <tr>
                                                        <td> 
                                                            <tr className="company-salary-job-details-row">  
                                                                <td><tr className="company-salary-job-details">{salary.avgTotalPay}</tr><tr className="company-salary-job-details-title">Avg. Total Pay/yr</tr></td>  
                                                                <td><tr className="company-salary-job-details">{salary.baseSalary}</tr><tr className="company-salary-job-details-title">Base Pay/yr</tr></td> 
                                                                <td><tr className="company-salary-job-details">{salary.bonuses}</tr><tr className="company-salary-job-details-title">Additional Pay/yr</tr></td> 
                                                                <td><tr className="company-salary-job-details-full">Full Pay Details<div className="company-salary-arrow"><i class="fa fa-angle-right"></i></div></tr><tr className="company-salary-job-details-title">Based on more salaries</tr></td>  
                                                            </tr>  
                                                        </td>
                                                    </tr>
                                              
                                                    <hr className="overview-hr" />
                                                </table>
                                            )) : <div> No Reviews Yets</div>
                                        }
                                        {(this.props.company.reviews && this.props.company.reviews.length !== 0) ? <div className="overview-see-all-reviews">See All Salaries </div> : ""}
                                    </div>
                                </div>
                            </div>

                            <div className="profile-row-two-column2">
                                <div className="profile-row-two-column2-row1">
                                    <div style={{ fontSize: "20px", marginLeft: "20px", marginTop: "20px" }}>{company_name} Locations</div>
                                    <table className="overview-locations">
                                        <tr>Bengaluru (India)</tr> <br />
                                        <tr>Blanchardstown (Ireland)</tr> <br />
                                        <tr>Chandler (AZ)</tr> <br />
                                        <tr>Chennia (India)</tr> <br />
                                        <tr>Conshohocken (PA)</tr> <br />
                                    </table>
                                    <hr className="overview-hr" style={{ width: "300px" }} />
                                    <div className="all-locations">See All Locations </div>
                                </div>
                                <div className="profile-row-two-column2-row2">
                                    <div style={{ fontSize: "20px", marginLeft: "20px", marginTop: "20px" }}> Jobs You May Like </div>
                                    <table className="overview-jobs-like">
                                        <tr><td><img className="overview-logo-jobs" src={require('../../components/images/' + this.props.company.overview.logo + '_logo.jpg').default} alt="" /></td><td><tr className="overview-job-title">Software Engineer Intern</tr><tr className="overview-job-location">{company_name} - San Jose, CA</tr></td></tr>
                                        <tr><td><img className="overview-logo-jobs" src={require('../../components/images/' + this.props.company.overview.logo + '_logo.jpg').default} alt="" /></td><td><tr className="overview-job-title">Software Engineer I</tr><tr className="overview-job-location">{company_name} - San Jose, CA</tr></td></tr>
                                        <tr><td><img className="overview-logo-jobs" src={require('../../components/images/' + this.props.company.overview.logo + '_logo.jpg').default} alt="" /></td><td><tr className="overview-job-title">Software Engineer II</tr><tr className="overview-job-location">{company_name} - San Jose, CA</tr></td></tr>
                                        <tr><td><img className="overview-logo-jobs" src={require('../../components/images/' + this.props.company.overview.logo + '_logo.jpg').default} alt="" /></td><td><tr className="overview-job-title">Software Engineer III</tr><tr className="overview-job-location">{company_name} - San Jose, CA</tr></td></tr>
                                        <tr><td><img className="overview-logo-jobs" src={require('../../components/images/' + this.props.company.overview.logo + '_logo.jpg').default} alt="" /></td><td><tr className="overview-job-title">Machine Learning Engineer </tr><tr className="overview-job-location">{company_name} - San Jose, CA</tr></td></tr>
                                        <tr><td><img className="overview-logo-jobs" src={require('../../components/images/' + this.props.company.overview.logo + '_logo.jpg').default} alt="" /></td><td><tr className="overview-job-title">Back End Software Engineer</tr><tr className="overview-job-location">{company_name} - San Jose, CA</tr></td></tr>
                                        <tr><td><img className="overview-logo-jobs" src={require('../../components/images/' + this.props.company.overview.logo + '_logo.jpg').default} alt="" /></td><td><tr className="overview-job-title">Product Manager</tr><tr className="overview-job-location">{company_name} - San Jose, CA</tr></td></tr>
                                    </table>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div> : <div> No Reviews for the Company Profile</div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(" CompanyReviews - store:", state.comStore);
    return {
        company: state.comStore.company || "",
        reviews: state.comStore.reviews || ""
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCompanyReviews: (payload) => dispatch(getCompanyReviews(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanySalaries);