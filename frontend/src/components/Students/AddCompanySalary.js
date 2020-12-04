import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/reviews.css';
import { getCompanyProfile } from '../../actions/company/getCompanyProfile';
import { addSalaries } from '../../actions/company/addCompanySalary';
import { Redirect } from 'react-router';
import { BACKEND_URL } from '../../helpers/constants';
import defaultImage from '../images/default_banner.jpg';
import defaultLogo from '../images/default_logo.png';

class AddCompanySalary extends Component {

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
            salaryDetails: {
                company: this.props.location.state.data.company_id,
                baseSalary: 0,
                bonuses: 0,
                jobTitle: "",
                yearsOfExp: "",
                location: "",
                gender: "female",
                student: this.props.student
            }
        }

        // this.redirectHandler = this.redirectHandler.bind(this);
        this.agreeTermsHandler = this.agreeTermsHandler.bind(this);
        this.addSalaryHandler = this.addSalaryHandler.bind(this);
    }

    formChangeHandler = (e) => {
        const { name, value } = e.target;
        const { salaryDetails } = this.state;
        this.setState({
            salaryDetails: {
                ...salaryDetails,
                [name]: value
            }
        });
    }


    // redirectHandler = (e) => {
    //     console.log("redirect value: ", e);
    //     var path = "";

    //     if (e === "reviews") {
    //         path = "/companyReviews"
    //     }

    //     this.setState({
    //         isRedirect: true,
    //         redirectPath: path,
    //         company_id: this.props.company.overview._id
    //     })
    // }

    salaryGenderHandler = (e) => {

        console.log("salaryGenderHandler: ", e);

        this.setState({
            salaryDetails: {
                ...this.state.salaryDetails,
                gender: e
            }
        });
    }

    yearExpHandler = (e) => {
        console.log("yearExpHandler: ", e.target.value);

        this.setState({
            salaryDetails: {
                ...this.state.salaryDetails,
                yearsOfExp: e.target.value,
            }
        });
    }

    agreeTermsHandler = (e) => {
        console.log("this.agreeTermsHandler: ", e.target.value);
    }

    addSalaryHandler = (e) => {
        console.log("all the salary details: ", this.state.salaryDetails);

        this.setState({
            submitted: true
        })
        this.props.addSalaries(this.state.salaryDetails);
    }

    render() {

        var redirectVar = "";
        var final_msg = "";

        // if (this.state.isRedirect) {
        //     redirectVar = <Redirect to={{ pathname: this.state.redirectPath, state: { company_id: this.state.company_id } }} />
        // }

        if (this.state.submitted && this.props.addFlag) {
            redirectVar = <Redirect to={{ pathname: "/companyOverview", state: { data: this.props.company.overview._id } }} />
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
                                        <div style={{ fontSize: "25px", color: "#0D0D0D", marginBottom: "20px" }}> Add a Salary</div><br />
                                        <div style={{ fontSize: "17px", color: "#7F7F7F", marginBottom: "20px" }}> Your anonymous salary will help other job seekers.</div>
                                        <table>
                                            <tr>
                                                {/* <td style={{ verticalAlign: "top" }}><img className="overview-logo-jobs" src={require('../../components/images/' + this.props.company.overview.logo + '_logo.jpg').default} alt="" /></td>
                                                 */}
             <td style={{ verticalAlign: "top" }}>
                                                 {this.props.company.overview.logo ? (
   
                <img
                  className='overview-logo'
                  src={
                    require('../../components/images/' +
                      this.props.company.overview.logo +
                      '_logo.jpg').default
                  }
                  alt=''
                />
              ) : (
                <img
                  className='company-banner'
                  src={defaultLogo}
                  alt='company banner'
                />
              )} </td>
                                                
                                                <td>
                                                    <table>
                                                        <tr> <div class="form-group"> Employer Name</div> </tr>
                                                        <tr>
                                                            <div class="form-group"><input onChange={this.formChangeHandler} class="form-control" style={{ width: "300px" }} name="CompanyName" value={this.state.company_name} required="required" /> </div>
                                                        </tr>

                                                        <tr> <div class="form-group"> Base Salary:</div> </tr>
                                                        <tr>
                                                            <div class="form-group"><input onChange={this.formChangeHandler} class="form-control" style={{ width: "300px" }} name="baseSalary" required="required" placeholder="USD per year"/> </div>
                                                        </tr>

                                                        <tr> <div class="form-group"> Bonuses:</div> </tr>
                                                        <tr>
                                                            <div class="form-group"><input onChange={this.formChangeHandler} class="form-control" style={{ width: "300px" }} name="bonuses" required="required" placeholder="USD per year"/> </div>
                                                        </tr>

                                                        <tr> <div class="form-group"> Job Title:</div> </tr>
                                                        <tr>
                                                            <div class="form-group"><input onChange={this.formChangeHandler} class="form-control" style={{ width: "300px" }} name="jobTitle" required="required" placeholder="Job Title"/> </div>
                                                        </tr>

                                                        <tr> <div class="form-group"> Years of Experience<sup>*</sup> </div> </tr>
                                                        <tr>
                                                            <div class="form-group">

                                                                <select className="review-emp-status-select-list" onChange={this.yearExpHandler.bind(this)}>
                                                                    <option value="1" >1</option>
                                                                    <option value="2" >2</option>
                                                                    <option value="3" >3</option>
                                                                    <option value="4" >4</option>
                                                                    <option value="1" >5</option>
                                                                    <option value="2" >6</option>
                                                                    <option value="3" >7</option>
                                                                    <option value="4" >8</option>
                                                                    <option value="1" >9</option>
                                                                    <option value="2" >10</option>
                                                                </select>

                                                            </div>
                                                        </tr>

                                                        <tr> <div class="form-group"> Location:</div> </tr>
                                                        <tr>
                                                            <div class="form-group"><input onChange={this.formChangeHandler} class="form-control" style={{ width: "300px" }} name="location" required="required" placeholder="Location"/> </div>
                                                        </tr>
                                                        <tr> <div class="form-group"> Optional: Specify your gender to contribute anonymously to Glassdoor research into fair wages.</div> </tr>
                                                        <tr>
                                                            {this.state.salaryDetails.gender === "female" ? <div class="form-group" style={{ marginBottom: "15px" }}> <div className="overview-profile-add-button-select" onClick={() => this.salaryGenderHandler("female")}>Female</div><div className="overview-profile-add-button-nonselect" onClick={() => this.salaryGenderHandler("male")}>Male</div></div>
                                                                : <div class="form-group" style={{ marginBottom: "15px" }}> <div className="overview-profile-add-button-nonselect" onClick={() => this.salaryGenderHandler("female")}>Female</div><div className="overview-profile-add-button-select" onClick={() => this.salaryGenderHandler("male")}>Male</div></div>}
                                                        </tr>

                                                        <tr><div className="overview-profile-add-review-submit" onClick={this.addSalaryHandler}>Add Salary</div></tr>
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
                                    <div style={{ fontSize: "20px", marginLeft: "20px", marginTop: "20px", marginBottom: "20px" }}>How can this really be anonymous?</div>

                                    <div className="review-keep-real-style">We will never display any personal information with your salary. The only personal information we require is your email (i.e., no name, no address, etc.) and we only do that to make sure you're a real person.</div>
                                    <div className="review-keep-real-style-heading">Plus there's more to protect your anonymity:
                                </div>
                                    <div className="review-keep-real-style">
                                        <li>If you work at a small company or are the only person with your job title, you're not required to tell us your employer. Simply select "I prefer not to specify my employer" and your salary will not be displayed on the site.</li>
                                        <li>If you are among the first to post a salary for your job title and company, we will automatically add and/or subtract a small amount from the salary you post. This "anonymous salary range" offers a bit more anonymity while minimizing the difference from the actual salary.</li>
                                        <br />
                                    </div>
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
        student: state.studentProfile.profile._id || ""
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCompanyProfile: (payload) => dispatch(getCompanyProfile(payload)),
        addSalaries: (payload) => dispatch(addSalaries(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCompanySalary);