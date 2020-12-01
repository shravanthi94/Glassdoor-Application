import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/adminCSS.css';
import { getCompanyHiredApplicants, getCompanyApplicantDemographics } from '../../actions/admin/company';
import { Redirect } from 'react-router';
import Navigation from './Navigation';
import { Chart } from "react-google-charts";

class CompanyDetailsStastics extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
        this.redirectHandler = this.redirectHandler.bind(this);
    }

    componentWillMount() {
        this.setState({
            company: this.props.location.state,
        });
        this.props.getCompanyApplicantDemographics(this.props.location.state._id);
        this.props.getCompanyHiredApplicants(this.props.location.state._id);
    }

    redirectHandler = (e) => {
        console.log("redirect value: ", e);
        var path = "";

        if (e == "company_reviews") {
            path = "/admin/companyDetails"
        }
        

        this.setState({
            isRedirect: true,
            redirectPath: path,
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hiredApplicants) {
            var { hiredApplicants } = nextProps;

            console.log('CompanyDetailsStastics -> componentWillReceiveProps -> hiredApplicants : ', hiredApplicants);
            this.setState({
                hiredApplicants: hiredApplicants,
            });
        } 
        if (nextProps.hiredApplicantsError) {
            var { hiredApplicantsError } = nextProps;

            console.log('CompanyDetailsStastics -> componentWillReceiveProps -> hiredApplicantsError : ', hiredApplicantsError);
            this.setState({
                hiredApplicantsError: hiredApplicantsError,
                hiredApplicants: null,
            });
        } if (nextProps.demographics) {
            var { demographics } = nextProps;

            console.log('CompanyDetailsStastics -> componentWillReceiveProps -> demographics : ', demographics);
            this.setState({
                demographics: demographics,
            });
        } 
        if (nextProps.demographicsError) {
            var { demographicsError } = nextProps;

            console.log('CompanyDetailsStastics -> componentWillReceiveProps -> demographicsError : ', demographicsError);
            this.setState({
                demographicsError: demographicsError,
                demographics: null,
            });
        }
    }

    // displayHiredApplicants = (hiredApplicants) => {
    //     return (
    //         <div className="reviews-row-three">
    //         <div className="reviews-error" style={{marginLeft:'-10%'}}> Number of Applicants Hired So Far : {hiredApplicants.hiredApplicants}</div> 
    //         </div>
    //     );
    // };

    // displayDemographics = (demographics) => {
    //     return (
    //         <div className="reviews-row-four">
    //         No Applicants Hired So Far! 
    //         </div>
    //       );
    // };

    displayData = (demographics) => {

        var numberOfHiredApplicants = 0;
        if (this.props.hiredApplicants && this.props.hiredApplicants.jobPostings) {
            var index = this.props.hiredApplicants.jobPostings.map(job => job._id).indexOf(demographics.jobId);
            if (index >= 0) {
                numberOfHiredApplicants = this.props.hiredApplicants.jobPostings[index].count;
            }
        }

        return (
        <div className="company-stastics-row-two">
            <div className="review-headline" style={{marginLeft:'10%'}}><br/>{demographics.name} - {demographics.title} </div>
            <br/>
            <div style={{marginLeft:'10%', fontSize:'20px'}}> Hired Applicants: {numberOfHiredApplicants}</div>
            <br/>
            <div style={{marginLeft:'10%', fontSize:'20px'}}> Applicant Stastics : </div>
            <table>
                <br/>
                <tr>
                    <div style={{marginLeft:'10%', fontSize:'20px'}}> 1. Ethnicity Stastics :</div>
                </tr>
                <tr>
                    <td>
                        <Chart
                            height={'300px'}
                            width={'400px'}
                            chartType="PieChart"
                            style={{marginLeft:'20%'}}
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Ethnicity', 'Count'],
                                ['White', demographics.whiteCount],
                                ['Native Hawaiian or Other Pacific Islander', demographics.islanderCount],
                                ['Black or African American', demographics.blackCount],
                                ['Asian', demographics.asianCount],
                                ['White', demographics.nativeCount],
                            ]}
                            rootProps={{ 'data-testid': '1' }}
                        />
                    </td>
                </tr>
                <tr>
                    <div style={{marginLeft:'10%', fontSize:'20px'}}> 2. Veteran Stastics :</div>
                </tr>
                <tr>
                    <Chart
                            height={'300px'}
                            width={'400px'}
                            style={{marginLeft:'20%'}}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Veteran Status', 'Count'],
                                ['Yes', demographics.veteranYes],
                                ['No', demographics.veteranNo],
                            ]}
                            rootProps={{ 'data-testid': '1' }}
                        />
                </tr>
                <tr>
                    <div style={{marginLeft:'10%', fontSize:'20px'}}> 3. Gender Stastics :</div>
                </tr>
                <br/>
                <tr>
                    <td>
                        <div style={{marginLeft:'25%'}}>
                            <div><i class="fas fa-female" style={{height:'100px', width:'100px'}}></i></div> <br/> <div> Female: {demographics.femaleCount} </div>
                        </div>
                    </td>
                    <td>
                        <div style={{marginLeft:'25%'}}>
                            <div><i class="fas fa-male" style={{height:'100px', width:'100px'}}></i> </div> <br/> <div> Male: {demographics.maleCount} </div>
                        </div>
                    </td>
                </tr>
                <br/>
                <br/>
                <tr>
                    <div style={{marginLeft:'10%', fontSize:'20px'}}> 4. Physical Ability Stastics :</div>
                </tr>
                <br/>
                <tr>
                    <td>
                        <div style={{marginLeft:'25%'}}>
                            <div><i class="fas fa-walking" style={{height:'100px', width:'100px'}}></i> </div>Not Disabled: {demographics.disabilityNo}
                        </div>
                    </td>
                    <td>
                        <div style={{marginLeft:'25%'}}>
                            <div><i class="fas fa-wheelchair" style={{height:'100px', width:'100px'}}></i> </div>Disbled: {demographics.disabilityYes}
                        </div>
                    </td>
                </tr>
                <br/>
                
            </table>
            <div>
            
            
            
            </div>
        </div>
        );
    }

    render() {


        var redirectVar = "";

        if (this.state.isRedirect) {
            redirectVar = <Redirect to={{ pathname: `${this.state.redirectPath}/${this.props.location.state._id}`, state: this.props.location.state}} />
        }

        var showDemographicsError = null, showData = [];

        if(this.props.demographics) {
            this.props.demographics.jobDemographics.map((demographic) => {
                showData.push(this.displayData(demographic));
            })
        }
        
        // if(this.props.hiredApplicantsError) {
        //     showHiredApplicants = (
        //         <div className="reviews-row-three">
        //             <div className="reviews-error"> No Applicants Hired So Far! </div>
        //         </div>
        //     );
        // }

        if(this.props.demographicsError) {
            showDemographicsError = (
                <div className="reviews-row-three">
                    <div className="reviews-error"> No Applicants So Far </div>
                </div>
            );
        }

        return (
            <div>
            {redirectVar}
                { (this.props.demographics || this.props.hiredApplicants) ?
                    <div className="overview-all">
                        <Navigation />
                        <div className="analytics-row-one">
                            <img className="company-review-banner" src={require('../../components/images/' + this.props.location.state.logo + '_banner.jpg').default} alt="" />
                            <img className="admin-company-logo" src={require('../../components/images/' + this.props.location.state.logo + '_logo.jpg').default} alt="" />

                            <div className="admin-company-name">{this.props.location.state.name}</div>
                            <table className="analytics-row-one-table">
                                <td> <div className="profile-title" onClick={() => this.redirectHandler("company_reviews")}>Company Reviews</div></td>
                                <td className="profile-titles-selected"><div className="profile-title">Company Stastics</div></td>
                            </table>
                        </div>

                        <div>
                        {showData}
                        </div>
                        
                    </div> : <div className="overview-all">
                    <Navigation />
                    <div className="analytics-row-one">
                        <img className="company-review-banner" src={require('../../components/images/' + this.props.location.state.logo + '_banner.jpg').default} alt="" />
                        <img className="admin-company-logo" src={require('../../components/images/' + this.props.location.state.logo + '_logo.jpg').default} alt="" />

                        <div className="admin-company-name">{this.props.location.state.name}</div>
                        <table className="analytics-row-one-table">
                        <td> <div className="profile-title" onClick={() => this.redirectHandler("company_reviews")}>Reviews per day</div></td>
                           <td className="profile-titles-selected"><div className="profile-title">Company Stastics</div></td>
                        </table>
                    </div>                    
                    {showDemographicsError}
                </div> 
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(" Company Details - Stastics - store:", state.comStore);
    return {
        demographics: state.adminCompanyDetails.demographics || "",
        demographicsError: state.adminCompanyDetails.demographicsError || "",
        hiredApplicants: state.adminCompanyDetails.hiredApplicants || "",
        hiredApplicantsError: state.adminCompanyDetails.hiredApplicantsError || ""
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCompanyHiredApplicants: (company_id) => dispatch(getCompanyHiredApplicants(company_id)),
        getCompanyApplicantDemographics: (company_id) => dispatch(getCompanyApplicantDemographics(company_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetailsStastics);