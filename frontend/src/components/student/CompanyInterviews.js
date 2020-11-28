import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/interviews.css';
import { getCompanyReviews } from '../../actions/company/getCompanyReviews';
import { PieChart } from 'react-minimal-pie-chart';
import { Redirect } from 'react-router';
import Navigation from './Navigation';

class CompanyInterviews extends Component {

    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            isRedirect: false,
            redirectPath: "",
            company_id: this.props.location.state.company_id,
            data: "",
            experience: {
                Positive: 0,
                Neutral: 0,
                Negative: 0
            },
            difficulty: {
                Easy: 0,
                Average: 0,
                Difficult: 0
            },
            offerStatus: {
                Accepted: 0,
                Declined: 0,
                Nooffer: 0
            }
        }

        this.redirectHandler = this.redirectHandler.bind(this);
        this.calculateStatistics = this.calculateStatistics.bind(this);
    }

    componentDidMount() {
        // this.props.getCompanyReviews(this.state.company_id);
        this.calculateStatistics();
    }

    calculateStatistics() {
        // console.log("calcualte stats");
        var experience = {
            Positive: 0,
            Neutral: 0,
            Negative: 0
        }
        var difficulty = {
            Easy: 0,
            Average: 0,
            Difficult: 0
        }
        var offerStatus = {
            Accepted: 0,
            Declined: 0,
            Nooffer: 0
        }

        let expCount = 0;
        let diffCount = 0;
        let offerCount = 0;

        if (this.props.company && this.props.company.overview && this.props.company.overview.interview) {

            this.props.company.overview.interview.forEach(interview => {

                if (interview.difficulty) {
                    diffCount = diffCount + 1;
                    (interview.difficulty === "Average") ? (difficulty.Average = +difficulty.Average + 1) : (interview.difficulty === "Easy") ? (difficulty.Easy = +difficulty.Easy + 1) : (difficulty.Difficult = +difficulty.Difficult + 1);
                }
                if (interview.offerStatus) {
                    offerCount = offerCount + 1;
                    (interview.offerStatus === "Yes, and I accepted") ? offerStatus.Accepted = offerStatus.Accepted + 1 : (interview.offerStatus === "Yes, but I declined") ? offerStatus.Declined = offerStatus.Declined + 1 : offerStatus.Nooffer = offerStatus.Nooffer + 1;
                }
                if (interview.overallInterviewExp) {
                    expCount = expCount + 1;
                    (interview.overallInterviewExp === "positive") ? experience.Positive = experience.Positive + 1 : (interview.overallInterviewExp === "negative") ? experience.Negative = experience.Negative + 1 : experience.Neutral = experience.Neutral + 1;
                }
            })

            this.setState({
                experience: {
                    Positive: parseInt((experience.Positive) / expCount * 100),
                    Neutral: parseInt((experience.Neutral) / expCount * 100),
                    Negative: parseInt((experience.Negative) / expCount * 100)
                },
                difficulty: {
                    Easy: parseInt((difficulty.Easy) / diffCount * 100),
                    Average: parseInt((difficulty.Average) / diffCount * 100),
                    Difficult: parseInt((difficulty.Difficult) / diffCount * 100)
                },
                offerStatus: {
                    Accepted: parseInt((offerStatus.Accepted) / offerCount * 100),
                    Declined: parseInt((offerStatus.Declined) / offerCount * 100),
                    Nooffer: parseInt((offerStatus.Nooffer) / offerCount * 100)
                }
            })
        }
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
        else if (e === "reviews") {
            path = "/companyReviews"
        }
        else if (e === "salaries") {
            path = "/companySalaries"
        }

        this.setState({
            isRedirect: true,
            redirectPath: path,
            data: data
        })
    }


    render() {

        console.log("Statistics: ", this.state);

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
                                <td><div className="profile-counts">8.4k</div><div className="profile-title" onClick={() => this.redirectHandler("salaries")}>Salaries&emsp;</div></td>
                                <td className="profile-titles-selected"><div className="profile-counts">1.2k</div><div className="profile-title" onClick={() => this.redirectHandler("interviews")}>Interviews&emsp;</div></td>
                                <td><div className="profile-counts">1.8k</div><div className="profile-title">Benefits&emsp;</div></td>
                                <td><div className="profile-counts">92</div><div className="profile-title">Photos&emsp;</div></td>
                            </table>
                            <div className="profile-add-button-position" ><div className="overview-profile-add-button" onClick={() => this.redirectHandler("add-reviews")}><i class="fa fa-plus"></i> &nbsp;Add Interview</div></div>
                        </div>
                        <div className="side-by-side-overview">
                            <div className="profile-row-two">
                                <div className="profile-row-two-row1">

                                    <div className="profile-row-two-inside">
                                        <div style={{ fontSize: "22px", color: "#0D0D0D" }}>Interviews at {company_name} </div>

                                        <table className="interview-charts">
                                            <tr>
                                                <td>
                                                    <tr><td> Experience</td></tr>
                                                    <tr><td>
                                                        <PieChart
                                                            data={[
                                                                { title: 'One', value: this.state.experience.Positive, color: '#dcee95' },
                                                                { title: 'Two', value: this.state.experience.Neutral, color: '#13aa41' },
                                                                { title: 'Three', value: this.state.experience.Negative, color: '#194383' }
                                                            ]}
                                                            totalValue={100}
                                                            lineWidth={35}
                                                            style={{ height: '70px' }}
                                                        /></td></tr>
                                                </td>
                                                <td>

                                                    <div className="interview-donut-lime-style">
                                                        <div><div className="interview-lime1-box"></div><div className="interview-donut-lime-style-label">Positive {this.state.experience.Positive} %</div></div><br />
                                                        <div><div className="interview-lime2-box"></div><div className="interview-donut-lime-style-label">Neutral {this.state.experience.Neutral} %</div></div><br />
                                                        <div><div className="interview-lime3-box"></div><div className="interview-donut-lime-style-label">Negative {this.state.experience.Negative} %</div></div>
                                                    </div>
                                                </td>

                                                <td>
                                                    <tr><td> OfferStatus</td></tr>
                                                    <tr><td>
                                                        <PieChart
                                                            data={[
                                                                { title: 'One', value: this.state.offerStatus.Accepted, color: '#dcee95' },
                                                                { title: 'Two', value: this.state.offerStatus.Declined, color: '#13aa41' },
                                                                { title: 'Three', value: this.state.offerStatus.Nooffer, color: '#194383' }
                                                            ]}
                                                            totalValue={100}
                                                            lineWidth={35}
                                                            style={{ height: '70px' }}
                                                        /></td></tr>
                                                </td>
                                                <td>

                                                    <div className="interview-donut-lime-style">
                                                        <div><div className="interview-lime1-box"></div><div className="interview-donut-lime-style-label">Accepted {this.state.offerStatus.Accepted} %</div></div><br />
                                                        <div><div className="interview-lime2-box"></div><div className="interview-donut-lime-style-label">Declined {this.state.offerStatus.Declined} %</div></div><br />
                                                        <div><div className="interview-lime3-box"></div><div className="interview-donut-lime-style-label">Nooffer {this.state.offerStatus.Nooffer} %</div></div>
                                                    </div>
                                                </td>

                                                <td>
                                                    <tr><td> Difficulty</td></tr>
                                                    <tr><td>
                                                        <PieChart
                                                            data={[
                                                                { title: 'One', value: this.state.difficulty.Easy, color: '#dcee95' },
                                                                { title: 'Two', value: this.state.difficulty.Average, color: '#13aa41' },
                                                                { title: 'Three', value: this.state.difficulty.Difficult, color: '#194383' }
                                                            ]}
                                                            totalValue={100}
                                                            lineWidth={35}
                                                            style={{ height: '70px' }}
                                                        /></td></tr>
                                                </td>
                                                <td>

                                                    <div className="interview-donut-lime-style">
                                                        <div><div className="interview-lime1-box"></div><div className="interview-donut-lime-style-label">Easy {this.state.difficulty.Easy} %</div></div><br />
                                                        <div><div className="interview-lime2-box"></div><div className="interview-donut-lime-style-label">Average {this.state.difficulty.Average} %</div></div><br />
                                                        <div><div className="interview-lime3-box"></div><div className="interview-donut-lime-style-label">Difficult {this.state.difficulty.Difficult} %</div></div>
                                                    </div>
                                                </td>
                                                </tr>
                                        </table>


                                        <hr className="overview-hr" />
                                        {(this.props.company.overview.interview && this.props.company.overview.interview !== 0) ?

                                            this.props.company.overview.interview.map(interview => (
                                                <div>
                                                    <div className="overview-review-date">{(interview.date + "").substring(0, 10)}</div>
                                                    <table className="overview-reviews-table-all">
                                                        <tr>
                                                            <td style={{ verticalAlign: "top" }}><img className="overview-logo-jobs" src={require('../../components/images/' + this.props.company.overview.logo + '_logo.jpg').default} alt="" /></td>
                                                            <td>
                                                                <table>
                                                                    <tr className="overview-review-headline"><td>{interview.jobTitle} Interview</td></tr>
                                                                    <tr style={{ fontSize: "13px", color: "#7F7F7F" }}><td>Anonymous Interview Candidate</td></tr>


                                                                    <tr>
                                                                        <td>
                                                                            <div className="overview-reviews-pros-cons-title">
                                                                                <tr>
                                                                                    <td>
                                                                                        {(interview.offerStatus === "Yes, and I accepted") ? <div><div className="interview-green-box"></div><div>Accepted</div></div> :
                                                                                            (interview.offerStatus === "Yes, but I declined") ? <div><div className="interview-yellow-box"></div><div>Declined</div></div> :
                                                                                                <div><div className="interview-red-box"></div><div>No Offer</div></div>
                                                                                        }
                                                                                    </td>

                                                                                    <td>
                                                                                        {(interview.overallInterviewExp === "positive") ? <div><div className="interview-green-box"></div><div>Positive Experience</div></div> :
                                                                                            (interview.overallInterviewExp === "neutral") ? <div><div className="interview-yellow-box"></div><div>Neutral Experience</div></div> :
                                                                                                <div><div className="interview-red-box"></div><div>Negative Experience</div></div>
                                                                                        }
                                                                                    </td>
                                                                                    <td>

                                                                                        {(interview.difficulty === "Easy") ? <div><div className="interview-green-box"></div><div>Easy Interview</div></div> :
                                                                                            (interview.difficulty === "Average") ? <div><div className="interview-yellow-box"></div><div>Average Interview</div></div> :
                                                                                                <div><div className="interview-red-box"></div><div>Difficult Interview</div></div>
                                                                                        }

                                                                                    </td>
                                                                                </tr>
                                                                            </div>
                                                                        </td></tr>


                                                                    <tr><td><div className="overview-reviews-pros-cons-title">Interview</div><br /><div className="overview-reviews-pros-cons"> {interview.description} </div></td></tr>
                                                                    <tr><td><div className="overview-reviews-pros-cons-title">Interview Questions</div><br /><div className="overview-reviews-pros-cons"> {interview.questions} </div></td></tr>
                                                                    {(interview.answers) ? <tr><td><div className="overview-reviews-pros-cons-title">Interview Answers</div><br /><div className="overview-reviews-pros-cons"> {interview.answers} </div></td></tr> : ""}
                                                                    <br />
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <div><div className="overview-social-media-logos"><i class="fab fa-facebook-f"></i></div><div className="overview-social-media-logos"><i class="fab fa-twitter"></i></div><div className="overview-social-media-logos"><i class="far fa-envelope"></i></div><div className="overview-social-media-logos"><i class="fas fa-link"></i></div>
                                                        <div className="overview-helpful-button">Helpful</div>
                                                    </div>
                                                    <hr className="overview-hr" />
                                                </div>
                                            )) : <div> No Reviews Yets</div>
                                        }
                                        {(this.props.company.reviews && this.props.company.reviews.length !== 0) ? <div className="overview-see-all-reviews">See All 48 Interview Experiences </div> : ""}
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInterviews);