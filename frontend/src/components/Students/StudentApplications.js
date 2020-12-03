import { connect } from 'react-redux';
import React, { Component , Fragment} from 'react';
import { getApplications, withdrawApplications } from '../../actions/student/applications';
import Navigation from './Navigation';
import UtilityBar from './UtilityBar';
class StudentApplications extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
        // this.redirectHandler = this.redirectHandler.bind(this);
    }

    componentWillMount() {
        this.props.getApplications(localStorage.getItem("id"));
    }



    componentWillReceiveProps(nextProps) {
        if (nextProps.applications) {
            var { applications } = nextProps;

            console.log('in std apps componentWillReceiveProps :: applications ', applications);
            this.setState({
                applications: applications,
            });
        } 
        if (nextProps.applicationsError) {
            var { applicationsError } = nextProps;

            console.log('in std apps componentWillReceiveProps:: companyImagesNewError : ', applicationsError);
            this.setState({
                applicationsError: applicationsError,
                applications: null,
                
            });
        } 

        if (nextProps.withdraw) {
            var { withdraw } = nextProps;

            console.log('in std apps componentWillReceiveProps :: withdraw : ', withdraw);
            this.setState({
                withdraw: withdraw,
            });
            this.props.getApplications(localStorage.getItem("id"));
        }

        if (nextProps.withdrawError) {
            var { withdrawError } = nextProps;
            console.log('FilterImages -> componentWillReceiveProps -> withdrawError : ', withdrawError);
            this.setState({
                withdrawError: true,
            });
            this.props.getApplications(localStorage.getItem("id"));
        }
        
    }

    withdrawApplication = (application_id, job_id, e) => {
        console.log("withdraw");
        var data= { applicantStatus : "withdraw" }
        this.props.withdrawApplications(application_id, job_id, data);
    };

    displayApplications  = (applications) => {
        var cards = [];
        for( var i = 0; i < applications.jobPostings.length; i++ ) {
            for (var j = 0; j < applications.jobPostings[i].applications.length; j++) {
                var button = null;
                if (applications.jobPostings[i].applications[j].applicantStatus !== 'withdraw' ) {
                    var button = (<button style={{marginLeft:'15%'}} className="reviews-approve-button" onClick={this.withdrawApplication.bind(this, applications.jobPostings[i].applications[j]._id, applications.jobPostings[i]._id)}>
                    Withdraw </button>)
                } else {
                    var button = <div style={{fontSize:'20px', marginLeft:'10%', color:'red'}}> Application Withdrawn </div>
                }
                var singleCard = (
                    <div className="reviews-row-two" style={{height:'300px'}}>
                        <br/>
                        <div style={{fontSize:'20px', marginLeft:'10%'}}> Company Name : {applications.jobPostings[i].name}</div>
                        <br/>
                        <div style={{fontSize:'20px', marginLeft:'10%'}}> Job Title : {applications.jobPostings[i].title}</div>
                        <br/>
                        <div style={{fontSize:'20px', marginLeft:'10%'}}> ApplicationStatus: {applications.jobPostings[i].applications[j].applicantStatus}</div>
                        <br/>
                        <div style={{fontSize:'20px', marginLeft:'10%'}}> Application Date : {applications.jobPostings[i].applications[j].appliedDate.substring(0,10)}</div>
                        &emsp;
                        <br/>
                        {button}                     
                    </div>
                    );
                cards.push(singleCard);   
            }
        };
        return cards;
      };

    render() {

        var redirectVar = "", showApplicationCards = null;

        if(this.props.applications) {
            console.log('list of current Appliclations of student : ', this.props.applications)
            showApplicationCards = this.displayApplications(this.props.applications);
        }
        
        if(this.props.applicationsError) {
            showApplicationCards = (
                <div className="reviews-row-three">
                    <div className="reviews-error"> No Applications to Show </div>
                </div>
            );
        }

        return (
            <div>
            <Navigation/>
            <UtilityBar/>
            {showApplicationCards}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(" studentApplications store", state.studentApplications);
    return {

        applications : state.studentApplications.applications || "", 
        applicationsError : state.studentApplications.applicationsError|| "",
        withdraw : state.studentApplications.withdraw|| "",
        withdrawError:state.studentApplications.withdrawError|| "",
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getApplications: (student_id) => dispatch(getApplications(student_id)),
        withdrawApplications: (application_id, job_id, data) => dispatch(withdrawApplications(application_id, job_id,data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentApplications);
