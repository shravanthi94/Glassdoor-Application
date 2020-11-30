import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/adminCSS.css';
import { getCompanyReviews } from '../../actions/admin/company';
import { Redirect } from 'react-router';
import Navigation from './Navigation';
import StarRatings from 'react-star-ratings'

class CompanyDetailsReviews extends Component {

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
        this.props.getCompanyReviews(this.props.location.state._id);
    }

    redirectHandler = (e) => {
        console.log("redirect value: ", e);
        var path = "";

        if (e == "company_stastics") {
            path = "/admin/companyStastics"
        }
        

        this.setState({
            isRedirect: true,
            redirectPath: path,
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.companyReviews) {
            var { companyReviews } = nextProps;

            console.log('CompanyDetailsReviews -> componentWillReceiveProps -> companyReviews : ', companyReviews);
            this.setState({
                companyReviews: companyReviews,
            });
        } 
        if (nextProps.companyReviewsError) {
            var { companyReviewsError } = nextProps;

            console.log('CompanyDetailsReviews -> componentWillReceiveProps -> companyReviewsError : ', companyReviewsError);
            this.setState({
                companyReviewsError: companyReviewsError,
                companyReviews: null,
            });
        }
    }

    displayReviewResults = (adminReviewsToApprove) => {
        return adminReviewsToApprove.map((review) => {
            var approvalcolor = 'text-danger';
            if (review.approvalStatus === 'approved') {
                approvalcolor = 'text-success';
              }
          return (
            <div className="company-reviews-row-two">
                <table className="company-reviews-table-all">
                    <tr>
                        <td>
                            <table style={{marginLeft:'15%'}}>
                            <br/>
                                <tr className="review-headline"><td>"{review.headline}"</td></tr>
                                <tr className="review-star-ratings"> <td>{review.overAllRating}.0 <StarRatings rating={+review.overAllRating} starDimension="18px" starSpacing="1px" starRatedColor="#0caa41" numberOfStars={5} name='rating' /></td></tr>
                                <tr><td>{review.comment}</td></tr>
                                <tr><td><b>Pros: </b> &emsp; {review.pros}</td></tr>
                                <tr><td><b>Cons: </b> &emsp; {review.cons}</td></tr>
                                <tr className={approvalcolor}><td><b>Approval Status: </b> &emsp;{review.approvalStatus}</td></tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
          );
        });
    };

    render() {


        var redirectVar = "";

        if (this.state.isRedirect) {
            redirectVar = <Redirect to={{ pathname: `${this.state.redirectPath}/${this.props.location.state._id}`, state: this.props.location.state}} />
        }

        var showReviews = null;

        if(this.props.companyReviews) {
            showReviews = this.displayReviewResults(this.props.companyReviews);
        }
        
        if(this.props.companyReviewsError) {
            showReviews = (
                <div className="reviews-row-three">
                    <div className="reviews-error"> No Reviews to approve! </div>
                </div>
            );
        }

        return (
            <div>
            {redirectVar}
                { (this.props.companyReviews) ?
                    <div className="overview-all">
                        <Navigation />
                        <div className="analytics-row-one">
                            <img className="company-review-banner" src={require('../../components/images/' + this.props.location.state.logo + '_banner.jpg').default} alt="" />
                            <img className="admin-company-logo" src={require('../../components/images/' + this.props.location.state.logo + '_logo.jpg').default} alt="" />

                            <div className="admin-company-name">{this.props.location.state.name}</div>
                            <table className="analytics-row-one-table">
                                <td className="profile-titles-selected"><div className="profile-title">Company Reviews</div></td>
                                <td><div className="profile-title" onClick={() => this.redirectHandler("company_stastics")}>Company Stastics</div></td>
                            </table>
                        </div>

                        {showReviews}
                        
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

                    {showReviews}
                    
                    
                </div> 
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(" Company Details - Reviews - store:", state.comStore);
    return {
        companyReviews: state.adminCompanyDetails.companyReviews || "",
        companyReviewsError: state.adminCompanyDetails.companyReviewsError || ""
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCompanyReviews: (company_id) => dispatch(getCompanyReviews(company_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetailsReviews);