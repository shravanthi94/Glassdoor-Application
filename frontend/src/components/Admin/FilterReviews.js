import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/adminCSS.css';
import { getNewReviews, postApproveReview } from '../../actions/admin/reviews';
import Navigation from './Navigation';
import StarRatings from 'react-star-ratings'


class FilterReviews extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    componentWillMount() {
        this.props.getNewReviews();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.adminReviewsToApprove) {
            var { adminReviewsToApprove } = nextProps;

            console.log('FilterReviews -> componentWillReceiveProps -> adminReviewsToApprove : ', adminReviewsToApprove);
            this.setState({
                adminReviewsToApprove: adminReviewsToApprove,
                postReviewFilterSuccess:false
            });
        } 
        if (nextProps.adminReviewsToApproveError) {
            var { adminReviewsToApproveError } = nextProps;

            console.log('FilterReviews -> componentWillReceiveProps -> adminReviewsToApproveError : ', adminReviewsToApproveError);
            this.setState({
                adminReviewsToApproveError: adminReviewsToApproveError,
                adminReviewsToApprove: null,
                postReviewFilterSuccess:false
            });
        } 

        if (nextProps.postReview) {
            var { postReview } = nextProps;

            console.log('FilterReviews -> componentWillReceiveProps -> postReview : ', postReview);
            this.setState({
                postReviewFilterSuccess: true,
            });
            this.props.getNewReviews();
        }
        
    }

    rejectReview = (e) => {
        console.log("Reject");
        var data= { approvalStatus : "rejected" }
        this.props.postApproveReview (e.target.name, data);
    };

    approveReview = (e) => {
        console.log("Approval");
        var data= { approvalStatus : "approved" }
        this.props.postApproveReview (e.target.name, data);
    };

    displayReviewResults = (adminReviewsToApprove) => {
        return adminReviewsToApprove.map((review) => {
          return (
            <div className="reviews-row-two">
                <table className="reviews-table-all">
                    <tr>
                        <td>
                            <table style={{marginLeft:'15%'}}>
                            <br/>
                                <tr className="review-headline"><td>"{review.headline}"</td></tr>
                                <tr className="review-star-ratings"> <td>{review.overAllRating}.0 <StarRatings rating={+review.overAllRating} starDimension="18px" starSpacing="1px" starRatedColor="#0caa41" numberOfStars={5} name='rating' /></td></tr>
                                <tr><td>{review.comment}</td></tr>
                                <tr><td><b>Pros: </b> &emsp; {review.pros}</td></tr>
                                <tr><td><b>Cons: </b> &emsp; {review.cons}</td></tr>
                            </table>
                            <br/>
                            <button style={{marginLeft:'15%'}} className="reviews-approve-button" onClick={this.approveReview} name={review._id}>
                                Approve
                            </button>
                            &emsp; &emsp;
                            <button style={{marginLeft:'15%'}} className="reviews-reject-button" onClick={this.rejectReview} name={review._id}>
                                Reject
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
          );
        });
      };
    
       


    render() {

        var redirectVar = "", showReviews = null;

        if(this.props.adminReviewsToApprove) {
            showReviews = this.displayReviewResults(this.props.adminReviewsToApprove);
        }
        
        if(this.props.adminReviewsToApproveError) {
            showReviews = (
                <div className="reviews-row-three">
                    <div className="reviews-error"> No Reviews to approve! </div>
                </div>
            );
        }

        return (
            <div>
            {redirectVar}
                { (this.props.adminReviewsToApprove) ?
                    <div className="overview-all">
                        <Navigation />
                        <div className="reviews-row-one">
                            <img className="reviews-banner" src={require('../../components/images/review_banner.jpg').default} alt="" />
                            <img className="reviews-logo" src={require('../../components/images/review_logo.jpg').default} alt="" />
                            <div className="reviews-title"> Approve Reviews</div>
                        </div>

                        {showReviews}
                        
                        
                    </div> : <div className="overview-all">
                    <Navigation />
                    <div className="reviews-row-one">
                        <img className="reviews-banner" src={require('../../components/images/review_banner.jpg').default} alt="" />
                        <img className="reviews-logo" src={require('../../components/images/review_logo.jpg').default} alt="" />
                        <div className="reviews-title"> Approve Reviews</div>
                    </div>

                    {showReviews}
                    
                    
                </div> 
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(" FilterReviews - store:", state.comStore);
    return {
        adminReviewsToApprove: state.adminReviewsFilter.newReviews || "",
        adminReviewsToApproveError: state.adminReviewsFilter.newReviewsError || "",
        postReview: state.adminReviewsFilter.postReviewApproval || "",
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getNewReviews: () => dispatch(getNewReviews()),
        postApproveReview: (review_id, data) => dispatch(postApproveReview(review_id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterReviews);