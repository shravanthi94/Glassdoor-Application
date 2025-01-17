import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/salaries.css';
import { getCompanyReviews } from '../../actions/company/getCompanyReviews';
import { Redirect } from 'react-router';
import Navigation from './Navigation';
import UtilityBar from './UtilityBar';
import CompanySideBar from '../Common/CompanySideBar';
import Pagination from 'react-js-pagination';
import { BACKEND_URL } from '../../helpers/constants';
import defaultImage from '../images/default_banner.jpg';
import defaultLogo from '../images/default_logo.png';

class CompanySalaries extends Component {
  constructor(props) {
    super(props);

    console.log('salaries: ', this.props.location.state.company_id);
    this.state = {
      submitted: false,
      isRedirect: false,
      redirectPath: '',
      company_id: this.props.location.state.company_id,
      data: '',
      activePage: 1,
    };

    this.redirectHandler = this.redirectHandler.bind(this);
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
                <td>
                  <div className='profile-counts'>10</div>
                  <div
                    className='profile-title'
                    onClick={() => this.redirectHandler('jobs')}
                  >
                    Jobs&emsp;
                  </div>
                </td>
                <td className='profile-titles-selected'>
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
                  onClick={() => this.redirectHandler('add-salary')}
                >
                  <i class='fa fa-plus'></i> &nbsp;Add Salary
                </div>
              </div>
            </div>
            <div className='side-by-side-overview'>
              <div className='profile-row-two'>
                <div className='profile-row-two-row1'>
                  <div className='profile-row-two-inside'>
                    <div style={{ fontSize: '22px', color: '#0D0D0D' }}>
                      {company_name} Salaries
                    </div>

                    <div
                      style={{
                        fontSize: '15px',
                        color: '#505863',
                        marginTop: '15px',
                      }}
                    >
                      How much do PayPal employees make? Glassdoor has salaries,
                      wages, tips, bonuses, and hourly pay based upon employee
                      reports and estimates.
                    </div>
                    <div
                      style={{
                        fontSize: '18px',
                        color: '#0D0D0D',
                        marginTop: '15px',
                      }}
                    >
                      Find {company_name} Salaries by Job Title
                    </div>
                    <div
                      style={{
                        fontSize: '15px',
                        color: '#505863',
                        marginTop: '15px',
                      }}
                    >
                      {' '}
                      Many PayPal employees have shared their salaries on
                      Glassdoor. Select your job title and find out how much you
                      could make at PayPal.
                    </div>

                    <hr className='overview-hr' />

                    <form></form>

                    {this.props.company.overview.salary &&
                    this.props.company.overview.salary !== 0 ? (
                      this.props.company.overview.salary
                        .slice(indexOfFirst, indexOfLast)
                        .map((salary) => (
                          <table>
                            <tr>
                              <td className='company-salary-job-title'>
                                {salary.jobTitle}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <tr className='company-salary-job-details-row'>
                                  <td>
                                    <tr className='company-salary-job-details'>
                                      {salary.avgTotalPay}
                                    </tr>
                                    <tr className='company-salary-job-details-title'>
                                      Avg. Total Pay/yr
                                    </tr>
                                  </td>
                                  <td>
                                    <tr className='company-salary-job-details'>
                                      {salary.baseSalary}
                                    </tr>
                                    <tr className='company-salary-job-details-title'>
                                      Base Pay/yr
                                    </tr>
                                  </td>
                                  <td>
                                    <tr className='company-salary-job-details'>
                                      {salary.bonuses}
                                    </tr>
                                    <tr className='company-salary-job-details-title'>
                                      Additional Pay/yr
                                    </tr>
                                  </td>
                                  <td>
                                    <tr className='company-salary-job-details-full'>
                                      Full Pay Details
                                      <div className='company-salary-arrow'>
                                        <i class='fa fa-angle-right'></i>
                                      </div>
                                    </tr>
                                    <tr className='company-salary-job-details-title'>
                                      Based on more salaries
                                    </tr>
                                  </td>
                                </tr>
                              </td>
                            </tr>

                            <hr className='overview-hr' />
                          </table>
                        ))
                    ) : (
                      <div> No Reviews Yets</div>
                    )}
                    {this.props.company.reviews &&
                    this.props.company.reviews.length !== 0 ? (
                      <div className='overview-see-all-reviews'>
                        See All Salaries{' '}
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
                        itemsCountPerPage={5}
                        totalItemsCount={
                          this.props.company.overview.salary.length
                        }
                        pageRangeDisplayed={5}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanyReviews: (payload) => dispatch(getCompanyReviews(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanySalaries);
