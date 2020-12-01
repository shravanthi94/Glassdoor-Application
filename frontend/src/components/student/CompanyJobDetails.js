import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import '../CSS/job.css';
import { getCompanyJobs } from '../../actions/company/getCompanyJobs';
import { Redirect } from 'react-router';
import Navigation from './Navigation';
import UtilityBar from './UtilityBar';
import ReactModal from 'react-modal';

class CompanyJobDetails extends Component {

    constructor(props) {
        super(props);

        console.log("jobs details: ", this.props.location.state.data);

        this.state = {
            submitted: false,
            isRedirect: false,
            redirectPath: "",
            company_id: this.props.location.state.company_id,
            data: "",
            jobs: this.props.jobs,
            filteredJobs: this.props.jobs,
            searchName: "",
            searchLocation: "",
            jobDetail: this.props.location.state.data,
            coverLetter: "",
            resume: ""
        }

        this.redirectHandler = this.redirectHandler.bind(this);
        this.changeJobHandler = this.changeJobHandler.bind(this);
        this.closeModalHandler = this.closeModalHandler.bind(this);
        this.openModalHandler = this.openModalHandler.bind(this);
    }

    componentDidMount() {
        this.props.getCompanyJobs(this.state.company_id);
    }

    componentDidUpdate(prevProps) {

        if (this.state.jobs !== this.props.jobs) {
            this.setState({
                jobs: this.props.jobs,
                filteredJobs: this.props.jobs
            })
        }
    }

    changeJobHandler = (e) => {
        this.setState({
            jobDetail: e
        })
    }

    openModalHandler = (e) => {
        this.setState({
            showModal: true
        })
    }

    closeModalHandler = (e) => {
        this.setState({
            showModal: false
        })
    }

    redirectHandler = (e) => {
        console.log("redirect value: ", e);
        var path = "";
        var data = "";

        if (e === "overview") {
            path = "/companyOverview"
            data = this.props.company.overview._id
        } else if (e === "add-reviews") {
            path = "/addCompanyReview"
            data = {
                company_id: this.props.company.overview._id,
                logo: this.props.company.overview.logo,
                company_name: this.props.company.overview.name
            }
        } else if (e === "interviews") {
            path = "/companyInterviews"
            data = this.props.company.overview._id
        }
        else if (e === "reviews") {
            path = "/companyReviews"
        }
        else if (e === "salaries") {
            path = "/companySalaries"
        }
        else if (e === "add-salary") {
            path = "/addCompanySalary"
            data = {
                company_id: this.props.company.overview._id,
                logo: this.props.company.overview.logo,
                company_name: this.props.company.overview.name
            }
        }

        this.setState({
            isRedirect: true,
            redirectPath: path,
            data: data
        })
    }


