import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/adminCSS.css';
import { getTopCeo } from '../../actions/admin/analytics';
import { Redirect } from 'react-router';
import Navigation from './Navigation';
import { Chart } from "react-google-charts";

class TopCeo extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
        this.redirectHandler = this.redirectHandler.bind(this);
    }

    componentWillMount() {
        this.props.getTopCeo();
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
        else if(e == "reviews_per_day"){
            path = "/admin/reviewsPerDay"
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
        if (nextProps.analyticsTopCeo) {
            var { analyticsTopCeo } = nextProps;

            console.log('ReviewsPerDay -> componentWillReceiveProps -> analyticsTopCeo : ', analyticsTopCeo);
            this.setState({
                analyticsTopCeo: analyticsTopCeo,
            });
        } 
        if (nextProps.analyticsTopCeoError) {
            var { analyticsTopCeoError } = nextProps;

            console.log('ReviewsPerDay -> componentWillReceiveProps -> analyticsTopCeoError : ', analyticsTopCeoError);
            this.setState({
                analyticsTopCeoError: analyticsTopCeoError,
                analyticsTopCeo: null,
            });
        }
    }

    render() {


        var redirectVar = "";
        var topCeoArray = [];

        if (this.state.isRedirect) {
            redirectVar = <Redirect to={{ pathname: this.state.redirectPath }} />
        }

        if(this.props.analyticsTopCeo) {
            topCeoArray.push(['x', 'CEO Approval Rating']);
            this.props.analyticsTopCeo.bestCeos.map((bestCeo) => {
                var name = bestCeo.ceoName;
                if (!name) {
                    name = bestCeo.name + "'s Ceo"
                }
                topCeoArray.push([name, bestCeo.ceoApprovalRating]);
            })
        }
        console.log("########", topCeoArray);

        return (
            <div>
            {redirectVar}
                { (this.props.analyticsTopCeo) ?
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
                                <td className="profile-titles-selected"><div className="profile-title">Top CEOs</div></td>
                                <td><div className="profile-title" onClick={() => this.redirectHandler("most_viewed_companies")}>Most Viewed Companies</div></td>
                            </table>
                        </div>

                        <div className="analytics-row-two">                        
                        <Chart
                        height={'600px'}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={topCeoArray}
                        options={{
                            hAxis: {
                              title: 'CEO Approval Rating',
                            },
                            vAxis: {
                              title: 'CEO Name',
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
    console.log(" Analytics - TopCeo - store:", state.comStore);
    return {
        analyticsTopCeo: state.adminAnalytics.analyticsTopCeo || "",
        analyticsTopCeoError: state.adminAnalytics.analyticsTopCeoError || ""
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTopCeo: () => dispatch(getTopCeo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopCeo);