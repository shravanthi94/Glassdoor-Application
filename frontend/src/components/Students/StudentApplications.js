import { connect } from 'react-redux';
import React, { Component , Fragment} from 'react';
import '../CSS/studentApplications.css';
import { getApplications, withdrawApplications } from '../../actions/student/applications';
//import Navigation from './Navigation'; 
//import { BACKEND_URL } from '../../helpers/constants';
//import studentApplications from '../../reducers/studentApplications';
import JobsNav from './JobsNav'
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
        this.props.getApplications(localStorage.getItem('id'));
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
            this.props.getApplications();
        }

        if (nextProps.withdrawError) {
            var { withdrawError } = nextProps;
            console.log('FilterImages -> componentWillReceiveProps -> withdrawError : ', withdrawError);
            this.setState({
                withdrawError: true,
            });
            this.props.getApplications();
        }
        
    }

    withdrawApplication = (application_id, job_id, e) => {
        console.log("Reject");
        var data= { status : "rejected" }
        this.props.withdrawApplication (application_id, job_id, data);
    };

  

    displayApplications  = (applications) => {
        var cards = [];
        let myapplications= applications.jobPostings.applicants;
        let company =  applications.jobPostings.name;
        let title= applications.jobPostings.title;
        for( var i = 0; i < applications.length; i++ ) {
                var singleCard = (
                    <div className="reviews-row-two">
                        <table>
                            <tr>
                                <td>
                                    <div className='mt-1 ml-4'>
                                        
                                    </div>
                                </td>
                                <td>
                                    
                                </td>
                                &emsp;
                                <td>
                                    <button style={{marginLeft:'15%'}} className="reviews-approve-button" onClick={this.withdrawApplication.bind(this) }>
                                    withdraw </button>
                                </td>
                                &emsp;&emsp;&emsp;
                            
                            </tr>
                        </table>
                    </div>
                    );
                cards.push(singleCard);   
            
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



    // redirectHandler = (e) => {
    //     console.log("redirect value: ", e);
    //     var path = "";

    //     if (e == "company_stastics") {
    //         path = "/admin/company/profile"
    //     }
        

    //     this.setState({
    //         isRedirect: true,
    //         redirectPath: path,
    //     })
    // }
