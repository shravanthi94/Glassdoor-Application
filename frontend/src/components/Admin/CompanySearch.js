import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../CSS/adminCSS.css';
import { getCompaniesList } from '../../actions/admin/company';
import Navigation from './NavigationCompany';
import {Link} from 'react-router-dom'

class CompanySearch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    componentWillMount() {
        this.props.getCompaniesList();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.companyList) {
            var { companyList } = nextProps;

            console.log('FilterReviews -> componentWillReceiveProps -> companyList : ', companyList);
            this.setState({
                companyList: companyList,
            });
        } 
        if (nextProps.companyListError) {
            var { companyListError } = nextProps;

            console.log('FilterReviews -> componentWillReceiveProps -> companyListError : ', companyListError);
            this.setState({
                companyListError: companyListError,
            });
        }
    }

    displayCompanyResults = (companyList) => {
        return companyList.map((company) => {
          return (
            <div className="company-row-two">
                <table className="company-table-all">
                    <tr>
                        <td>
                            <table style={{marginLeft:'15%'}}>
                                <br/>

                                <table>
                                    <tr className="company-headline"><td>{company.name}</td></tr><br/>
                                    <tr><td><b>Website:</b></td><td>{company.website}</td>&emsp;&emsp;&emsp;&emsp;&emsp;<td><b>Headquarters:</b></td><td>{company.headquarters}</td></tr>
                                    <tr><td><b>Size:</b></td><td>{company.size}</td>&emsp;&emsp;&emsp;&emsp;&emsp;<td><b>Founded:</b></td><td>{company.founded}</td></tr>
                                    <tr><td><b>Type:</b></td><td>{company.type}</td>&emsp;&emsp;&emsp;&emsp;&emsp;<td><b>Industry:</b></td><td>{company.industry}</td></tr>
                                    <tr><td><b>Revenue:</b></td><td>{company.revenue}</td>&emsp;&emsp;&emsp;&emsp;&emsp;<td><b>Email:</b></td><td>{company.email}</td></tr>
                                </table>
                            </table>
                            <br/>
                            <Link style={{marginLeft:'15%'}} className="text-info" 
                                to={{pathname: `/admin/companyDetails/${company._id}`, state: company}}>
                                View More Details
                            </Link>
                        </td>
                    </tr>
                </table>
            </div>
          );
        });
      };
    
       


    render() {

        var redirectVar = "", showReviews = null;

        if(this.props.companyList) {
            showReviews = this.displayCompanyResults(this.props.companyList);
        }
        
        if(this.props.companyListError) {
            showReviews = (
                <div className="reviews-row-three">
                    <div className="reviews-error"> No Companies On Glassdoor! </div>
                </div>
            );
        }

        return (
            <div>
            {redirectVar}
                { (this.props.companyList) ?
                    <div className="overview-all">
                        <Navigation />
                        <div className="reviews-row-one">
                            <img className="reviews-banner" src={require('../../components/images/company_banner.jpg').default} alt="" />
                            <div className="reviews-title"> Companies On Glassdoor</div>
                        </div>

                        {showReviews}
                        
                        
                    </div> : <div className="overview-all">
                    <Navigation />
                    <div className="reviews-row-one">
                        <img className="reviews-banner" src={require('../../components/images/review_banner.jpg').default} alt="" />
                        <img className="reviews-logo" src={require('../../components/images/review_logo.jpg').default} alt="" />
                        <div className="reviews-title"> Approve Reviews</div>
                    </div>

                    {showReviews}
                    
                    
                </div> 
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(" Admin - CompanyDetails - store:", state.comStore);
    return {
        companyList: state.adminCompanyDetails.companyList || "",
        companyListError: state.adminCompanyDetails.companyListError || "",
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCompaniesList: () => dispatch(getCompaniesList()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanySearch);