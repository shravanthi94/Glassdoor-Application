import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/adminCSS.css';
import { getCompanyAverageRating } from '../../actions/admin/analytics';
import { Redirect } from 'react-router';
import Navigation from './Navigation';
import { Chart } from "react-google-charts";

class CompanyAverageRating extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
        this.redirectHandler = this.redirectHandler.bind(this);
    }

    componentWillMount() {
        this.props.getCompanyAverageRating();
    }

    redirectHandler = (e) => {
        console.log("redirect value: ", e);
        var path = "";

        if(e == "reviews_per_day"){
            path = "/admin/reviewsPerDay"
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
        else if(e == "most_viewed_companies"){
            path = "/admin/mostViewedCompanies"
        }

        this.setState({
            isRedirect: true,
            redirectPath: path,
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.analyticsCompanyAverageRating) {
            var { analyticsCompanyAverageRating } = nextProps;

            console.log('ReviewsPerDay -> componentWillReceiveProps -> analyticsCompanyAverageRating : ', analyticsCompanyAverageRating);
            this.setState({
                analyticsCompanyAverageRating: analyticsCompanyAverageRating,
            });
        } 
        if (nextProps.analyticsCompanyAverageRatingError) {
            var { analyticsCompanyAverageRatingError } = nextProps;

            console.log('ReviewsPerDay -> componentWillReceiveProps -> analyticsCompanyAverageRatingError : ', analyticsCompanyAverageRatingError);
            this.setState({
                analyticsCompanyAverageRatingError: analyticsCompanyAverageRatingError,
                analyticsCompanyAverageRating: null,
            });
        }
    }

    render() {


        var redirectVar = "";
        var companyAverageArray = [];

        if (this.state.isRedirect) {
            redirectVar = <Redirect to={{ pathname: this.state.redirectPath }} />
        }

        if(this.props.analyticsCompanyAverageRating) {
            companyAverageArray.push(['x', 'Total Reviews']);
            this.props.analyticsCompanyAverageRating.bestAverageRating.map((bestAverage) => {
                companyAverageArray.push([bestAverage.name, bestAverage.overAllRating]);
            })
        }
        console.log("########", companyAverageArray);

        return (
            <div>
            {redirectVar}
                { (this.props.analyticsCompanyAverageRating) ?
                    <div className="overview-all">
                        <Navigation />
                        <div className="analytics-row-one">
                            <img className="analytics-banner" src={require('../../components/images/annalytics_banner.jpg').default} alt="" />
                            <img className="analytics-logo" src={require('../../components/images/analytics_logo.png').default} alt="" />
                            <div className="page-title">Annalytics Dashboard</div>
                            <table className="analytics-row-one-table">
                                <td className="profile-titles-selected"><div className="profile-title">Reviews per day</div></td>
                                <td><div className="profile-title" onClick={() => this.redirectHandler("company_average_rating")}>Company Average Rating</div></td>
                                <td><div className="profile-title" onClick={() => this.redirectHandler("most_reviewed_company")}>Most Reviewed Company</div></td>
                                <td><div className="profile-title" onClick={() => this.redirectHandler("top_student_reviewers")}>Top Student Reviewers</div></td>
                                <td><div className="profile-title" onClick={() => this.redirectHandler("top_ceo")}>Top CEOs</div></td>
                                <td><div className="profile-title" onClick={() => this.redirectHandler("most_viewed_companies")}>Most Viewed Companies</div></td>
                            </table>
                        </div>

                        <div className="analytics-row-two">                        
                        <Chart
                        height={'600px'}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={companyAverageArray}
                        options={{
                            hAxis: {
                              title: 'Average Rating',
                            },
                            vAxis: {
                              title: 'Company Name',
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
    console.log(" Analytics - CompanyAverageRating - store:", state.comStore);
    return {
        analyticsCompanyAverageRating: state.adminAnalytics.analyticsCompanyAverageRating || "",
        analyticsCompanyAverageRatingError: state.adminAnalytics.analyticsCompanyAverageRatingError || ""
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCompanyAverageRating: () => dispatch(getCompanyAverageRating())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyAverageRating);