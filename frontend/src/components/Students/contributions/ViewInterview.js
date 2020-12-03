import React, { Fragment } from 'react';
import Navigation from '../Navigation';
import UtilityBar from '../UtilityBar';

const ViewInterview = ({ location }) => {
  const interview = location.state.data;

  return (
    <Fragment>
      <Navigation />
      <UtilityBar />
      <div className='profile-row-two-row1' style={{ margin: '2% 20%' }}>
        <div className='profile-row-two-inside'>
          <h2>Your Interview Experience</h2>
          <div>
            <div className='overview-review-date'>
              {(interview.date + '').substring(0, 10)}
            </div>
            <table className='overview-reviews-table-all'>
              <tr>
                <td>
                  <table>
                    <tr className='overview-review-headline'>
                      <td>{interview.jobTitle} Interview</td>
                    </tr>
                    <tr
                      style={{
                        fontSize: '13px',
                        color: '#7F7F7F',
                      }}
                    ></tr>

                    <tr>
                      <td>
                        <div className='overview-reviews-pros-cons-title '>
                          <tr>
                            <td>
                              {interview.offerStatus ===
                              'Yes, and I accepted' ? (
                                <div className='row mr-3'>
                                  <div className='interview-green-box'></div>
                                  <div>Accepted</div>
                                </div>
                              ) : interview.offerStatus ===
                                'Yes, but I declined' ? (
                                <div className='row mr-3'>
                                  <div className='interview-yellow-box'></div>
                                  <div>Declined</div>
                                </div>
                              ) : (
                                <div className='row mr-3'>
                                  <div className='interview-red-box'></div>
                                  <div>No Offer</div>
                                </div>
                              )}
                            </td>

                            <td>
                              {interview.overallInterviewExp === 'positive' ? (
                                <div className='row mr-3'>
                                  <div className='interview-green-box'></div>
                                  <div>Positive Experience</div>
                                </div>
                              ) : interview.overallInterviewExp ===
                                'neutral' ? (
                                <div className='row mr-3'>
                                  <div className='interview-yellow-box'></div>
                                  <div>Neutral Experience</div>
                                </div>
                              ) : (
                                <div className='row mr-3'>
                                  <div className='interview-red-box'></div>
                                  <div>Negative Experience</div>
                                </div>
                              )}
                            </td>
                            <td>
                              {interview.difficulty === 'Easy' ? (
                                <div className='row mr-3'>
                                  <div className='interview-green-box'></div>
                                  <div>Easy Interview</div>
                                </div>
                              ) : interview.difficulty === 'Average' ? (
                                <div className='row mr-3'>
                                  <div className='interview-yellow-box'></div>
                                  <div>Average Interview</div>
                                </div>
                              ) : (
                                <div className='row mr-3'>
                                  <div className='interview-red-box'></div>
                                  <div>Difficult Interview</div>
                                </div>
                              )}
                            </td>
                          </tr>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div className='overview-reviews-pros-cons-title'>
                          Interview
                        </div>
                        <br />
                        <div className='overview-reviews-pros-cons'>
                          {' '}
                          {interview.description}{' '}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className='overview-reviews-pros-cons-title'>
                          Interview Questions
                        </div>
                        <br />
                        <div className='overview-reviews-pros-cons'>
                          {' '}
                          {interview.questions}{' '}
                        </div>
                      </td>
                    </tr>
                    {interview.answers ? (
                      <tr>
                        <td>
                          <div className='overview-reviews-pros-cons-title'>
                            Interview Answers
                          </div>
                          <br />
                          <div className='overview-reviews-pros-cons'>
                            {' '}
                            {interview.answers}{' '}
                          </div>
                        </td>
                      </tr>
                    ) : (
                      ''
                    )}
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

export default ViewInterview;
