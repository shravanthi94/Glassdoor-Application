  /*import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/studentJobsNav.css';
import { getAllJobs, getJobDetails } from '../../actions/student/jobpostings';
import StarRatings from 'react-star-ratings'
import { Fragment } from 'react';


class StudentJobs extends Component {

    constructor(props) { 
        super(props);
    }

    componentDidMount() {
        this.props.getAllJobs();
    }

    render(){
        let displayJobs = (jobs) => {
        return jobs.map((job) => {
          return (
            <div className="jobs-row-two">
                <table className="jobs-table-all">
                    <tr>
                        <td>
                            <table style={{marginLeft:'15%'}}>
                            <br/>
                                <tr className="job-headline"><td>"{job.title}"</td></tr>
                                <tr><td><b>company: </b> &emsp; {job.city}</td></tr>
                                <tr><td><b>city: </b> &emsp; {job.city}</td></tr>
                                <tr><td><b>state: </b> &emsp; {job.city}</td></tr>
                                <tr><td><b>posted on: </b> &emsp; {job.city}</td></tr>
                                
                            </table>
                            <br/>
                            
                        </td>
                    </tr>
                </table>
            </div>
          );
        });
      };
    
    return {
        displayJobs({})
    }

  }

}

const mapStateToProps = (state) => {
    
    return {
        jobs: state.studentJobs.jobs || [],
        
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllJobs: () => dispatch(getAllJobs()),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentJobs);



<button style={{marginLeft:'15%'}} className="jobs-approve-button" onClick={this.approvejob} name={job._id}>
                            Approve
                        </button>
                        &emsp; &emsp;
                        <button style={{marginLeft:'15%'}} className="jobs-reject-button" onClick={this.rejectjob} name={job._id}>
                            Reject
                        </button>

  */