    render() {
        var company_name = ""
        var redirectVar = "";

        var companyjob = this.state.jobDetail;

        if (this.props.company) {
            company_name = this.props.company.overview.name;
        }

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
                        <UtilityBar />
                        <div className="profile-row-one">
                            <img className="company-banner-blur" src={require('../../components/images/' + this.props.company.overview.logo + '_banner.jpg').default} alt="" />
                            <img className="overview-logo" src={require('../../components/images/' + this.props.company.overview.logo + '_logo.jpg').default} alt="" />
                            <div className="overview-company-name">{company_name}</div>
                            <table className="profile-row-one-table">
                                <td><div className="profile-counts"><i class="fas fa-bullseye"></i></div><div className="profile-title" onClick={() => this.redirectHandler("overview")}>Overview&emsp;</div></td>
                                <td><div className="profile-counts">4.0k</div><div className="profile-title" onClick={() => this.redirectHandler("reviews")}>Reviews&emsp;</div></td>
                                <td className="profile-titles-selected"><div className="profile-counts">867</div><div className="profile-title">Jobs&emsp;</div></td>
                                <td><div className="profile-counts">8.4k</div><div className="profile-title" onClick={() => this.redirectHandler("salaries")}>Salaries&emsp;</div></td>
                                <td><div className="profile-counts">1.2k</div><div className="profile-title" onClick={() => this.redirectHandler("interviews")}>Interviews&emsp;</div></td>
                                <td><div className="profile-counts">1.8k</div><div className="profile-title">Benefits&emsp;</div></td>
                                <td><div className="profile-counts">92</div><div className="profile-title">Photos&emsp;</div></td>
                            </table>
                            <div className="profile-add-button-position"><div className="overview-profile-add-button" onClick={() => this.redirectHandler("add-salary")}><i class="fa fa-plus"></i> &nbsp;Add Salary</div></div>
                        </div>
                        <div className="side-by-side-overview">
                            <div className="profile-row-two" style={{ width: "325px" }}>
                                <div className="profile-row-two-row1">

                                    <div className="job-profile-row-two-inside" style={{ width: "325px" }}>
                                        <br />
                                        <div style={{ fontSize: "18px", color: "#0D0D0D" }}> All {company_name} Job Details</div>

                                        <br />
                                        <hr className="overview-hr" style={{ width: "300px" }} />

                                        <form></form>

                                        <table className="job-postings-table" >
                                            {(this.state.filteredJobs && this.state.filteredJobs !== 0) ?
                                                this.state.filteredJobs.map(job => (
                                                    <tr>
                                                        <td>
                                                            <div>
                                                                <img className="job-postings-logo" style={{ width: "40px", height: "40px", marginRight: "10px" }} src={require('../../components/images/' + this.props.company.overview.logo + '_logo.jpg').default} alt="" />
                                                            </div>
                                                        </td>
                                                        <td className="company-salary-job-title" style={{ fontSize: "15px" }}>
                                                            <div><span style={{ color: "black", fontWeight: "normal" }}>{company_name}</span></div>
                                                            <div onClick={() => this.changeJobHandler(job)}>{job.title}</div>
                                                            <div><span className="job-city-state"> {job.city}, {job.state}</span></div>
                                                        </td>
                                                    </tr>
                                                )) : <tr><td><div> No Job Postings Yets</div></td></tr>
                                            }
                                        </table>
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </div>

                            <div className="profile-row-two-column2" style={{ width: "625px" }}>
                                <div >
                                    <Fragment>
                                        <div class="card" style={{ width: '625px', height: '100%' }}>
                                            <div class="card-body" style={{ width: "625px" }}>
                                                <div><button onClick={this.openModalHandler} className="company-apply-job-nonselect">&nbsp;&nbsp;Apply To Job</button></div>
                                                <hr />
                                                <table className="overview-table">
                                                    <tr><td>Job Title:</td><td><div>{companyjob.title}</div></td><td>Street:</td><td><div>{companyjob.street}</div></td></tr>
                                                    <tr><td>Company:</td><td><div>{companyjob.name}</div></td><td>City:</td><td><div>{companyjob.city}</div></td></tr>
                                                    <tr><td>Industry:</td><td><div>{companyjob.industry}</div></td><td>State:</td><td><div>{companyjob.state}</div></td></tr>
                                                    <tr><td>Remote:</td><td><div>{companyjob.Remote}</div></td><td>In-Person:</td><td><div>{companyjob.inPerson}</div></td></tr>
                                                </table>
                                                <br />
                                                <div className='font-weight-bold'>Description: </div> {companyjob.description}
                                                <br />
                                                <br />
                                                <div className='font-weight-bold'>Qualifications: </div>

                                                {companyjob.qualifications.length > 0 ? companyjob.qualifications.map(qualification => (
                                                    <ul>
                                                        <li>
                                                            {qualification}
                                                        </li>
                                                    </ul>
                                                )) : <p>No Qualifications mentioned</p>}

                                                <div className='font-weight-bold'>Responsibilities: </div>
                                                {companyjob.responsibilities.length > 0 ? companyjob.responsibilities.map(responsibility => (
                                                    <ul>
                                                        <li>
                                                            {responsibility}
                                                        </li>
                                                    </ul>
                                                )) : <p>No responsibilities mentioned</p>}

                                            </div>
                                        </div>
                                        <br />
                                    </Fragment>
                                </div>

                            </div>
                        </div>
                    </div> : <div> No Reviews for the Company Profile</div>
                }

                <ReactModal isOpen={this.state.showModal} contentLabel="Minimal Modal Example"
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(183, 183, 183, 0.75)',
                            zIndex: "2"
                        },

                        content: {
                            top: "22%",
                            left: "32%",
                            width: '600px',
                            height: '500px',
                            verticalAlign: "center",
                            zIndex: "2"

                        }
                    }}>
                    <div style={{ width: "20px", height: "20px", fontWeight: "bolder" }}>
                        <button onClick={this.closeModalHandler}>X</button>
                    </div>

                    <div>
                        <form>
                            <div className="file-upload">
                                <div className="file-upload-modal">
                            <label className="company-salary-job-title" htmlFor="CustPic">Upload Resume  </label>
                                <div className="form-group">
                                    <label for="file-upload-label" class="file-upload-label">
                                        <i class="file-upload-icon"></i> Choose File
                                    </label>
                                    <input id="file-upload-label" className="file-upload-input" onChange={this.uploadResumeHandler} type="file" name="resume" />
                                </div>
                                <br /><br />
                                <label className="company-salary-job-title" htmlFor="CustPic">Upload Cover Letter  </label>
                                <div className="form-group">
                                    <label for="file-upload-label" class="file-upload-label">
                                        <i class="file-upload-icon"></i> Choose File
                                    </label>
                                    <input id="file-upload-label" className="file-upload-input" onChange={this.uploadCoverHandler} type="file" name="coverLetter" />
                                </div>
                                <br /><br /><br />
                                <div>
                                    <button onClick={this.submitProfilePic} className="pic-upload-button" type="submit">Apply to Job</button>
                                </div>

                            </div>
                            </div>
                            <br />
                        </form>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(" CompanyJobs - store:", state.comStore);
    return {
        company: state.comStore.company || "",
        jobs: state.comStore.jobs || ""
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCompanyJobs: (payload) => dispatch(getCompanyJobs(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyJobDetails);