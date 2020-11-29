import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/adminCSS.css';
import { getMostReviewedCompany, getReviewsPerDay } from '../../actions/admin/analytics';
import { Redirect } from 'react-router';
import Navigation from './Navigation';
import { Chart } from "react-google-charts";

class MostReviewedCompany extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
        this.redirectHandler = this.redirectHandler.bind(this);
    }

    componentWillMount() {
        this.props.getMostReviewedCompany();
    }

    redirectHandler = (e) => {
        console.log("redirect value: ", e);
        var path = "";

        if (e == "company_average_rating") {
            path = "/admin/companyAverageRating"
        }
        else if(e == "reviews_per_day") {
            path = "/admin/reviewsPerDay"
        }
        else if(e == "top_student_reviewers"){
            path = "/admin/topStudentReviewers"
        }
        else if(e == "top_ceo") {
            path = "/admin/topCeo"
        }
        else if(e == "most_viewed_companies"){
            path = "/admin/mostViewedCompanies"
        }

        this.setState({
            isRedirect: true,
            redirectPath: path,
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.analyticsMostReviewedCompany) {
            var { analyticsMostReviewedCompany } = nextProps;

            console.log('ReviewsPerDay -> componentWillReceiveProps -> analyticsMostReviewedCompany : ', analyticsMostReviewedCompany);
            this.setState({
                analyticsMostReviewedCompany: analyticsMostReviewedCompany,
            });
        } 
        if (nextProps.analyticsMostReviewedCompanyError) {
            var { analyticsMostReviewedCompanyError } = nextProps;

            console.log('ReviewsPerDay -> componentWillReceiveProps -> analyticsMostReviewedCompanyError : ', analyticsMostReviewedCompanyError);
            this.setState({
                analyticsMostReviewedCompanyError: analyticsMostReviewedCompanyError,
                analyticsMostReviewedCompany: null,
            });
        }
    }

    render() {


        var redirectVar = "";
        var mostReviewedCompanyArray = [];

        if (this.state.isRedirect) {
            redirectVar = <Redirect to={{ pathname: this.state.redirectPath }} />
        }

        if(this.props.analyticsMostReviewedCompany) {
            mostReviewedCompanyArray.push(['x', 'Total Reviews']);
            this.props.analyticsMostReviewedCompany.mostReviewedCompanies.map((mostReviewedCompany) => {
                mostReviewedCompanyArray.push([mostReviewedCompany.name, mostReviewedCompany.count]);
            })
        }
        console.log("########", mostReviewedCompanyArray);

        return (
            <div>
            {redirectVar}
                { (this.props.analyticsMostReviewedCompany) ?
                    <div className="overview-all">
                        <Navigation />
                        <div className="analytics-row-one">
                            <img className="analytics-banner" src={require('../../components/images/annalytics_banner.jpg').default} alt="" />
                            <img className="analytics-logo" src={require('../../components/images/analytics_logo.png').default} alt="" />
                            <div className="page-title">Annalytics Dashboard</div>
                            <table className="analytics-row-one-table">
                                <td><div className="profile-title" onClick={() => this.redirectHandler("reviews_per_day")}>Reviews per day</div></td>
                                <td><div className="profile-title" onClick={() => this.redirectHandler("company_average_rating")}>Company Average Rating</div></td>
                                <td className="profile-titles-selected"><div className="profile-title">Most Reviewed Company</div></td>
                                <td><div className="profile-title" onClick={() => this.redirectHandler("top_student_reviewers")}>Top Student Reviewers</div></td>
                                <td><div className="profile-title" onClick={() => this.redirectHandler("top_ceo")}>Top CEOs</div></td>
                                <td><div className="profile-title" onClick={() => this.redirectHandler("most_viewed_companies")}>Most Viewed Companies</div></td>
                            </table>
                        </div>

                        <div className="analytics-row-two">                        
                        <Chart
                        height={'600px'}
                        chartType="ScatterChart"
                        loader={<div>Loading Chart</div>}
                        data={mostReviewedCompanyArray}
                        options={{
                            title: 'Top 5 Most Reviewed Companies',
                            hAxis: {
                              title: 'Company Name',
                            },
                            vAxis: {
                              title: 'Number of Reviews',
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
    console.log(" Analytics - ReviewsPerDay - store:", state.comStore);
    return {
        analyticsMostReviewedCompany: state.adminAnalytics.analyticsMostReviewedCompany || "",
        analyticsMostReviewedCompanyError: state.adminAnalytics.analyticsMostReviewedCompanyError || ""
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMostReviewedCompany: () => dispatch(getMostReviewedCompany())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MostReviewedCompany);