import React, { Fragment } from 'react';
import Navigation from '../Navigation';
import UtilityBar from '../UtilityBar';
import StarRatings from 'react-star-ratings';

const ViewReview = ({ location }) => {
  const review = location.state.data;

  return (
    <Fragment>
      <Navigation />
      <UtilityBar />
      <div className='profile-row-two-row1' style={{ margin: '2% 20%' }}>
        <div className='profile-row-two-inside'>
          <h2>Your Review</h2>
          <div>
            <div className='overview-review-date'>
              {(review.date + '').substring(0, 10)}
            </div>
            <table className='overview-reviews-table-all'>
              <tr>
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
            <div className='row'>
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
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ViewReview;
