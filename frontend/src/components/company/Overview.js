import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/overview.css';
import { getCompanyProfile } from '../../actions/company/getCompanyProfile';

class CompanyOverview extends Component {

    constructor(props) {
        super(props);

        this.state = {
            submitted: false
        }
    }

    componentDidMount() {
        this.props.getCompanyProfile("5fb2f87d828aa81479d846a1");
    }

    render() {
        var company_name = ""
        if (this.props.company) {
            company_name = this.props.company.overview.name;
        }
        return (
            <div>
                { (this.props.company) ?
                    <div className="overview-all">
                        <div style={{ backgroundColor: "#13aa41", height: "150px" }}> Search bar </div>
                        <div className="profile-row-one">
                            <img className="company-banner-blur" src={require('../../components/images/' + company_name + '_banner.jpg').default} alt="" />
                            <img className="overview-logo" src={require('../../components/images/' + company_name + '_logo.jpg').default} alt="" />
                            <div className="overview-company-name">{company_name}</div>
                            <table className="profile-row-one-table">
                                <td><div className="profile-counts"><i class="fas fa-bullseye"></i></div><div className="profile-title">Overview&emsp;</div></td>
                                <td><div className="profile-counts">4.0k</div><div className="profile-title">Reviews&emsp;</div></td>
                                <td><div className="profile-counts">867</div><div className="profile-title">Jobs&emsp;</div></td>
                                <td><div className="profile-counts">8.4k</div><div className="profile-title">Salaries&emsp;</div></td>
                                <td><div className="profile-counts">1.2k</div><div className="profile-title">Interviews&emsp;</div></td>
                                <td><div className="profile-counts">1.8k</div><div className="profile-title">Benefits&emsp;</div></td>
                                <td><div className="profile-counts">92</div><div className="profile-title">Photos&emsp;</div></td>
                            </table>
                        </div>
                        <div className="side-by-side-overview">
                            <div className="profile-row-two">
                                <div className="profile-row-two-row1">

                                    <div className="profile-row-two-inside">
                                        <div style={{ fontSize: "20px", color: "#0D0D0D", marginBottom: "20px" }}>{company_name} Overview</div>

                                        <table className="overview-table">
                                            <tr><td>Website:</td><td>{this.props.company.overview.website}</td><td>Headquarters:</td><td>{this.props.company.overview.headquarters}</td></tr>
                                            <tr><td>Size:</td><td>{this.props.company.overview.size}</td><td>Founded:</td><td>{this.props.company.overview.founded}</td></tr>
                                            <tr><td>Type:</td><td>{this.props.company.overview.type}</td><td>Industry:</td><td>{this.props.company.overview.industry}</td></tr>
                                            <tr><td>Revenue:</td><td>{this.props.company.overview.revenue}</td><td>Email:</td><td>{this.props.company.overview.email}</td></tr>
                                        </table>

                                        <div className="overview-description">{this.props.company.overview.description}</div>
                                        <div className="overview-mission"> <span className="overview-mission-title">Mission: </span><span>{this.props.company.overview.mission}</span></div>

                                        <hr className="overview-hr" />
                                        <div style={{ marginTop: "20px", fontSize: "22px", color: "#0D0D0D" }}>Glassdoor Awards</div>
                                        <br/>
                                        <div style={{ marginTop: "20px" }}><span style={{ fontSize: "30px", color: "#13aa41" }}><i class="fas fa-trophy"></i></span><span style={{ fontSize: "18px", color: "#404040" }}><span>&emsp;Top CEOs:</span><span style={{ color: "#1861BF" }}>&nbsp;2019 (#34)</span></span></div>
                                        <hr className="overview-hr" />
                                    </div>
                                </div>
                                <div className="profile-row-two-row2">
                                    <div className="profile-row-three-inside">
                                        <div style={{ fontSize: "22px", color: "#0D0D0D" }}>{company_name} Reviews</div>
                                        <br />
                                        {(this.props.company.reviews && this.props.company.reviews.length !== 0) ?

                                            this.props.company.reviews.map(review => (

                                                <div><div>Pros: {review.pros} </div>
                                                    <br />
                                                    <div>Cons: {review.cons} </div>
                                                    <br />
                                                </div>

                                            )) : <div> No Reviews Yets</div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="profile-row-two-column2"></div>
                        </div>
                    </div> : <div> No Company Profile</div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(" CompanyOverview - store:", state.comStore);
    return {
        company: state.comStore.company || ""
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCompanyProfile: (payload) => dispatch(getCompanyProfile(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyOverview);