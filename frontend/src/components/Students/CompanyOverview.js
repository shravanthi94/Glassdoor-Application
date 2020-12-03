import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/overview.css';
import { getCompanyProfile } from '../../actions/company/getCompanyProfile';
import { PieChart } from 'react-minimal-pie-chart';
import StarRatings from 'react-star-ratings';
import { Redirect } from 'react-router';
import Navigation from './Navigation';
import UtilityBar from './UtilityBar';
import CompanySideBar from '../Common/CompanySideBar';
import Pagination from 'react-js-pagination';

class CompanyOverview extends Component {
  constructor(props) {
    super(props);

    console.log('company overview: ', props);

    this.state = {
      submitted: false,
      isRedirect: false,
      redirectPath: '',
      company_id: this.props.location.state.data,
      activePage: 1,
    };
    // var date = new Date();
    // console.log("overview date: ", (date+"").substring(4,16));
    this.redirectHandler = this.redirectHandler.bind(this);
  }

  componentDidMount() {
    this.props.getCompanyProfile(this.state.company_id);
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  redirectHandler = (e) => {
    console.log('redirect value: ', e);
    var path = '';
    var data = '';

    if (e === 'overview') {
      path = '/companyOverview';
      data = this.props.company.overview._id;
    } else if (e === 'interviews') {
      path = '/companyInterviews';
      data = this.props.company.overview._id;
    } else if (e === 'reviews') {
      path = '/companyReviews';
    } else if (e === 'salaries') {
      path = '/companySalaries';
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
            state: { company_id: this.state.company_id },
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
            {/* <div style={{ backgroundColor: "#13aa41", height: "150px" }}> Search bar </div>
             */}
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
                <td className='profile-titles-selected'>
                  <div className='profile-counts'>
                    <i class='fas fa-bullseye'></i>
                  </div>
                  <div className='profile-title'>Overview&emsp;</div>
                </td>
                <td>
                  <div className='profile-counts'>
                    {this.props.company.overview.numberOfReviews}
                  </div>
                  <div
                    className='profile-title'
                    onClick={() => this.redirectHandler('reviews')}
                  >
                    Reviews&emsp;
                  </div>
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
            </div>
            <div className='side-by-side-overview'>
              <div className='profile-row-two'>
                <div className='profile-row-two-row1'>
                  <div className='profile-row-two-inside'>
                    <div
                      style={{
                        fontSize: '20px',
                        color: '#0D0D0D',
                        marginBottom: '20px',
                      }}
                    >
                      {company_name} Overview
                    </div>

                    <table className='overview-table'>
                      <tr>
                        <td>Website:</td>
                        <td>{this.props.company.overview.website}</td>
                        <td>Headquarters:</td>
                        <td>{this.props.company.overview.headquarters}</td>
                      </tr>
                      <tr>
                        <td>Size:</td>
                        <td>{this.props.company.overview.size}</td>
                        <td>Founded:</td>
                        <td>{this.props.company.overview.founded}</td>
                      </tr>
                      <tr>
                        <td>Type:</td>
                        <td>{this.props.company.overview.type}</td>
                        <td>Industry:</td>
                        <td>{this.props.company.overview.industry}</td>
                      </tr>
                      <tr>
                        <td>Revenue:</td>
                        <td>{this.props.company.overview.revenue}</td>
                        <td>Email:</td>
                        <td>{this.props.company.overview.email}</td>
                      </tr>
                    </table>

                    <div className='overview-description'>
                      {this.props.company.overview.description}
                    </div>
                    <div className='overview-mission'>
                      {' '}
                      <span className='overview-mission-title'>Mission: </span>
                      <span>{this.props.company.overview.mission}</span>
                    </div>

                    <hr className='overview-hr' />
                    <div
                      style={{
                        marginTop: '20px',
                        fontSize: '22px',
                        color: '#0D0D0D',
                      }}
                    >
                      Glassdoor Awards
                    </div>
                    <br />
                    <div style={{ marginTop: '20px' }}>
                      <span style={{ fontSize: '30px', color: '#13aa41' }}>
                        <i class='fas fa-trophy'></i>
                      </span>
                      <span style={{ fontSize: '18px', color: '#404040' }}>
                        <span>&emsp;Top CEOs:</span>
                        <span style={{ color: '#1861BF' }}>
                          &nbsp;2019 (#34)
                        </span>
                      </span>
                    </div>
                    <hr className='overview-hr' />
                  </div>
                </div>
                <div className='profile-row-two-row2'>
                  <div className='profile-row-three-inside'>
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
                    {this.props.company.overview.featuredreviews &&
                    this.props.company.overview.featuredreviews.length !== 0 ? (
                      this.props.company.overview.featuredreviews
                        .slice(indexOfFirst, indexOfLast)
                        .map((review) => (
                          <div>
                            <div className='overview-review-date'>
                              {(review.date + '').substring(0, 10)}
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
                                  </table>
                                </td>
                              </tr>
                            </table>
                            <hr className='overview-hr' />
                          </div>
                        ))
                    ) : (
                      <div> No Reviews Yets</div>
                    )}
                    {this.props.company.featuredreviews &&
                    this.props.company.featuredreviews.length !== 0 ? (
                      <div
                        className='overview-see-all-reviews'
                        onClick={() => this.redirectHandler('reviews')}
                      >
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
                        totalItemsCount={
                          this.props.company.overview.featuredreviews.length
                        }
                        pageRangeDisplayed={10}
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
          <div> No Company Profile</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(' CompanyOverview - store:', state.comStore);
  return {
    company: state.comStore.company || '',
    student: state.studentProfile.profile._id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanyProfile: (payload) => dispatch(getCompanyProfile(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyOverview);
