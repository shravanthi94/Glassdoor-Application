import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/adminCSS.css';
import { getCompanyHiredApplicants, getCompanyApplicantDemographics } from '../../actions/admin/company';
import { Redirect } from 'react-router';
import Navigation from './Navigation';
import StarRatings from 'react-star-ratings'

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

    displayHiredApplicants = (hiredApplicants) => {
        return (
            <div className="reviews-row-three">
            <div className="reviews-error" style={{marginLeft:'-10%'}}> Number of Applicants Hired So Far : {hiredApplicants.hiredApplicants}</div> 
            </div>
        );
    };

    displayDemographics = (demographics) => {
        return (
            <div className="reviews-row-four">
            No Applicants Hired So Far! 
            </div>
          );
    };

    render() {


        var redirectVar = "";

        if (this.state.isRedirect) {
            redirectVar = <Redirect to={{ pathname: `${this.state.redirectPath}/${this.props.location.state._id}`, state: this.props.location.state}} />
        }

        var showHiredApplicants = null, showDemographics = null;

        if(this.props.hiredApplicants) {
            showHiredApplicants = this.displayHiredApplicants(this.props.hiredApplicants);
        }

        if(this.props.demographics) {
            showDemographics = this.displayDemographics(this.props.demographics);
        }
        
        if(this.props.hiredApplicantsError) {
            showHiredApplicants = (
                <div className="reviews-row-three">
                    <div className="reviews-error"> No Applicants Hired So Far! </div>
                </div>
            );
        }

        if(this.props.demographicsError) {
            showDemographics = (
                <div className="reviews-row-four">
                    <div className="reviews-error-two"> No Applicants So Far, hence cant show Demographics! </div>
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

                        {showHiredApplicants}
                        {showDemographics}
                        
                    </div> : <div className="overview-all">
                    <Navigation />
                    <div className="analytics-row-one">
                        <img className="company-review-banner" src={require('../../components/images/' + this.props.location.state.logo + '_banner.jpg').default} alt="" />
                        <img className="admin-company-logo" src={require('../../components/images/' + this.props.location.state.logo + '_logo.jpg').default} alt="" />

                        <div className="admin-company-name">{this.props.location.state.name}</div>
                        <table className="analytics-row-one-table">
                            <td className="profile-titles-selected"><div className="profile-title">Reviews per day</div></td>
                            <td><div className="profile-title" onClick={() => this.redirectHandler("company_stastics")}>Company Stastics</div></td>
                        </table>
                    </div>                    
                    
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