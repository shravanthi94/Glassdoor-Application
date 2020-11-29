import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/adminCSS.css';
import { getMostViewedcompany } from '../../actions/admin/analytics';
import { Redirect } from 'react-router';
import Navigation from './Navigation';
import { Chart } from "react-google-charts";

class MostViewedCompanies extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
        this.redirectHandler = this.redirectHandler.bind(this);
    }

    componentWillMount() {
        this.props.getMostViewedCompanies();
    }

    redirectHandler = (e) => {
        console.log("redirect value: ", e);
        var path = "";

        if (e == "company_average_rating") {
            path = "/admin/companyAverageRating"
        }
        else if(e == "most_reviewed_company"){
            path = "/admin/mostReviewedCompany" 
        }
        else if(e == "top_student_reviewers"){
            path = "/admin/topStudentReviewers"
        }
        else if(e == "top_ceo"){
            path = "/admin/topCeo"
        }
        else if(e == "reviews_per_day"){
            path = "/admin/reviewsPerDay"
        }

        this.setState({
            isRedirect: true,
            redirectPath: path,
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.analyticsMostViewedCompanies) {
            var { analyticsMostViewedCompanies } = nextProps;

            console.log('MostViewedCompanies -> componentWillReceiveProps -> analyticsMostViewedCompanies : ', analyticsMostViewedCompanies);
            this.setState({
                analyticsMostViewedCompanies: analyticsMostViewedCompanies,
            });
        } 
        if (nextProps.analyticsMostViewedCompaniesError) {
            var { analyticsMostViewedCompaniesError } = nextProps;

            console.log('MostViewedCompanies -> componentWillReceiveProps -> analyticsMostViewedCompaniesError : ', analyticsMostViewedCompaniesError);
            this.setState({
                analyticsMostViewedCompaniesError: analyticsMostViewedCompaniesError,
                analyticsMostViewedCompanies: null,
            });
        }
    }

    render() {


        var redirectVar = "";
        var mostViewedCompaniesArray = [];

        if (this.state.isRedirect) {
            redirectVar = <Redirect to={{ pathname: this.state.redirectPath }} />
        }

        if(this.props.analyticsMostViewedCompanies) {
            mostViewedCompaniesArray.push(['x', 'Number of Views']);
            this.props.analyticsMostViewedCompanies.viewsAnalytics.map((viewsAnalytic) => {
                mostViewedCompaniesArray.push([viewsAnalytic._id, viewsAnalytic.views[0].count]);
            })
        }
        console.log("########", mostViewedCompaniesArray);

        return (
            <div>
            {redirectVar}
                { (this.props.analyticsMostViewedCompanies) ?
                    <div className="overview-all">
                        <Navigation />
                        <div className="analytics-row-one">
                            <img className="analytics-banner" src={require('../../components/images/annalytics_banner.jpg').default} alt="" />
                            <img className="analytics-logo" src={require('../../components/images/analytics_logo.png').default} alt="" />
                            <div className="page-title">Annalytics Dashboard</div>
                            <table className="analytics-row-one-table">
                                <td><div className="profile-title" onClick={() => this.redirectHandler("reviews_per_day")}>Reviews per day</div></td>
                                <td><div className="profile-title" onClick={() => this.redirectHandler("company_average_rating")}>Company Average Rating</div></td>
                                <td><div className="profile-title" onClick={() => this.redirectHandler("most_reviewed_company")}>Most Reviewed Company</div></td>
                                <td><div className="profile-title" onClick={() => this.redirectHandler("top_student_reviewers")}>Top Student Reviewers</div></td>
                                <td><div className="profile-title" onClick={() => this.redirectHandler("top_ceo")}>Top CEOs</div></td>
                                <td className="profile-titles-selected"><div className="profile-title">Most Viewed Companies</div></td>
                            </table>
                        </div>

                        <div className="analytics-row-two">                        
                        <Chart
                        height={'600px'}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={mostViewedCompaniesArray}
                        options={{
                            hAxis: {
                              title: 'Number of Views',
                            },
                            vAxis: {
                              title: 'Company',
                            },
                            // colors: ["green"],
                        }}
                        rootProps={{ 'data-testid': '1' }}
                      />

                        </div>
                        
                    </div> : <div> Please wait for sometime</div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(" Analytics - MostViewedCompanies - store:", state.comStore);
    return {
        analyticsMostViewedCompanies: state.adminAnalytics.analyticsMostViewedCompanies || "",
        analyticsMostViewedCompaniesError: state.adminAnalytics.analyticsMostViewedCompaniesError || ""
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMostViewedCompanies: () => dispatch(getMostViewedcompany())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MostViewedCompanies);