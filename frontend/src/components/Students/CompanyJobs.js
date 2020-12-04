import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/job.css';
import { getCompanyJobs } from '../../actions/company/getCompanyJobs';
import { Redirect } from 'react-router';
import Navigation from './Navigation';
import UtilityBar from './UtilityBar';
import CompanySideBar from '../Common/CompanySideBar';
import Pagination from 'react-js-pagination';
import { BACKEND_URL } from '../../helpers/constants';
import defaultImage from '../images/default_banner.jpg';
import defaultLogo from '../images/default_logo.png';

class CompanyJobs extends Component {
  constructor(props) {
    super(props);

    console.log('jobs: ', this.props.location.state);

    this.state = {
      submitted: false,
      isRedirect: false,
      redirectPath: '',
      company_id: this.props.company.overview._id,
      data: '',
      jobs: this.props.jobs,
      filteredJobs: this.props.jobs,
      searchName: '',
      searchLocation: '',
      redirectToJob: false,
      jobDetail: '',
      activePage: 1,
    };

    this.redirectHandler = this.redirectHandler.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.searchNameHandler = this.searchNameHandler.bind(this);
    this.searchLocationHandler = this.searchLocationHandler.bind(this);
    this.redirectJobHandler = this.redirectJobHandler.bind(this);
  }

  componentDidMount() {
    this.props.getCompanyJobs(this.props.company.overview._id);
  }

