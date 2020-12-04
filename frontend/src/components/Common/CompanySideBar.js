import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/overview.css';


class CompanySideBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            company_logo: this.props.company.overview.logo,
            company_name: this.props.company.overview.name
        }
    }

    componentDidUpdate(prevProps) {

        if (this.state.company_name !== this.props.company.overview.name) {
            this.setState({
                company_name: this.props.company.overview.name,
                company_logo: this.props.company.overview.logo
            })
        }
    }


    render() {

        const { company_logo, company_name } = this.state;

        return (
            <div>
                <div className="profile-row-two-column2">
                    <div className="profile-row-two-column2-row1">
                        <div style={{ fontSize: "20px", marginLeft: "20px", marginTop: "20px" }}>{company_name} Locations</div>
                        <table className="overview-locations">
                            <tr>Bengaluru (India)</tr> <br />
                            <tr>Blanchardstown (Ireland)</tr> <br />
                            <tr>Chandler (AZ)</tr> <br />
                            <tr>Chennia (India)</tr> <br />
                            <tr>Conshohocken (PA)</tr> <br />
                        </table>
                        <hr className="overview-hr" style={{ width: "300px" }} />
                        <div className="all-locations">See All Locations </div>
                    </div>
                    <div className="profile-row-two-column2-row2">
                        <div style={{ fontSize: "20px", marginLeft: "20px", marginTop: "20px" }}> Jobs You May Like </div>
                        <table className="overview-jobs-like">
                            <tr>
                            <td>

                                {company_logo ? <img className="overview-logo-jobs" src={require('../../components/images/' + company_logo + '_logo.jpg').default} alt="" /> : <img
                                    className='company-banner' src={defaultLogo} alt='company banner' />}
                            </td>
                            <td style={{ marginLeft: "20px" }}><tr>Software Engineer I</tr>
                                <tr className="overview-job-location">{company_name} - San Jose, CA</tr>
                            </td>
                            </tr>

                            <tr>
                            <td>

                                {company_logo ? <img className="overview-logo-jobs" src={require('../../components/images/' + company_logo + '_logo.jpg').default} alt="" /> : <img
                                    className='company-banner' src={defaultLogo} alt='company banner' />}
                            </td>
                            <td style={{ marginLeft: "20px" }}><tr>Software Engineer II</tr>
                                <tr className="overview-job-location">{company_name} - San Jose, CA</tr>
                            </td>
                            </tr>


                            <tr>
                            <td>

                                {company_logo ? <img className="overview-logo-jobs" src={require('../../components/images/' + company_logo + '_logo.jpg').default} alt="" /> : <img
                                    className='company-banner' src={defaultLogo} alt='company banner' />}
                            </td>
                            <td style={{ marginLeft: "20px" }}><tr>Software Engineer III</tr>
                                <tr className="overview-job-location">{company_name} - San Jose, CA</tr>
                            </td>
                            </tr>


                            <tr>
                            <td>

                                {company_logo ? <img className="overview-logo-jobs" src={require('../../components/images/' + company_logo + '_logo.jpg').default} alt="" /> : <img
                                    className='company-banner' src={defaultLogo} alt='company banner' />}
                            </td>
                            <td style={{ marginLeft: "20px" }}><tr>Back End Software Engineer</tr>
                                <tr className="overview-job-location">{company_name} - San Jose, CA</tr>
                            </td>
                            </tr>


                            <tr>
                            <td>

                                {company_logo ? <img className="overview-logo-jobs" src={require('../../components/images/' + company_logo + '_logo.jpg').default} alt="" /> : <img
                                    className='company-banner' src={defaultLogo} alt='company banner' />}
                            </td>
                            <td style={{ marginLeft: "20px" }}><tr>Machine Learning Engineer</tr>
                                <tr className="overview-job-location">{company_name} - San Jose, CA</tr>
                            </td>
                            </tr>


                            <tr>
                            <td>

                                {company_logo ? <img className="overview-logo-jobs" src={require('../../components/images/' + company_logo + '_logo.jpg').default} alt="" /> : <img
                                    className='company-banner' src={defaultLogo} alt='company banner' />}
                            </td>
                            <td style={{ marginLeft: "20px" }}><tr>Product Manager</tr>
                                <tr className="overview-job-location">{company_name} - San Jose, CA</tr>
                            </td>
                            </tr>

                            {/* <tr><td><img className="overview-logo-jobs" src={require('../../components/images/' + company_logo + '_logo.jpg').default} alt="" /></td><td><tr className="overview-job-title">Software Engineer I</tr><tr className="overview-job-location">{company_name} - San Jose, CA</tr></td></tr>
                            <tr><td><img className="overview-logo-jobs" src={require('../../components/images/' + company_logo + '_logo.jpg').default} alt="" /></td><td><tr className="overview-job-title">Software Engineer II</tr><tr className="overview-job-location">{company_name} - San Jose, CA</tr></td></tr>
                            <tr><td><img className="overview-logo-jobs" src={require('../../components/images/' + company_logo + '_logo.jpg').default} alt="" /></td><td><tr className="overview-job-title">Software Engineer III</tr><tr className="overview-job-location">{company_name} - San Jose, CA</tr></td></tr>
                            <tr><td><img className="overview-logo-jobs" src={require('../../components/images/' + company_logo + '_logo.jpg').default} alt="" /></td><td><tr className="overview-job-title">Machine Learning Engineer </tr><tr className="overview-job-location">{company_name} - San Jose, CA</tr></td></tr>
                            <tr><td><img className="overview-logo-jobs" src={require('../../components/images/' + company_logo + '_logo.jpg').default} alt="" /></td><td><tr className="overview-job-title">Back End Software Engineer</tr><tr className="overview-job-location">{company_name} - San Jose, CA</tr></td></tr>
                            <tr><td><img className="overview-logo-jobs" src={require('../../components/images/' + company_logo + '_logo.jpg').default} alt="" /></td><td><tr className="overview-job-title">Product Manager</tr><tr className="overview-job-location">{company_name} - San Jose, CA</tr></td></tr>
                         */}
                         </table>
                        <br />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(" SideBar - store:", state.comStore);
    return {
        company: state.comStore.company || ""
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // getCompanyProfile: (payload) => dispatch(getCompanyProfile(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanySideBar);