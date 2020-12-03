import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import '../CSS/resume.css';
import { resume } from '../../actions/student/resume';
import { Redirect } from 'react-router';
import Navigation from './Navigation';
import UtilityBar from './UtilityBar';
import UpdateLinks from './UpdateLinks';
import { primaryResume } from '../../actions/student/primaryResume';
import { deleteResume } from '../../actions/student/deleteResume';

class CompanyResume extends Component {

    constructor(props) {
        super(props);

        this.state = {
            resumeUpload: false,
            resume: "",
            resumeName: ""
        }

        this.resumeHandler = this.resumeHandler.bind(this);
        this.uploadResumeHandler = this.uploadResumeHandler.bind(this);
        // this.primaryResumeHandler = this.primaryResumeHandler.bind(this);
    }


    resumeHandler = (e) => {
        console.log("inside resume handler: ", e.target.files[0]);
        this.setState({
            resume: e.target.files[0],
            resumeName: e.target.files[0].name
        });
    }

    uploadResumeHandler = (e) => {
        e.preventDefault();

        console.log("inside upload handler: ", this.state.resume);
        console.log("inside upload handler name: ", this.state.resume.name);

        const formData = new FormData();
        formData.append("resume", this.state.resume, this.state.resume.name);
        formData.append("studentId", this.props.studentId);

        this.setState({
            resumeUpload: "true"
        })

        this.props.uploadResume(formData);
    }

    primaryResumeHandler = (e, resume) => {
        e.preventDefault();

        console.log("resume data: ", resume);

        var data = {
            studentId: this.props.studentId,
            resumeId: resume._id
        }
        this.props.makePrimaryResume(data);
    }

    deleteResumeHandler = (e, resume) => {
        e.preventDefault();

        console.log("delete resume data: ", resume);

        var data = {
            studentId: this.props.studentId,
            resumeId: resume._id
        }
        this.props.deleteResume(data);
    }

    render() {
        var company_name = ""
        var uploadMsg = ""

        console.log("PROPS", this.props);

        if (this.props.company) {
            company_name = this.props.company.overview.name;
        }

        if (this.state.resumeUpload && this.props.uploadResumeFlag) {
            uploadMsg = <div style={{ color: "green" }}>Successfully uploaded!</div>
        }

        return (
            <Fragment>
                <Navigation />
                <UtilityBar />

                <div class='container my-4'>
                    <div class='row'>
                        <div class='col-4'>
                            <UpdateLinks />
                        </div>
                        <div class='col-8'>
                            <div className='container'>
                                <div class='card'>
                                    <div class='card-body'>
                                        <h3>Manage Resumes</h3>
                                        <hr />
                                        <div>
                                            <form>
                                                <div className="file-upload1">
                                                    <div className="form-group1" style={{ width: "150px", height: "50px" }}>
                                                        <label for="file-upload-label" class="file-upload-label">
                                                            <i class="file-upload-icon"></i> Choose File
                                                        </label>
                                                        <input id="file-upload-label" className="file-upload-input" onChange={this.resumeHandler} type="file" name="resume" />
                                                    </div>
                                                    <div onClick={this.uploadResumeHandler} className="student-profile-resume-upload-button">Upload a Resume</div><div className="resume-upload-text-msg">&nbsp;&nbsp;Easily update your profile with a resume</div>

                                                </div>
                                                {this.state.resumeName}
                                                <br />
                                                {uploadMsg}
                                                <br />
                                            </form>
                                        </div>
                                        <h5>Choose one of the resumes as primary</h5>
                                        <hr />

                                        <div style={{ marginTop: "15px" }}>
                                            <div style={{ marginTop: "12px" }}>
                                                <div class="form-check">
                                                    <table className="student-resumes-table">
                                                        <tbody>
                                                            {
                                                                this.props.student && this.props.student.resumes ?
                                                                    this.props.student.resumes.map(resume => {
                                                                        return (
                                                                            <tr>
                                                                                {resume.isPrimary ? 
                                                                                    <td><input id="primaryresume" checked type="radio" name="primaryresume"/></td> : 
                                                                                    <td><input id="primaryresume" type="radio" name="primaryresume" onClick={(e) => this.primaryResumeHandler(e, resume)} /></td>
                                                                                }
                                                                                <td><label class="form-check-label" htmlFor="primaryresume">{resume.file} </label></td>
                                                                                {resume.isPrimary ? 
                                                                                    <td><label style={{ color: "green"}}> Primary </label></td> : 
                                                                                    <td></td>
                                                                                }
                                                                                <td><div onClick={(e) => this.deleteResumeHandler(e, resume)}><i class="fas fa-times"></i></div></td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                : <tr style={{ color: "red" }}><td>No resumes added yet</td></tr> 
                                                            }
                                                            </tbody>
                                                        </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps", state);
    return {
        studentId: state.studentProfile.profile._id,
        student: state.studentProfile.profile,
        uploadResumeFlag: state.studentProfile.uploadResumeFlag
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadResume: (payload) => dispatch(resume(payload)),
        makePrimaryResume: (payload) => dispatch(primaryResume(payload)),
        deleteResume: (payload) => dispatch(deleteResume(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyResume);
