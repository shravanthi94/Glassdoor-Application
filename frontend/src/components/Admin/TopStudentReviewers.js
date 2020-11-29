import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/adminCSS.css';
import { getTopStudentReviewers } from '../../actions/admin/analytics';
import { Redirect } from 'react-router';
import Navigation from './Navigation';
import { Chart } from "react-google-charts";

class TopStudentReviewers extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
        this.redirectHandler = this.redirectHandler.bind(this);
    }

    componentWillMount() {
        this.props.getTopStudentReviewers();
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
        else if(e == "reviews_per_day"){
            path = "/admin/reviewsPerDay"
        }
        else if(e == "top_ceo"){
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
        if (nextProps.analyticsTopStudentReviewers) {
            var { analyticsTopStudentReviewers } = nextProps;

            console.log('ReviewsPerDay -> componentWillReceiveProps -> analyticsTopStudentReviewers : ', analyticsTopStudentReviewers);
            this.setState({
                analyticsTopStudentReviewers: analyticsTopStudentReviewers,
            });
        } 
        if (nextProps.analyticsTopStudentReviewersError) {
            var { analyticsTopStudentReviewersError } = nextProps;

            console.log('ReviewsPerDay -> componentWillReceiveProps -> analyticsTopStudentReviewersError : ', analyticsTopStudentReviewersError);
            this.setState({
                analyticsTopStudentReviewersError: analyticsTopStudentReviewersError,
                analyticsTopStudentReviewers: null,
            });
        }
    }

    render() {


        var redirectVar = "";
        var topStudentReviewersArray = [];

        if (this.state.isRedirect) {
            redirectVar = <Redirect to={{ pathname: this.state.redirectPath }} />
        }

        if(this.props.analyticsTopStudentReviewers) {
            topStudentReviewersArray.push(['x', 'Total Reviews']);
            this.props.analyticsTopStudentReviewers.topStudentReviewers.map((topStudentReviewer) => {
                topStudentReviewersArray.push([topStudentReviewer.name, topStudentReviewer.count]);
            })
        }
        console.log("########", topStudentReviewersArray);

        return (
            <div>
            {redirectVar}
                { (this.props.analyticsTopStudentReviewers) ?
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
                                <td className="profile-titles-selected"><div className="profile-title">Top Student Reviewers</div></td>
                                <td><div className="profile-title" onClick={() => this.redirectHandler("top_ceo")}>Top CEOs</div></td>
                                <td><div className="profile-title" onClick={() => this.redirectHandler("most_viewed_companies")}>Most Viewed Companies</div></td>
                            </table>
                        </div>

                        <div className="analytics-row-two">                        
                        <Chart
                        height={'600px'}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={topStudentReviewersArray}
                        options={{
                            hAxis: {
                              title: 'Number of Reviews',
                            },
                            vAxis: {
                              title: 'Student Name',
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
    console.log(" Analytics - TopStudentReviewers - store:", state.comStore);
    return {
        analyticsTopStudentReviewers: state.adminAnalytics.analyticsTopStudentReviewers || "",
        analyticsTopStudentReviewersError: state.adminAnalytics.analyticsTopStudentReviewersError || ""
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTopStudentReviewers: () => dispatch(getTopStudentReviewers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopStudentReviewers);