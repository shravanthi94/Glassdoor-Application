import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Chart } from "react-google-charts";
import { connect } from 'react-redux';
import { getCurrentCompanyJobs, getJobDetailById } from '../../../actions/company/companyjobpostings';
import CmpNav2 from '../CmpNav2';
import Pagination from 'react-js-pagination';

const CompanyStatistics = ({getCurrentCompanyJobs, getJobDetailById, companyjobs:{companyjobs, companyjob, loading}}) => {
    useEffect(()=>{
        getCurrentCompanyJobs()
    }, [])

    const [activePage, setactivePage] = useState(1);

  // Logic for displaying current menu items
  const indexOfLast = activePage * 4;
  const indexOfFirst = indexOfLast - 4;
  // const currentResults = results.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => {
    setactivePage(pageNumber);
  };


    const jobDetail = (jobId) =>{ 
        getJobDetailById(jobId)
      }

    let curYear = new Date().getFullYear()
    console.log("current year is ",curYear)

    let curYearJobs = 0
    let lastYearJobs = 0
    if (companyjobs)
    {
        curYearJobs = companyjobs.filter (job=>String(job.date).includes(String(curYear)))
        lastYearJobs = companyjobs.filter (job=>String(job.date).includes(String(curYear-1)))
        console.log ("curYearJobs length is",curYearJobs.length)
        console.log ("lastYearJobs length is",lastYearJobs.length)
    }

    // applicants hired, applied, selected statistics
    let applicantsHired =0
    let applicantsRejected =0
    // let applicantsApplied = 0
    if(companyjob)
    {
        applicantsHired  = (companyjob.applicants.filter(applicant=>(applicant.applicantStatus==="hired"))).length
        console.log("company applicants", applicantsHired)
        applicantsRejected = (companyjob.applicants.filter(applicant=>(applicant.applicantStatus==="rejected"))).length
        console.log("company applicants", applicantsRejected)
        // applicantsApplied = (companyjob.applicants.filter(applicant=>(applicant.applicantStatus==="applied"))).length
        // console.log("company applicants", applicantsApplied)
    }

    // applicants applied statistics by Demographics

    let AmericanIndianorAlaskaNative =0
    let Asian =0
    let BlackorAfricanAmerican =0
    let NativeHawaiianorOtherPacificIslander =0
    let White =0
    let Male =0
    let Female =0
    let Disabled =0
    let NonDisabled=0
    let Veteran =0
    let NonVeteran =0

    if(companyjob)
    {
        AmericanIndianorAlaskaNative  = (companyjob.applicants.filter(applicant=>(applicant.student.demographics.ethnicity==="American Indian or Alaska Native"))).length
        console.log("company applicants by AmericanIndian...", AmericanIndianorAlaskaNative)
        Asian  = (companyjob.applicants.filter(applicant=>(applicant.student.demographics.ethnicity==="Asian"))).length
        console.log("company applicants by Asian...", Asian)
        BlackorAfricanAmerican  = (companyjob.applicants.filter(applicant=>(applicant.student.demographics.ethnicity==="Black or African American"))).length
        console.log("company applicants by BlackAfrican...", BlackorAfricanAmerican)
        NativeHawaiianorOtherPacificIslander  = (companyjob.applicants.filter(applicant=>(applicant.student.demographics.ethnicity==="Native Hawaiian or Other Pacific Islander"))).length
        console.log("company applicants by NativeHawaiian...", NativeHawaiianorOtherPacificIslander)
        White  = (companyjob.applicants.filter(applicant=>(applicant.student.demographics.ethnicity==="White"))).length
        console.log("company applicants by White...", White)
        Male  = (companyjob.applicants.filter(applicant=>(applicant.student.demographics.gender==="Male"))).length
        console.log("company applicants by White...", Male)
        Female  = (companyjob.applicants.filter(applicant=>(applicant.student.demographics.gender==="Female"))).length
        console.log("company applicants by White...", Female)
        Disabled  = (companyjob.applicants.filter(applicant=>(applicant.student.demographics.disability==="Yes"))).length
        console.log("company applicants by White...", Disabled)
        NonDisabled  = (companyjob.applicants.filter(applicant=>(applicant.student.demographics.disability==="No"))).length
        console.log("company applicants by White...", NonDisabled)
        Veteran  = (companyjob.applicants.filter(applicant=>(applicant.student.demographics.veteran==="Yes"))).length
        console.log("company applicants by White...", Veteran)
        NonVeteran  = (companyjob.applicants.filter(applicant=>(applicant.student.demographics.veteran==="No"))).length
        console.log("company applicants by White...", NonVeteran)

    }


    return (
        <Fragment>
            <CmpNav2/>          
            <div className="contentholder-Jobs-company mt-3">
                 <div className="contentholder-Jobs-company-sub">
                 <div className='joblisting-title-company'>Current Year Jobs: {companyjobs? curYearJobs.length : '0'}</div>
               </div> 
            </div>

            <div className='contentholder-Jobs-company mt-1'>
                <div className="company-cards-3columns">
                {companyjobs? curYearJobs.slice(indexOfFirst, indexOfLast).map(job=>(
                            <Fragment>
                                <div className="company-cards-column-one" style={{ width: '29rem', border:'1px solid #888' }}>
                                {/* <div className="card-body"> */}
                                    <div className="joblisting-date-company ">{(job.date + "").substring(0, 10)}</div>
                                        <table className="overview-reviews-table-all">
                                            <tr>
                                                <td>
                                                    <table>
                                                        <tr><td> <h6 >{job.name}</h6></td><td><h6 className='card-title'>{job.salary}</h6></td></tr>
                                                        {/* <!-- Button trigger modal --> */}
                                                        <tr><td> <h6 className="joblisting-title-company">{job.title}</h6></td></tr>
                                                        <tr><td><h6>{job.city}, {job.state}</h6></td></tr>
                                                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={(e)=> jobDetail(job._id)}>
                                                        View Stats
                                                        </button>
                                                        

                                                        {/* <!-- Modal --> */}
                                                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"
                                                        >
                                                            <div class="modal-dialog modal-lg" role="document">
                                                                <div class="modal-content">
                                                                    <div class="modal-header">
                                                                        <h5 class="modal-title" id="exampleModalLabel">Applicants Statistics Report: {companyjob && companyjob.applicants.length>0? companyjob.title: <p style={{color: "red"}}> No Stats Available</p>}</h5>
                                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                            <span aria-hidden="true">&times;</span>
                                                                        </button>
                                                                    </div>
                                                                    <div class="modal-body">
                                                                        {companyjob? 
                                                                        <Fragment>
                                                                        <div style={{ display: 'flex' }}>
                                                                    
                                                                            <Chart
                                                                                width={'500px'}
                                                                                height={'300px'}
                                                                                chartType="PieChart"
                                                                                loader={<div>Loading Chart</div>}
                                                                                data={[
                                                                                        ['Applicants', 'Status per year'],
                                                                                        ['Applied', companyjob.applicants.length],
                                                                                        ['Rejected', applicantsRejected],
                                                                                        ['Hired', applicantsHired],
                                                                                    ]}
                                                                                options={{
                                                                                            title: 'Applicants by Application Status',
                                                                                        }}
                                                                                rootProps={{ 'data-testid': '1' }}
                                                                            />
                                                                           
                                                                            <Chart
                                                                                width={'500px'}
                                                                                height={'300px'}
                                                                                chartType="PieChart"
                                                                                loader={<div>Loading Chart</div>}
                                                                                data={[
                                                                                        ['Applicants', 'applicants categorized by ethnicity'],
                                                                                        ['American Indian or Alaska Native', AmericanIndianorAlaskaNative],
                                                                                        ['Asian', Asian],
                                                                                        ['Black or African American', BlackorAfricanAmerican],
                                                                                        ['Native Hawaiian or Other PacificIslander', NativeHawaiianorOtherPacificIslander],
                                                                                        ['White', White]
                                                                                    ]}
                                                                                options={{
                                                                                            title: 'Applicants by Ethnicity',
                                                                                        }}
                                                                                rootProps={{ 'data-testid': '1' }}
                                                                            />
                                                                            
                                                                            <Chart
                                                                                width={'500px'}
                                                                                height={'300px'}
                                                                                chartType="PieChart"
                                                                                loader={<div>Loading Chart</div>}
                                                                                data={[
                                                                                        ['Applicants', 'applicants categorized by Gender'],
                                                                                        ['Male', Male],
                                                                                        ['Female', Female],
                                                                                    ]}
                                                                                options={{
                                                                                            title: 'Applicants by Gender',
                                                                                        }}
                                                                                rootProps={{ 'data-testid': '1' }}
                                                                            />
                                                                        </div> 
                                                                        <br/>
                                                                        <div style={{ display: 'flex' }}>
                                                                       
                                                                        <Chart
                                                                                width={'500px'}
                                                                                height={'300px'}
                                                                                chartType="PieChart"
                                                                                loader={<div>Loading Chart</div>}
                                                                                data={[
                                                                                        ['Applicants', 'Applicants categorized by Disability'],
                                                                                        ['Disabled', Disabled],
                                                                                        ['non-disabled', NonDisabled],
                                                                            
                                                                                    ]}
                                                                                options={{
                                                                                            title: 'Applicants categorized by Disability',
                                                                                        }}
                                                                                rootProps={{ 'data-testid': '1' }}
                                                                            />
                                                                           
                                                                            <Chart
                                                                                width={'500px'}
                                                                                height={'300px'}
                                                                                chartType="PieChart"
                                                                                loader={<div>Loading Chart</div>}
                                                                                data={[
                                                                                        ['Applicants', 'Applicants categorized by Veteran status'],
                                                                                        ['Veteran', Veteran],
                                                                                        ['non-Veteran', NonVeteran],
                                                                                        
                                                                                    ]}
                                                                            
                                                                                options={{
                                                                                            title: 'Applicants categorized by Veteran status',
                                                                                        }}
                                                                                rootProps={{ 'data-testid': '1' }}
                                                                            />
                                                                        </div>
                                                                        </Fragment>: <p>No Stats Available</p>}
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                            {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    {/* </div> */}
                                </div>
                            </Fragment> )) : <p> No jobs this year</p>
                        }
                        

                </div>
                <div>
                <Pagination
                    itemClass='page-item'
                    linkClass='page-link'
                    // activeClass='gd-blue'
                    activeLinkClass='paginate'
                    activePage={activePage}
                    itemsCountPerPage={4}
                    totalItemsCount={curYearJobs.length}
                    pageRangeDisplayed={10}
                    onChange={handlePageChange}/>
                </div>
                
                
            </div>

            <div className="contentholder-Jobs-company mt-3">
                 <div className="contentholder-Jobs-company-sub">
                 <div className='joblisting-title-company'>Last Year Jobs: {companyjobs? lastYearJobs.length : '0'}</div>
               </div> 
            </div>
            <div className='contentholder-Jobs-company mt-1'>
                <div className="company-cards-3columns">
                {companyjobs? lastYearJobs.slice(indexOfFirst, indexOfLast).map(job=>(
                            <Fragment>
                                <div className="company-cards-column-one" style={{ width: '29rem', border:'1px solid #888' }}>
                                {/* <div className="card-body"> */}
                                    <div className="joblisting-date-company ">{(job.date + "").substring(0, 10)}</div>
                                        <table className="overview-reviews-table-all">
                                            <tr>
                                                <td>
                                                    <table>
                                                        <tr><td> <h6 className="card-title">{job.name}</h6></td><td><h6 className='card-title'>{job.salary}</h6></td></tr>
                                                        <tr><td><h6 className="card-title joblisting-title-company">{job.title}</h6></td></tr>
                                                        <tr><td><h6 className="card-title">{job.city}, {job.state}</h6></td></tr>
                                                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={(e)=> jobDetail(job._id)}>
                                                        View Stats
                                                        </button>
                                                        {/* <!-- Modal --> */}
                                                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                            <div class="modal-dialog" role="document">
                                                                <div class="modal-content">
                                                                    <div class="modal-header">
                                                                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                            <span aria-hidden="true">&times;</span>
                                                                        </button>
                                                                    </div>
                                                                    <div class="modal-body">
                                                                        {companyjob? 
                                                                        <Fragment>
                                                                        <div style={{ display: 'flex' }}>
                                                                            <Chart
                                                                                width={'500px'}
                                                                                height={'300px'}
                                                                                chartType="PieChart"
                                                                                loader={<div>Loading Chart</div>}
                                                                                data={[
                                                                                        ['Applicants', 'Status per year'],
                                                                                        ['Applied', companyjob.applicants.length],
                                                                                        ['Rejected', applicantsRejected],
                                                                                        ['Hired', applicantsHired],
                                                                                    ]}
                                                                                options={{
                                                                                            title: 'Applicants',
                                                                                        }}
                                                                                rootProps={{ 'data-testid': '1' }}
                                                                            />
                                                                            <Chart
                                                                                width={'500px'}
                                                                                height={'300px'}
                                                                                chartType="PieChart"
                                                                                loader={<div>Loading Chart</div>}
                                                                                data={[
                                                                                        ['Applicants', 'applicants categorized by ethnicity'],
                                                                                        ['American Indian or Alaska Native', AmericanIndianorAlaskaNative],
                                                                                        ['Asian', Asian],
                                                                                        ['Black or African American', BlackorAfricanAmerican],
                                                                                        ['Native Hawaiian or Other PacificIslander', NativeHawaiianorOtherPacificIslander],
                                                                                        ['White', White]
                                                                                    ]}
                                                                                options={{
                                                                                            title: 'Applicants',
                                                                                        }}
                                                                                rootProps={{ 'data-testid': '1' }}
                                                                            />
                                                                            <Chart
                                                                                width={'500px'}
                                                                                height={'300px'}
                                                                                chartType="PieChart"
                                                                                loader={<div>Loading Chart</div>}
                                                                                data={[
                                                                                        ['Applicants', 'applicants categorized by Gender'],
                                                                                        ['Male', Male],
                                                                                        ['Female', Female],
                                                                                    ]}
                                                                                options={{
                                                                                            title: 'Applicants by Gender',
                                                                                        }}
                                                                                rootProps={{ 'data-testid': '1' }}
                                                                            />

                                                                        </div> 
                                                                        <br/>
                                                                        <div style={{ display: 'flex' }}>
                                                                        <Chart
                                                                                width={'500px'}
                                                                                height={'300px'}
                                                                                chartType="PieChart"
                                                                                loader={<div>Loading Chart</div>}
                                                                                data={[
                                                                                        ['Applicants', 'Applicants categorized by Disability'],
                                                                                        ['Yes', Disabled],
                                                                                        ['No', NonDisabled],
                                                                            
                                                                                    ]}
                                                                                options={{
                                                                                            title: 'Applicants categorized by Disability',
                                                                                        }}
                                                                                rootProps={{ 'data-testid': '1' }}
                                                                            />
                                                                            <Chart
                                                                                width={'500px'}
                                                                                height={'300px'}
                                                                                chartType="PieChart"
                                                                                loader={<div>Loading Chart</div>}
                                                                                data={[
                                                                                        ['Applicants', 'Applicants categorized by Veteran status'],
                                                                                        ['Yes', Veteran],
                                                                                        ['No', NonVeteran],
                                                                                        
                                                                                    ]}
                                                                                options={{
                                                                                            title: 'Applicants categorized by Veteran status',
                                                                                        }}
                                                                                rootProps={{ 'data-testid': '1' }}
                                                                            />
                                                                        </div>

                                                                        </Fragment>
                                                                        : <p>No Status Available</p>}
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                            {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    {/* </div> */}
                                </div>
                            </Fragment> )) : <p> No jobs this year</p>
                        }
                        <br/>
                        
                </div>
                <Pagination
                                    itemClass='page-item'
                                    linkClass='page-link'
                                    // activeClass='gd-blue'
                                    activeLinkClass='paginate'
                                    activePage={activePage}
                                    itemsCountPerPage={4}
                                    totalItemsCount={lastYearJobs.length}
                                    pageRangeDisplayed={10}
                                    onChange={handlePageChange}
                                />

            </div>
        </Fragment>
    )
}

CompanyStatistics.propTypes = {
    getCurrentCompanyJobs: PropTypes.func.isRequired,
    getJobDetailById: PropTypes.func.isRequired,
    companyjobs: PropTypes.object.isRequired,

}

const mapStateToProps = state =>({
    companyjobs: state.companyjobs
})

export default connect(mapStateToProps, {getCurrentCompanyJobs, getJobDetailById})(CompanyStatistics)
