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
        this.props.getCompanyProfile("5fb2f87d828aa81479d846a3");
    }

    render() {
         const company_name = this.props.company.overview.name;
        return (
            <div className="overview-all">
                <div className="profile-row-one">
                    <img className="company-banner-blur" src={require('../../components/images/' + company_name + '_banner.jpg').default} alt="" />
                    <img className="overview-logo" src={require('../../components/images/' + company_name + '_logo.jpg').default} alt="" />
                    <br /><br /><br />
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
                <div className="profile-row-two">

                    <div className="profile-row-two-inside">
                        <div style={{ fontSize: "25px", color: "#0D0D0D" }}>{company_name} Overview</div>

                        <div className="overview-column-one">
                            <div className="overview-details-all"><span className="overview-title">Website:</span><span className="overview-data">{this.props.company.overview.website}</span></div><br />
                            <div className="overview-details-all"><span className="overview-title">Size:</span><span className="overview-data">{this.props.company.overview.size}</span></div><br />
                            <div className="overview-details-all"><span className="overview-title">Type:</span><span className="overview-data">{this.props.company.overview.type}</span></div><br />
                            <div className="overview-details-all"><span className="overview-title">Revenue:</span><span className="overview-data">{this.props.company.overview.revenue}</span></div><br />

                        </div>
                        <div className="overview-column-two">

                            <div className="overview-details-all"><span className="overview-title">Headquarters:</span><span className="overview-data">{this.props.company.overview.headquarters}</span></div><br />
                            <div className="overview-details-all"><span className="overview-title">Founded:</span><span className="overview-data">{this.props.company.overview.founded}</span></div><br />
                            <div className="overview-details-all"><span className="overview-title">Industry:</span><span className="overview-data">{this.props.company.overview.industry}</span></div><br />
                            <div className="overview-details-all"><span className="overview-title">Email:</span><span className="overview-data">{this.props.company.overview.email}</span></div><br />
                        </div>

                        <div className="overview-description">{company_name}</div>
                        <hr className="overview-hr" />
                        <div style={{ marginTop: "20px", fontSize: "22px", color: "#0D0D0D" }}>Glassdoor Awards</div>
                        <div style={{ marginTop: "20px" }}><span style={{ fontSize: "30px", color: "#13aa41" }}><i class="fas fa-trophy"></i></span><span style={{ fontSize: "18px", color: "#404040" }}><span>&emsp;Top CEOs:</span><span style={{ color: "#1861BF" }}>&nbsp;2019 (#34)</span></span></div>
                        <hr className="overview-hr" />
                    </div>
                </div>
                <div className="profile-row-three">
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