  componentDidUpdate(prevProps) {
    if (this.state.jobs !== this.props.jobs) {
      this.setState({
        jobs: this.props.jobs,
        filteredJobs: this.props.jobs,
      });
    }
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  searchNameHandler = (e) => {
    this.setState({
      searchName: e.target.value,
    });
  };
  searchLocationHandler = (e) => {
    this.setState({
      searchLocation: e.target.value,
    });
  };

  redirectJobHandler = (e) => {
    this.setState({
      redirectToJob: true,
      jobDetail: e,
    });
  };

  searchHandler = (e) => {
    e.preventDefault();

    console.log(
      'search handler:',
      this.state.searchName,
      this.state.searchLocation,
    );
    var filtered = [];

    if (
      (!this.state.searchName || this.state.searchName.length === 0) &&
      (!this.state.searchLocation || this.state.searchLocation.length === 0)
    ) {
      filtered = this.state.jobs;
    } else {
      this.state.jobs.map((job) => {
        if (this.state.searchName && !this.state.searchLocation) {
          if (
            job.title
              .toLowerCase()
              .search(this.state.searchName.toLowerCase()) !== -1 ||
            job.salary
              .toLowerCase()
              .search(this.state.searchName.toLowerCase()) !== -1
          ) {
            filtered.push(job);
          }
        } else if (this.state.searchLocation && !this.state.searchName) {
          if (
            job.city
              .toLowerCase()
              .search(this.state.searchLocation.toLowerCase()) !== -1 ||
            job.state
              .toLowerCase()
              .search(this.state.searchLocation.toLowerCase()) !== -1
          ) {
            filtered.push(job);
          }
        } else {
          if (
            job.title
              .toLowerCase()
              .search(this.state.searchName.toLowerCase()) !== -1 &&
            (job.city
              .toLowerCase()
              .search(this.state.searchLocation.toLowerCase()) !== -1 ||
              job.state
                .toLowerCase()
                .search(this.state.searchLocation.toLowerCase()) !== -1)
          ) {
            filtered.push(job);
          }
        }
      });
    }
    this.setState({ filteredJobs: filtered });
  };

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

    if (this.state.redirectToJob) {
      redirectVar = (
        <Redirect
          to={{
            pathname: '/companyJobDetails',
            state: { data: this.state.jobDetail },
          }}
        />
      );
    }

    const indexOfLast = this.state.activePage * 5;
    const indexOfFirst = indexOfLast - 5;

    return (
      <div>
        {redirectVar}
        {this.props.company ? (
          <div className='overview-all'>
            {/* <div style={{ backgroundColor: "#13aa41", height: "150px" }}> Search bar </div> */}
            <Navigation />
            <UtilityBar />
            <div className='profile-row-one'>
              {/* <img
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
              /> */}


{this.props.company.overview.profilePic.image ? (
                <img
                  className='company-banner-blur'
                  src={`${BACKEND_URL}/company/profilepic/${this.props.company.overview.profilePic.image}`}
                  alt=''
                />
              ) : (
                <img
                  className='company-banner-blur'
                  src={defaultImage}
                  alt='company banner'
                />
              )}
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
              )}


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
                <td className='profile-titles-selected'>
                  <div className='profile-counts'>10</div>
                  <div className='profile-title'>Jobs&emsp;</div>
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
                {/* <div
                  className='overview-profile-add-button'
                  onClick={() => this.redirectHandler('add-salary')}
                >
                  <i class='fa fa-plus'></i> &nbsp;Add Salary
                </div> */}
              </div>
            </div>
            <div className='side-by-side-overview'>
              <div className='profile-row-two'>
                <div className='profile-row-two-row1'>
                  <div
                    className='profile-row-two-inside'
                    style={{ width: '650px' }}
                  >
                    <div style={{ fontSize: '22px', color: '#0D0D0D' }}>
                      {company_name} Jobs
                    </div>

                    <form>
                      <table className='search-table'>
                        <tbody>
                          <tr className='search-row'>
                            <td className='search-column'>
                              <input
                                type='text'
                                onChange={this.searchNameHandler}
                                class='search-bar'
                                name='searchName'
                                placeholder='Search job titles'
                              />
                            </td>
                            <td className='search-column'>
                              <input
                                type='text'
                                onChange={this.searchLocationHandler}
                                class='search-bar'
                                name='searchLocation'
                                placeholder='City, State or Zip'
                              />
                            </td>
                            <td className='search-column'>
                              {' '}
                              <button
                                style={{ marginLeft: '15%' }}
                                className='company-find-job-button'
                                onClick={this.searchHandler}
                              >
                                Find Jobs
                              </button>{' '}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </form>
                    <br />
                    <br />
                    <hr className='overview-hr' />

                    <form></form>

                    <table className='job-postings-table'>
                      {this.state.filteredJobs &&
                      this.state.filteredJobs !== 0 ? (
                        this.state.filteredJobs
                          .slice(indexOfFirst, indexOfLast)
                          .map((job) => (
                            <tr>
                              <td>
                                <div>
                                  {/* <img
                                    className='job-postings-logo'
                                    src={
                                      require('../../components/images/' +
                                        this.props.company.overview.logo +
                                        '_logo.jpg').default
                                    }
                                    alt=''
                                  /> */}

{this.props.company.overview.logo ? (
                                    <img
                                      className='overview-logo-jobs'
                                      src={
                                        require('../../components/images/' +
                                          this.props.company.overview.logo +
                                          '_logo.jpg').default
                                      }
                                      alt=''
                                    />
                                  ) : (
                                    <img
                                      className='overview-logo-jobs'
                                      src={defaultLogo}
                                      alt='company banner'
                                    />
                                  )}


                                </div>
                              </td>
                              <td className='company-salary-job-title'>
                                <div
                                  onClick={() => this.redirectJobHandler(job)}
                                >
                                  {job.title}
                                </div>
                                <div>
                                  <span
                                    style={{
                                      color: 'black',
                                      fontWeight: 'normal',
                                    }}
                                  >
                                    {company_name}
                                  </span>
                                  <span className='job-city-state'>
                                    {' '}
                                    - {job.city}, {job.state}
                                  </span>
                                </div>
                                <div
                                  style={{
                                    fontWeight: 'normal',
                                    fontSize: '15px',
                                    color: 'black',
                                  }}
                                >
                                  {job.salary}
                                </div>
                              </td>
                              <td>
                                <div className='joblisting-date-company-date company-job-heart-icon'>
                                  <i class='far fa-heart'></i>
                                </div>
                                <div className='joblisting-date-company-date '>
                                  {(job.date + '').substring(0, 10)}
                                </div>
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td>
                            <div> No Job Postings Yets</div>
                          </td>
                        </tr>
                      )}
                    </table>
                    <br />
                    <div>
                      <Pagination
                        itemClass='page-item'
                        linkClass='page-link'
                        activeClass='gd-blue'
                        activeLinkClass='paginate'
                        activePage={this.state.activePage}
                        itemsCountPerPage={5}
                        totalItemsCount={this.state.filteredJobs.length}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                      />
                    </div>

                    {this.props.company.reviews &&
                    this.props.company.reviews.length !== 0 ? (
                      <div className='overview-see-all-reviews'>
                        See All Salaries{' '}
                      </div>
                    ) : (
                      ''
                    )}
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
  console.log(' CompanyJobs - store:', state.comStore);
  return {
    company: state.comStore.company || '',
    jobs: state.comStore.jobs || '',
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanyJobs: (payload) => dispatch(getCompanyJobs(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyJobs);
