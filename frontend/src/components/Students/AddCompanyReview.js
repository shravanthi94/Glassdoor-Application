import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/reviews.css';
import { getCompanyProfile } from '../../actions/company/getCompanyProfile';
import { addReviews } from '../../actions/company/addCompanyReview';
import { Redirect } from 'react-router';
import StarRatings from 'react-star-ratings';

class AddCompanyReview extends Component {

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
            reviewDetails: {
                company: this.props.location.state.data.company_id,
                rating: 0,
                employment_status: "",
                job_title: "",
                headline: "",
                pros: "",
                cons: "",
                current_former: "current",
                comment: "",
                student: this.props.studentId
            }
        }

        this.redirectHandler = this.redirectHandler.bind(this);
        this.changeRatingHandler = this.changeRatingHandler.bind(this);
        this.agreeTermsHandler = this.agreeTermsHandler.bind(this);
        this.addReviewHandler = this.addReviewHandler.bind(this);
    }

    formChangeHandler = (e) => {
        const { name, value } = e.target;
        const { reviewDetails } = this.state;
        this.setState({
            reviewDetails: {
                ...reviewDetails,
                [name]: value
            }
        });
    }


    redirectHandler = (e) => {
        console.log("redirect value: ", e);
        var path = "";

        if (e === "reviews") {
            path = "/companyReviews"
        }

        this.setState({
            isRedirect: true,
            redirectPath: path,
            company_id: this.props.company.overview._id
        })
    }

    changeRatingHandler = (e) => {
        this.setState({
            reviewDetails: {
                ...this.state.reviewDetails,
                rating: e
            }
        });
    }

    currentEmpHandler = (e) => {

        console.log("currentEmpHandler: ", e);

        this.setState({
            reviewDetails: {
                ...this.state.reviewDetails,
                current_former: e
            }
        });
    }

    employmentStatusHandler = (e) => {
        console.log("employmentStatusHandler: ", e.target.value);
        var comment = "";
        if(e.target.value === "current"){
            comment = "I have been working at "+this.state.company_name+" as ";
        }else{
            comment = "I have worked at "+this.state.company_name+" as ";
        }
 

        this.setState({
            reviewDetails: {
                ...this.state.reviewDetails,
                employment_status: e.target.value,
                comment: comment
            }
        });
    }

    agreeTermsHandler = (e) => {
        console.log("this.agreeTermsHandler: ", e.target.value);
    }

    addReviewHandler = (e) => {
        console.log("all the review details: ", this.state.reviewDetails);

        this.setState({
            submitted: true
        })
        this.props.addReviews(this.state.reviewDetails);
    }

    render() {
        var company_name = ""
        if (this.props.company) {
            company_name = this.props.company.overview.name;
        }

        console.log("this.state.currentEmphandler: ", this.state.reviewDetails.current_former);

        var redirectVar = "";
        var final_msg = "";

        if (this.state.isRedirect) {
            redirectVar = <Redirect to={{ pathname: this.state.redirectPath, state: { company_id: this.state.company_id } }} />
        }

        if(this.state.submitted && this.props.addFlag){
            redirectVar = <Redirect to={{ pathname: "/companyOverview", state: { data: this.state.company_id } }} />
        } else if (this.state.submitted && !this.props.addFlag) {
            final_msg = <div class="alert alert-danger" role="alert">{this.props.addMsg}</div>
        }

        return (
            <div>
                {redirectVar}
                { (this.props.company) ?
                    <div className="overview-all">
                        {/* <div style={{ backgroundColor: "#13aa41", height: "150px" }}> Search bar </div> */}
   
                        <div className="side-by-side-overview">
                            <div className="profile-row-two">
                                <div className="profile-row-two-row1">

                                    <div className="profile-row-two-inside">
                                        <div style={{ fontSize: "25px", color: "#0D0D0D", marginBottom: "20px" }}> Rate a Company</div>
                                        <div style={{ fontSize: "17px", color: "#7F7F7F", marginBottom: "20px" }}> It only takes a minute! And your anonymous review will help other job seekers.</div>
                                        <table>
                                            <tr>
                                                <td style={{ verticalAlign: "top" }}><img className="overview-logo-jobs" src={require('../../components/images/' + this.props.company.overview.logo + '_logo.jpg').default} alt="" /></td>
                                                <td>
                                                    <table>
                                                        <tr> <div class="form-group"> Company</div> </tr>
                                                        <tr>
                                                            <div class="form-group"><input onChange={this.formChangeHandler} class="form-control" style={{ width: "300px" }} name="CompanyName" value={this.state.company_name} required="required" /> </div>
                                                        </tr>

                                                        <tr> <div class="form-group"> Overall Rating</div> </tr>
                                                        <tr>
                                                            <div class="form-group" style={{ marginBottom: "15px" }}><StarRatings rating={this.state.reviewDetails.rating} starDimension="40px" changeRating={this.changeRatingHandler} starSpacing="1px" starRatedColor="#0caa41" starHoverColor="#0caa41" numberOfStars={5} name='rating' /></div>
                                                        </tr>


                                                        <tr> <div class="form-group"> Are you a current or former employee? </div> </tr>
                                                        <tr>
                                                            {this.state.reviewDetails.current_former === "current" ? <div class="form-group" style={{ marginBottom: "15px" }}> <div className="overview-profile-add-button-select" onClick={() => this.currentEmpHandler("current")}>Current</div><div className="overview-profile-add-button-nonselect" onClick={() => this.currentEmpHandler("former")}>Former</div></div>
                                                                : <div class="form-group" style={{ marginBottom: "15px" }}> <div className="overview-profile-add-button-nonselect" onClick={() => this.currentEmpHandler("current")}>Current</div><div className="overview-profile-add-button-select" onClick={() => this.currentEmpHandler("former")}>Former</div></div>}
                                                        </tr>


                                                        <tr> <div class="form-group"> Employment Status<sup>*</sup> </div> </tr>
                                                        <tr>
                                                            <div class="form-group">

                                                                <select className="review-emp-status-select-list" onChange={this.employmentStatusHandler.bind(this)}>
                                                                    <option value="Full Time">Full Time</option>
                                                                    <option value="Part Time" >Part Time</option>
                                                                    <option value="Contract" >Contract</option>
                                                                    <option value="Intern" >Intern</option>
                                                                </select>

                                                            </div>
                                                        </tr>

                                                        <tr> <div class="form-group"> Your Job Title at {this.state.company_name}</div> </tr>
                                                        <tr>
                                                            <div class="form-group"><input onChange={this.formChangeHandler} class="form-control" name="job_title" required="required" /> </div>
                                                        </tr>


                                                        <tr> <div class="form-group"> Review Headline<sup>*</sup></div> </tr>
                                                        <tr>
                                                            <div class="form-group"><input onChange={this.formChangeHandler} class="form-control" name="headline" required="required" /> </div>
                                                        </tr>


                                                        <tr> <div class="form-group"> Pros<sup>*</sup></div> </tr>
                                                        <tr>
                                                            <div class="form-group"><textarea onChange={this.formChangeHandler} class="form-control" style={{ height: "65px" }} name="pros" required="required" /> </div>
                                                        </tr>


                                                        <tr> <div class="form-group"> Cons<sup>*</sup></div> </tr>
                                                        <tr>
                                                            <div class="form-group"><textarea onChange={this.formChangeHandler} class="form-control" style={{ height: "65px" }} name="cons" required="required" /> </div>
                                                        </tr>

                                                        <tr> <div class="form-group"> I agree to the Glassdoor Terms of Use. This review of my experience at my current or former employer is truthful.</div> </tr>
                                                        <tr><div className="overview-profile-add-review-submit" onClick={this.addReviewHandler}>Add Review</div></tr>
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
                                    <div className="review-keep-real-style" style={{marginTop:"20px", marginBottom:"20px"}}>Thank you for doing your part to keep Glassdoor the most trusted place to find a job and company you love. See the Community Guidelines for more details.</div>
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
        studentId: state.studentProfile.profile._id
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCompanyProfile: (payload) => dispatch(getCompanyProfile(payload)),
        addReviews: (payload) => dispatch(addReviews(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCompanyReview);