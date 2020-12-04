import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/overview.css';
import { getCompanyReviews } from '../../actions/company/getCompanyReviews';
import { PieChart } from 'react-minimal-pie-chart';
import StarRatings from 'react-star-ratings';
import { Redirect } from 'react-router';
import Navigation from './Navigation';
import UtilityBar from './UtilityBar';
import CompanySideBar from '../Common/CompanySideBar';
import Pagination from 'react-js-pagination';
import { addMostHelpfulVote } from '../../actions/company/addMostHelpfulVote';

class CompanyReviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      isRedirect: false,
      redirectPath: '',
      company_id: this.props.location.state.company_id,
      data: '',
      activePage: 1,
      reviews: [],
    };

    this.redirectHandler = this.redirectHandler.bind(this);
    this.mostHelpfulVotesHandler = this.mostHelpfulVotesHandler.bind(this);
  }

  componentDidMount() {
    var data = {
      companyId: this.props.company.overview._id,
      studentId: this.props.studentId,
    };
    this.props.getCompanyReviews(data);
  }

  componentDidUpdate(prevProps) {
    console.log('Did update:', this.props.reviews);
    if (this.state.reviews !== this.props.reviews) {
      this.setState({ reviews: this.props.reviews});
    }

    console.log('Did update: ', this.state.reviews);
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  mostHelpfulVotesHandler(review){
    console.log("most helpful ", review);
    var data = {
      review_id : review._id,
      company_id: this.props.company.overview._id,
      student_id: this.props.studentId
    }
    this.props.postMostHelpfulVote(data);
  }

  redirectHandler = (e) => {
    console.log('redirect value: ', e);
    var path = '';
    var data = '';

    if (e === 'overview') {
      path = '/companyOverview';
      data = this.props.company.overview._id;
    } else if (e === 'add-reviews') {
      path = '/addCompanyReview';
      data = {
        company_id: this.props.company.overview._id,
        logo: this.props.company.overview.logo,
        company_name: this.props.company.overview.name,
      };
    } else if (e === 'interviews') {
      path = '/companyInterviews';
      data = this.props.company.overview._id;
    } else if (e === 'reviews') {
      path = '/companyReviews';
    } else if (e === 'salaries') {
      path = '/companySalaries';
    } else if (e === 'add-salary') {
      path = '/addCompanySalary';
      data = {
        company_id: this.props.company.overview._id,
        logo: this.props.company.overview.logo,
        company_name: this.props.company.overview.name,
      };
    } else if (e === 'jobs') {
      path = '/companyJobs';
      data = this.props.company.overview._id;
    } else if (e === 'photos') {
      path = '/companyPhotos';
      data = this.props.company.overview._id;
    }

    this.setState({
      isRedirect: true,
      redirectPath: path,
      data: data,
    });
  };

  render() {
    var company_name = '';
    if (this.props.company) {
      company_name = this.props.company.overview.name;
    }
    var redirectVar = '';

    if (this.state.isRedirect) {
      redirectVar = (
        <Redirect
          to={{
            pathname: this.state.redirectPath,
            state: { data: this.state.data },
          }}
        />
      );
    }

    const indexOfLast = this.state.activePage * 2;
    const indexOfFirst = indexOfLast - 2;

    return (
      <div>
        {redirectVar}
        {this.props.company ? (
          <div className='overview-all'>
            {/* <div style={{ backgroundColor: "#13aa41", height: "150px" }}> Search bar </div> */}
            <Navigation />
            <UtilityBar />
            <div className='profile-row-one'>
              <img
                className='company-banner-blur'
                src={
                  require('../../components/images/' +
                    this.props.company.overview.logo +
                    '_banner.jpg').default
                }
                alt=''
              />
              <img
                className='overview-logo'
                src={
                  require('../../components/images/' +
                    this.props.company.overview.logo +
                    '_logo.jpg').default
                }
                alt=''
              />
              <div className='overview-company-name'>{company_name}</div>
              <table className='profile-row-one-table'>
                <td>
                  <div className='profile-counts'>
                    <i class='fas fa-bullseye'></i>
                  </div>
                  <div
                    className='profile-title'
                    onClick={() => this.redirectHandler('overview')}
                  >
                    Overview&emsp;
                  </div>
                </td>
                <td className='profile-titles-selected'>
                  <div className='profile-counts'>
                    {this.props.company.overview.numberOfReviews}
                  </div>
                  <div className='profile-title'>Reviews&emsp;</div>
                </td>
                <td>
                  <div className='profile-counts'>10</div>
                  <div
                    className='profile-title'
                    onClick={() => this.redirectHandler('jobs')}
                  >
                    Jobs&emsp;
                  </div>
                </td>
                <td>
                  <div className='profile-counts'>
                    {this.props.company.overview.numberOfSalaries}
                  </div>
                  <div
                    className='profile-title'
                    onClick={() => this.redirectHandler('salaries')}
                  >
                    Salaries&emsp;
                  </div>
                </td>
                <td>
                  <div className='profile-counts'>
                    {this.props.company.overview.numberOfInterviews}
                  </div>
                  <div
                    className='profile-title'
                    onClick={() => this.redirectHandler('interviews')}
                  >
                    Interviews&emsp;
                  </div>
                </td>
                <td>
                  <div className='profile-counts'>12</div>
                  <div className='profile-title'>Benefits&emsp;</div>
                </td>
                <td>
                  <div className='profile-counts'>6</div>
                  <div
                    className='profile-title'
                    onClick={() => this.redirectHandler('photos')}
                  >
                    Photos&emsp;
                  </div>
                </td>
              </table>
              <div className='profile-add-button-position'>
                <div
                  className='overview-profile-add-button'
                  onClick={() => this.redirectHandler('add-reviews')}
                >
                  <i class='fa fa-plus'></i> &nbsp;Add Review
                </div>
              </div>
            </div>
            <div className='side-by-side-overview'>
              <div className='profile-row-two'>
                <div className='profile-row-two-row1'>
                  <div className='profile-row-two-inside'>
                    <div style={{ fontSize: '22px', color: '#0D0D0D' }}>
                      {company_name} Reviews
                    </div>

                    <table className='overview-charts'>
                      <tr>
                        <td>
                          <PieChart
                            data={[
                              {
                                title: 'One',
                                value: this.props.company.overview
                                  .overAllRating,
                                color: '#13aa41',
                              },
                              {
                                title: 'Two',
                                value:
                                  100 -
                                  this.props.company.overview.overAllRating,
                                color: '#dee0e3',
                              },
                            ]}
                            totalValue={100}
                            lineWidth={25}
                            style={{ height: '70px' }}
                            label={({ dataEntry }) =>
                              dataEntry.title === 'One'
                                ? dataEntry.value + '%'
                                : ''
                            }
                            labelStyle={{
                              fontSize: '22px',
                              fontFamily: 'sans-serif',
                              fill: '#13aa41',
                            }}
                            labelPosition={0}
                          />{' '}
                        </td>
                        <td> Over All Rating</td>
                        <td>
                          <PieChart
                            data={[
                              {
                                title: 'One',
                                value: this.props.company.overview
                                  .recommendationRating,
                                color: '#13aa41',
                              },
                              {
                                title: 'Two',
                                value:
                                  100 -
                                  this.props.company.overview
                                    .recommendationRating,
                                color: '#dee0e3',
                              },
                            ]}
                            totalValue={100}
                            lineWidth={25}
                            style={{ height: '70px' }}
                            label={({ dataEntry }) =>
                              dataEntry.title === 'One'
                                ? dataEntry.value + '%'
                                : ''
                            }
                            labelStyle={{
                              fontSize: '22px',
                              fontFamily: 'sans-serif',
                              fill: '#13aa41',
                            }}
                            labelPosition={0}
                          />
                        </td>
                        <td>Recommend to a Friend</td>
                        <td>
                          <PieChart
                            data={[
                              {
                                title: 'One',
                                value: this.props.company.overview
                                  .ceoApprovalRating,
                                color: '#13aa41',
                              },
                              {
                                title: 'Two',
                                value:
                                  100 -
                                  this.props.company.overview.ceoApprovalRating,
                                color: '#dee0e3',
                              },
                            ]}
                            totalValue={100}
                            lineWidth={25}
                            style={{ height: '70px' }}
                            label={({ dataEntry }) =>
                              dataEntry.title === 'One'
                                ? dataEntry.value + '%'
                                : ''
                            }
                            labelStyle={{
                              fontSize: '22px',
                              fontFamily: 'sans-serif',
                              fill: '#13aa41',
                            }}
                            labelPosition={0}
                          />
                        </td>
                        <td>Approve of CEO</td>
                      </tr>
                    </table>

                    <hr className='overview-hr' />
                    {this.state.reviews && this.state.reviews.length !== 0 ? (
                      this.state.reviews
                        .slice(indexOfFirst, indexOfLast)
                        .map((review) => (
                          <div>
                            <div className='overview-review-date'>
                              {(review.date + '').substring(0, 10)}
                             { review.mostHelpfulVotes !== 0 ? <div style={{marginLeft:"400px"}}> Helpful ({review.mostHelpfulVotes}) </div> : "" }
                            </div>
                            <table className='overview-reviews-table-all'>
                              <tr>
                                <td style={{ verticalAlign: 'top' }}>
                                  <img
                                    className='overview-logo-jobs'
                                    src={
                                      require('../../components/images/' +
                                        this.props.company.overview.logo +
                                        '_logo.jpg').default
                                    }
                                    alt=''
                                  />
                                </td>
                                <td>
                                  <table>
                                    <tr className='overview-review-headline'>
                                      <td>"{review.headline}"</td>
                                    </tr>
                                    <tr className='overview-review-star-ratings'>
                                      {' '}
                                      <td>
                                        {review.overAllRating}.0{' '}
                                        <StarRatings
                                          rating={+review.overAllRating}
                                          starDimension='20px'
                                          starSpacing='1px'
                                          starRatedColor='#0caa41'
                                          numberOfStars={5}
                                          name='rating'
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>{review.comment}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className='overview-reviews-pros-cons-title'>
                                          Pros:
                                        </div>
                                        <br />
                                        <div className='overview-reviews-pros-cons'>
                                          {' '}
                                          {review.pros}{' '}
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className='overview-reviews-pros-cons-title'>
                                          Cons:
                                        </div>
                                        <br />
                                        <div className='overview-reviews-pros-cons'>
                                          {' '}
                                          {review.cons}{' '}
                                        </div>
                                      </td>
                                    </tr>
                                    <br />
                                  </table>
                                </td>
                              </tr>
                            </table>
                            <div>
                              <div className='overview-social-media-logos'>
                                <i class='fab fa-facebook-f'></i>
                              </div>
                              <div className='overview-social-media-logos'>
                                <i class='fab fa-twitter'></i>
                              </div>
                              <div className='overview-social-media-logos'>
                                <i class='far fa-envelope'></i>
                              </div>
                              <div className='overview-social-media-logos'>
                                <i class='fas fa-link'></i>
                              </div>
                              <div className='overview-helpful-button'>
                                Helpful
                              </div>
                            </div>
                            <hr className='overview-hr' />
                          </div>
                        ))
                    ) : (
                      <div> No Reviews Yet</div>
                    )}
                    {this.props.company.reviews &&
                    this.props.company.reviews.length !== 0 ? (
                      <div className='overview-see-all-reviews'>
                        See All 328 Reviews{' '}
                      </div>
                    ) : (
                      ''
                    )}

                    <div>
                      <Pagination
                        itemClass='page-item'
                        linkClass='page-link'
                        activeClass='gd-blue'
                        activeLinkClass='paginate'
                        activePage={this.state.activePage}
                        itemsCountPerPage={2}
                        totalItemsCount={this.state.reviews.length}
                        pageRangeDisplayed={3}
                        onChange={this.handlePageChange.bind(this)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <CompanySideBar />
            </div>
          </div>
        ) : (
          <div> No Reviews for the Company Profile</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(' CompanyReviews - store:', state.comStore);
  return {
    company: state.comStore.company || '',
    reviews: state.comStore.reviews || '',
    studentId: state.studentProfile.profile._id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanyReviews: (payload) => dispatch(getCompanyReviews(payload)),
    postMostHelpfulVote: (payload) => dispatch(addMostHelpfulVote(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyReviews);
