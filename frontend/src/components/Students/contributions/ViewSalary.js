import React, { Fragment } from 'react';
import Navigation from '../Navigation';
import UtilityBar from '../UtilityBar';

const ViewSalary = ({ location }) => {
  const salary = location.state.data;

  return (
    <Fragment>
      <Navigation />
      <UtilityBar />
      <div className='profile-row-two-row1' style={{ margin: '2% 30%' }}>
        <div className='profile-row-two-inside'>
          <h2>Your Salary Review</h2>
          <div>
            <table>
              <tr>
                <td
                  className='company-salary-job-title'
                  style={{ fontSize: '30px', paddingTop: '7%' }}
                >
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
                  </tr>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ViewSalary;
