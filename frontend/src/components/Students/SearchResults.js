import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../Spinner/spinner';
import Navigation from './Navigation';
import UtilityBar from './UtilityBar';
import { companySearchResults } from '../../actions/student/search';
import '../CSS/studentLandingPage.css';

const SearchResults = ({
  match,
  companySearchResults,
  search: { results, reviewCount, loading },
}) => {
  const searchData = match.params.data;
  const query = match.params.query;

  useEffect(() => {
    companySearchResults(searchData, query);
  }, [companySearchResults, query, searchData]);

  const displayResults = () => {
    return results.map((each) => {
      return (
        <Fragment>
          {' '}
          <div class='card' style={{ width: '700px' }}>
            <div class='card-body'>
              <div class='container'>
                <div class='row'>
                  <div class='col-sm'>
                    {/* <Link
                      class='student-card-title'
                      to={`/student/companyView/${each._id}`}
                    > */}
                    {query === 'JOBS' ? (
                      <Link
                        to={{
                          pathname: '/companyOverview',
                          state: { data: each.company._id },
                        }}
                      >
                        <div className='student-card-title'>{each.name} </div>
                      </Link>
                    ) : (
                      <Link
                        to={{
                          pathname: '/companyOverview',
                          state: { data: each._id },
                        }}
                      >
                        <div className='student-card-title'>{each.name} </div>
                      </Link>
                    )}
                    {query === 'JOBS' && each.company ? (
                      <Fragment>
                        <h6 className='mt-2'>
                          {(each.company.overAllRating * 5) / 100}{' '}
                          <StarRatings
                            rating={+(each.company.overAllRating * 5) / 100}
                            starDimension='20px'
                            starSpacing='1px'
                            starRatedColor='#0caa41'
                            numberOfStars={5}
                            name='rating'
                          />
                        </h6>
                        <h6 class='card-subtitle my-2 text-muted'>
                          {each.company.location}
                        </h6>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <h6 className='mt-2'>
                          {(each.overAllRating * 5) / 100}{' '}
                          <StarRatings
                            rating={+(each.overAllRating * 5) / 100}
                            starDimension='20px'
                            starSpacing='1px'
                            starRatedColor='#0caa41'
                            numberOfStars={5}
                            name='rating'
                          />
                        </h6>
                        <h6 class='card-subtitle my-2 text-muted'>
                          {each.location}
                        </h6>
                      </Fragment>
                    )}
                    <br /> <br />
                    <h6 class='card-subtitle mb-2 text-muted'>{each.email}</h6>
                  </div>
                  <div class='col-sm'>
                    <br />
                    <p>
                      <strong className='h6'>
                        &emsp;&emsp;{' '}
                        {query === 'JOBS'
                          ? each.company.numberOfReviews
                          : each.numberOfReviews}{' '}
                        &emsp; &emsp; &emsp; &emsp;{' '}
                        {query === 'JOBS'
                          ? each.company.numberOfInterviews
                          : each.numberOfInterviews}{' '}
                        &emsp;&emsp; &emsp;{' '}
                        {query === 'JOBS'
                          ? each.company.numberOfSalaries
                          : each.numberOfSalaries}
                      </strong>
                    </p>
                    {/* <br /> */}
                    <p>&emsp;Reviews &emsp;Interviews &emsp;Salaries</p>
                    <br />
                    <Link
                      className='profile-btn btn custom-btn-1'
                      to='/student/company/review'
                    >
                      Add a Review
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
        </Fragment>
      );
    });
  };

  return loading || !results ? (
    spinner
  ) : (
    <Fragment>
      <Navigation />
      <div className='container-1'>
        <UtilityBar />
        <div className='student-bottom-panel'>
          <div className='search-result-head'>
            <h1 className='pt-4 student-results-heading'>
              {' '}
              Showing results for{' '}
              <strong class='capitalize'>{searchData}</strong>
            </h1>
            <p>Showing 1–10 of 550 Companies</p>
          </div>
          <div>{displayResults()}</div>
        </div>
      </div>
    </Fragment>
  );
};

SearchResults.propTypes = {
  companySearchResults: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  search: state.studentSearch,
});

export default connect(mapStateToProps, {
  companySearchResults,
})(SearchResults);
