import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/overview.css';
import { getCompanyProfile } from '../../actions/company/getCompanyProfile';
import { PieChart } from 'react-minimal-pie-chart';
import StarRatings from 'react-star-ratings';
import { Redirect } from 'react-router';
import Navigation from './Navigation';

class CompanyOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      isRedirect: false,
      redirectPath: '',
      company_id: '',
    };
    // var date = new Date();
    // console.log("overview date: ", (date+"").substring(4,16));
    this.redirectHandler = this.redirectHandler.bind(this);
  }

  componentDidMount() {
    this.props.getCompanyProfile('5fb2f87d828aa81479d846a1');
  }

  redirectHandler = (e) => {
    console.log('redirect value: ', e);
    var path = '';

    if (e == 'reviews') {
      path = '/companyReviews';
    } else if (e == 'interviews') {
      path = '/companyInterviews';
    } else if (e == 'salaries') {
      path = '/companySalaries';
    } else if (e == 'photos') {
      path = '/companyPhotos';
    }

    this.setState({
      isRedirect: true,
      redirectPath: path,
      company_id: this.props.company.overview._id,
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

    return (
      <div>
        {redirectVar}
        {this.props.company ? (
          <div className='overview-all'>
            {/* <div style={{ backgroundColor: "#13aa41", height: "150px" }}> Search bar </div>
             */}
            <Navigation />
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
                  <div className='profile-counts'>4.0k</div>
                  <div
                    className='profile-title'
                    onClick={() => this.redirectHandler('reviews')}
                  >
                    Reviews&emsp;
                  </div>
                </td>
                <td>
                  <div className='profile-counts'>867</div>
                  <div className='profile-title'>Jobs&emsp;</div>
                </td>
                <td>
                  <div className='profile-counts'>8.4k</div>
                  <div
                    className='profile-title'
                    onClick={() => this.redirectHandler('salaries')}
                  >
                    Salaries&emsp;
                  </div>
                </td>
                <td>
                  <div className='profile-counts'>1.2k</div>
                  <div
                    className='profile-title'
                    onClick={() => this.redirectHandler('interviews')}
                  >
                    Interviews&emsp;
                  </div>
                </td>
                <td>
                  <div className='profile-counts'>1.8k</div>
                  <div className='profile-title'>Benefits&emsp;</div>
                </td>
                <td>
                  <div className='profile-counts'>92</div>
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
                              dataEntry.title == 'One'
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
                              dataEntry.title == 'One'
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
                              dataEntry.title == 'One'
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
                    {this.props.company.reviews &&
                    this.props.company.reviews.length !== 0 ? (
                      this.props.company.reviews.map((review) => (
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
                    {this.props.company.reviews &&
                    this.props.company.reviews.length !== 0 ? (
                      <div
                        className='overview-see-all-reviews'
                        onClick={() => this.redirectHandler('reviews')}
                      >
                        See All 328 Reviews{' '}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>

              <div className='profile-row-two-column2'>
                <div className='profile-row-two-column2-row1'>
                  <div
                    style={{
                      fontSize: '20px',
                      marginLeft: '20px',
                      marginTop: '20px',
                    }}
                  >
                    {company_name} Locations
                  </div>
                  <table className='overview-locations'>
                    <tr>Bengaluru (India)</tr> <br />
                    <tr>Blanchardstown (Ireland)</tr> <br />
                    <tr>Chandler (AZ)</tr> <br />
                    <tr>Chennia (India)</tr> <br />
                    <tr>Conshohocken (PA)</tr> <br />
                  </table>
                  <hr className='overview-hr' style={{ width: '300px' }} />
                  <div className='all-locations'>See All Locations </div>
                </div>
                <div className='profile-row-two-column2-row2'>
                  <div
                    style={{
                      fontSize: '20px',
                      marginLeft: '20px',
                      marginTop: '20px',
                    }}
                  >
                    {' '}
                    Jobs You May Like{' '}
                  </div>
                  <table className='overview-jobs-like'>
                    <tr>
                      <td>
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
                      <td style={{ marginLeft: '20px' }}>
                        <tr>Software Engineer Intern</tr>
                        <tr className='overview-job-location'>
                          {company_name} - San Jose, CA
                        </tr>
                      </td>
                    </tr>
                    <tr>
                      <td>
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
                        <tr className='overview-job-title'>
                          Software Engineer I
                        </tr>
                        <tr className='overview-job-location'>
                          {company_name} - San Jose, CA
                        </tr>
                      </td>
                    </tr>
                    <tr>
                      <td>
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
                        <tr className='overview-job-title'>
                          Software Engineer II
                        </tr>
                        <tr className='overview-job-location'>
                          {company_name} - San Jose, CA
                        </tr>
                      </td>
                    </tr>
                    <tr>
                      <td>
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
                        <tr className='overview-job-title'>
                          Software Engineer III
                        </tr>
                        <tr className='overview-job-location'>
                          {company_name} - San Jose, CA
                        </tr>
                      </td>
                    </tr>
                    <tr>
                      <td>
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
                        <tr className='overview-job-title'>
                          Machine Learning Engineer{' '}
                        </tr>
                        <tr className='overview-job-location'>
                          {company_name} - San Jose, CA
                        </tr>
                      </td>
                    </tr>
                    <tr>
                      <td>
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
                        <tr className='overview-job-title'>
                          Back End Software Engineer
                        </tr>
                        <tr className='overview-job-location'>
                          {company_name} - San Jose, CA
                        </tr>
                      </td>
                    </tr>
                    <tr>
                      <td>
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
                        <tr className='overview-job-title'>Product Manager</tr>
                        <tr className='overview-job-location'>
                          {company_name} - San Jose, CA
                        </tr>
                      </td>
                    </tr>
                  </table>
                  <br />
                </div>
              </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanyProfile: (payload) => dispatch(getCompanyProfile(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyOverview);
