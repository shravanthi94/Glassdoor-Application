import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/adminCSS.css';
import { getNewCompanyPhotos, approveCompanyPhotos } from '../../actions/admin/images';
import Navigation from './Navigation';
import { BACKEND_URL } from '../../helpers/constants';


class FilterImages extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
        // this.redirectHandler = this.redirectHandler.bind(this);
    }

    componentWillMount() {
        this.props.getNewCompanyPhotos();
        // this.props.getNewCompanyProfilePhotos();
    }

    // redirectHandler = (e) => {
    //     console.log("redirect value: ", e);
    //     var path = "";

    //     if (e == "company_stastics") {
    //         path = "/admin/company/profile"
    //     }
        

    //     this.setState({
    //         isRedirect: true,
    //         redirectPath: path,
    //     })
    // }

    componentWillReceiveProps(nextProps) {
        if (nextProps.companyImagesNew) {
            var { companyImagesNew } = nextProps;

            console.log('FilterImages -> componentWillReceiveProps -> companyImagesNew : ', companyImagesNew);
            this.setState({
                companyImagesNew: companyImagesNew,
                postReviewFilterSuccess:false
            });
        } 
        if (nextProps.companyImagesNewError) {
            var { companyImagesNewError } = nextProps;

            console.log('FilterImages -> componentWillReceiveProps -> companyImagesNewError : ', companyImagesNewError);
            this.setState({
                companyImagesNewError: companyImagesNewError,
                companyImagesNew: null,
                postReviewFilterSuccess:false
            });
        } 

        if (nextProps.postCompanyImageApproval) {
            var { postCompanyImageApproval } = nextProps;

            console.log('FilterImages -> componentWillReceiveProps -> postCompanyImageApproval : ', postCompanyImageApproval);
            this.setState({
                postCompanyImageApprovalSuccess: true,
            });
            this.props.getNewCompanyPhotos();
        }

        if (nextProps.postCompanyImageApprovalError) {
            var { postCompanyImageApprovalError } = nextProps;
            console.log('FilterImages -> componentWillReceiveProps -> postCompanyImageApproval : ', postCompanyImageApprovalError);
            this.setState({
                postCompanyImageApprovalError: true,
            });
            this.props.getNewCompanyPhotos();
        }
        
    }

    rejectImage = (company_id, photo_id, e) => {
        console.log("Reject");
        var data= { status : "rejected" }
        this.props.approveCompanyPhotos (company_id, photo_id, data);
    };

    approveImage = (company_id, photo_id, e) => {
        console.log(company_id,photo_id);
        var data= { status : "approved" }
        this.props.approveCompanyPhotos (company_id, photo_id, data);
    };

    displayImageResults = (adminImagesToApprove) => {
        var cards = [];
        for( var i = 0; i < adminImagesToApprove.length; i++ ) {
            for (var j = 0; j < adminImagesToApprove[i].photos.length; j++) {
                var singleCard = (
                    <div className="reviews-row-two">
                        <table>
                            <tr>
                                <td>
                                    <div className='mt-1 ml-4'>
                                        <img className='rounded float-left p-2 mt-4'
                                        src={`${BACKEND_URL}/company/images/photos/${adminImagesToApprove[i].photos[j].file}`} alt=''
                                        height='200px' width='200px'/>
                                    </div>
                                </td>
                                <td>
                                    <div style={{fontSize:'20px'}}> Company Name : {adminImagesToApprove[i].name}</div>
                                </td>
                                &emsp;
                                <td>
                                    <button style={{marginLeft:'15%'}} className="reviews-approve-button" onClick={this.approveImage.bind(this, adminImagesToApprove[i]._id, adminImagesToApprove[i].photos[j]._id)}>
                                    Approve </button>
                                </td>
                                &emsp;&emsp;&emsp;
                                <td>
                                    <button style={{marginLeft:'15%'}} className="reviews-reject-button" onClick={this.rejectImage.bind(this, adminImagesToApprove[i]._id, adminImagesToApprove[i].photos[j]._id)}>
                                    Reject </button>
                                </td>
                            </tr>
                        </table>
                    </div>
                    );
                cards.push(singleCard);   
            }
        };
        return cards;
      };

    render() {

        var redirectVar = "", showImages = null;

        if(this.props.companyImagesNew) {
            console.log('@@@@@@@@@@@@@@@@@@@ images : ', this.props.companyImagesNew)
            showImages = this.displayImageResults(this.props.companyImagesNew);
        }
        
        if(this.props.companyImagesNewError) {
            showImages = (
                <div className="reviews-row-three">
                    <div className="reviews-error"> No Images to approve! </div>
                </div>
            );
        }

        return (
            <div>
            {redirectVar}
                { (this.props.companyImagesNew) ?
                    <div className="overview-all">
                        <Navigation />
                        <div className="reviews-row-one">
                            <img className="reviews-banner" src={require('../../components/images/review_banner.jpg').default} alt="" />
                            <img className="reviews-logo" src={require('../../components/images/review_logo.jpg').default} alt="" />
                            <div className="reviews-title"> Approve Company Photos uploaded by Student</div>
                        </div>

                        {showImages}
                        
                        
                    </div> : <div className="overview-all">
                    <Navigation />
                    <div className="reviews-row-one">
                        <img className="reviews-banner" src={require('../../components/images/review_banner.jpg').default} alt="" />
                        <img className="reviews-logo" src={require('../../components/images/review_logo.jpg').default} alt="" />
                        <div className="reviews-title"> Approve Company Photos uploaded by Student</div>
                    </div>

                    {showImages}
                    
                    
                </div> 
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(" FilterReviews - store:", state.comStore);
    return {
        companyImagesNew: state.adminImagesFilter.companyImages || "",
        companyImagesNewError: state.adminImagesFilter.companyImagesError || "",
        postCompanyImageApproval: state.adminImagesFilter.postCompanyImageApproval || "",
        postCompanyImageApprovalError: state.adminImagesFilter.postCompanyImageApprovalError || "",
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getNewCompanyPhotos: () => dispatch(getNewCompanyPhotos()),
        approveCompanyPhotos: (company_id, photo_id, data) => dispatch(approveCompanyPhotos(company_id, photo_id,data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterImages);