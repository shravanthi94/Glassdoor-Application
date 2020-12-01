import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/reviews.css';
import '../CSS/interviews.css';
import { getCompanyProfile } from '../../actions/company/getCompanyProfile';
import { addInterview } from '../../actions/company/addCompanyInterview';
import { Redirect } from 'react-router';

class AddCompanyInterview extends Component {

    constructor(props) {
        super(props);

        console.log("add reviews - props data:", this.props.location.state.data);

        this.state = {
            submitted: false,
            isRedirect: false,
            redirectPath: "",
            company_id: this.props.location.state.data.company_id,
            logo: this.props.location.state.data.logo,
            company_name: this.props.location.state.data.company_name,
            interviewDetails: {
                company: this.props.location.state.data.company_id,
                overAllExperience: "",
                jobTitle: "",
                description: "",
                difficulty: "",
                offerStatus: "",
                question: "",
                answer: ""
            }
        }

        this.addInterviewHandler = this.addInterviewHandler.bind(this);
        this.formChangeHandler = this.formChangeHandler.bind(this);
    }

    formChangeHandler = (e) => {
        const { name, value } = e.target;
        const { interviewDetails } = this.state;
        this.setState({
            interviewDetails: {
                ...interviewDetails,
                [name]: value
            }
        });
    }

    experienceHandler = (e) => {
        console.log("experienceHandler: ", e);

        this.setState({
            interviewDetails: {
                ...this.state.interviewDetails,
                overAllExperience: e
            }
        }); 
    }

    offerStatusHandler = (e) => {
        console.log("offerStatusHandler: ", e.target.value);

        this.setState({
            interviewDetails: {
                ...this.state.interviewDetails,
                offerStatus: e.target.value,
            }
        }); 
    }

    interviewDifficultyHandler = (e) => {
        console.log("interviewDifficultyHandler: ", e.target.value);

        this.setState({
            interviewDetails: {
                ...this.state.interviewDetails,
                difficulty: e.target.value,
            }
        });
    }

    addInterviewHandler = (e) => {
        console.log("all the salary details: ", this.state.interviewDetails);

        this.setState({
            submitted: true
        })
        this.props.addInterview(this.state.interviewDetails);
    }

    render() {

        var redirectVar = "";
        var final_msg = "";

        if (this.state.submitted && this.props.addFlag) {
            redirectVar = <Redirect to={{ pathname: "/companyOverview", state: { data: this.state.company_id } }} />
        } else if (this.state.submitted && !this.props.addFlag) {
            final_msg = <div class="alert alert-danger" role="alert">{this.props.addMsg}</div>
        }

        return (
            <div>
                {redirectVar}
                { (this.props.company) ?
                    <div className="overview-all">

                        <div className="side-by-side-overview">
                            <div className="profile-row-two">
                                <div className="profile-row-two-row1">

                                    <div className="profile-row-two-inside">
                                        <div style={{ fontSize: "25px", color: "#0D0D0D", marginBottom: "20px" }}> Tell us about a recent job interview</div><br />
                                        <div style={{ fontSize: "17px", color: "#7F7F7F", marginBottom: "20px" }}> Your anonymous experience will help other job seekers.</div>
                                        <table>
                                            <tr>
                                                <td style={{ verticalAlign: "top" }}><img className="overview-logo-jobs" src={require('../../components/images/' + this.props.company.overview.logo + '_logo.jpg').default} alt="" /></td>
                                                <td>
                                                    <table>
                                                        <tr> <div class="form-group"> Employer Name</div> </tr>
                                                        <tr>
                                                            <div class="form-group"><input onChange={this.formChangeHandler} class="form-control" style={{ width: "400px" }} name="CompanyName" value={this.state.company_name} required="required" /> </div>
                                                        </tr>

                                                        <tr>
                                                            {this.state.interviewDetails.overAllExperience === "positive" ? 
                                                            
                                                            <div><div className="interview-thumbs-up-down interview-thumbs-up-down-green " onClick={() => this.experienceHandler("positive")}><i class="fa fa-thumbs-up"></i></div><div className="interview-thumbs-up-down" onClick={() => this.experienceHandler("neutral")}><i class="fas fa-minus"></i></div><div className="interview-thumbs-up-down" onClick={() => this.experienceHandler("negative")}><i class="fa fa-thumbs-down"></i></div></div>

                                                            : this.state.interviewDetails.overAllExperience === "neutral" ?

                                                            <div><div className="interview-thumbs-up-down" onClick={() => this.experienceHandler("positive")}><i class="fa fa-thumbs-up"></i></div><div className="interview-thumbs-up-down interview-thumbs-up-down-yellow" onClick={() => this.experienceHandler("neutral")}><i class="fas fa-minus"></i></div><div className="interview-thumbs-up-down" onClick={() => this.experienceHandler("negative")}><i class="fa fa-thumbs-down"></i></div></div>

                                                            : this.state.interviewDetails.overAllExperience === "negative" ?
                                                            
                                                            <div><div className="interview-thumbs-up-down" onClick={() => this.experienceHandler("positive")}><i class="fa fa-thumbs-up"></i></div><div className="interview-thumbs-up-down" onClick={() => this.experienceHandler("neutral")}><i class="fas fa-minus"></i></div><div className="interview-thumbs-up-down interview-thumbs-up-down-red" onClick={() => this.experienceHandler("negative")}><i class="fa fa-thumbs-down"></i></div></div>
                                                            
                                                            : <div><div className="interview-thumbs-up-down" onClick={() => this.experienceHandler("positive")}><i class="fa fa-thumbs-up"></i></div><div className="interview-thumbs-up-down"  onClick={() => this.experienceHandler("neutral")}><i class="fas fa-minus"></i></div><div className="interview-thumbs-up-down"  onClick={() => this.experienceHandler("negative")}><i class="fa fa-thumbs-down"></i></div></div>
                                                            
                                                            }
                                                            </tr> <br />


                                                        <tr> <div class="form-group"> Job Title:</div> </tr>
                                                        <tr>
                                                            <div class="form-group"><input onChange={this.formChangeHandler} class="form-control" style={{ width: "400px" }} name="jobTitle" required="required" placeholder="Job Title"/> </div>
                                                        </tr>
                                                        <tr> <div class="form-group"> Describe the Interview Process <sup>*</sup>:</div> </tr>
                                                        <tr>
                                                            <div class="form-group"><textarea onChange={this.formChangeHandler} class="form-control" style={{ width: "400px", height:"70px" }} name="description" required="required" /> </div>
                                                        </tr>

                                                        <tr> <div class="form-group"> Interview Difficulty <sup>*</sup>:</div> </tr>
                                                        <tr>
                                                            <div class="form-group">

                                                                <select className="review-emp-status-select-list" onChange={this.interviewDifficultyHandler.bind(this)}  style={{ width: "300px", height:"45px" }}>
                                                                    <option value="Average">Select your option</option>
                                                                    <option value="Easy">Easy</option>
                                                                    <option value="Average">Average</option>
                                                                    <option value="Difficult">Difficult</option>
                                                                </select>

                                                            </div>
                                                        </tr>


                                                        <tr> <div class="form-group"> Did you get an offer? <sup>*</sup>:</div> </tr>
                                                        <tr>
                                                            <div class="form-group">

                                                                <select className="review-emp-status-select-list" onChange={this.offerStatusHandler.bind(this)}  style={{ width: "300px", height:"45px" }}>
                                                                    <option value="Average">Select your option</option>
                                                                    <option value="Yes, and I accepted">Yes, and I accepted</option>
                                                                    <option value="Yes, but I rejected">Yes, but I rejected</option>
                                                                    <option value="No offer">No offer</option>
                                                                </select>

                                                            </div>
                                                        </tr>

                                                        <tr> <div class="form-group"> Interview Questions<sup>*</sup>:</div> </tr>
                                                        <tr>
                                                            <div class="form-group"><textarea onChange={this.formChangeHandler} class="form-control" style={{ width: "400px", height:"70px" }} name="question" placeholder="Q: What was the one thing that they asked you?" /> </div>
                                                        </tr>

                                                        <tr> <div class="form-group"> Interview Answers:</div> </tr>
                                                        <tr>
                                                            <div class="form-group"><textarea onChange={this.formChangeHandler} class="form-control" style={{ width: "400px", height:"70px" }} name="answer" placeholder="How did you answer this question?" /> </div>
                                                        </tr>

                                                        <tr><div className="overview-profile-add-review-submit" onClick={this.addInterviewHandler}>Add Salary</div></tr>
                                                        {final_msg}
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="profile-row-two-column2">
                                <div className="profile-row-two-column2-row1">
                                    <div style={{ fontSize: "20px", marginLeft: "20px", marginTop: "20px", marginBottom: "20px" }}>Keep It Real</div>

                                    <div className="review-keep-real-style">Thank you for contributing to the community. Your opinion will help others make decisions about jobs and companies.</div>
                                    <div className="review-keep-real-style-heading">Please stick to the Community Guidelines and do not post:
                                </div>
                                    <div className="review-keep-real-style">
                                        <li>Aggressive or discriminatory language</li>
                                        <li>Profanities</li>
                                        <li>Trade secrets/confidential information</li>
                                    </div>
                                    <div className="review-keep-real-style" style={{ marginTop: "20px", marginBottom: "20px" }}>Thank you for doing your part to keep Glassdoor the most trusted place to find a job and company you love. See the Community Guidelines for more details.</div>
                                </div>
                            </div>
                        </div>
                    </div> : <div> No Company Profile</div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(" AddCompanyReview - store:", state.comStore);
    return {
        company: state.comStore.company || "",
        addMsg: state.comStore.addMsg,
        addFlag: state.comStore.addFlag,
        student: state.studentProfile.profile._id | ""
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCompanyProfile: (payload) => dispatch(getCompanyProfile(payload)),
        addInterview: (payload) => dispatch(addInterview(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCompanyInterview);