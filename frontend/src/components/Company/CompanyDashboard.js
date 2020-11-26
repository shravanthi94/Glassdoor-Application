import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import {getCurrentCompanyProfile} from '../../actions/company/companyprofile';
import CmpNav from './CmpNav';


//getCurrentCompanyProfile
const CompanyDashboard = ({getCurrentCompanyProfile, auth, companyprofile}) => {
    useEffect(()=>{
        getCurrentCompanyProfile();
    },[])

    return (
        <Fragment>
            <CmpNav/>
            <div className="contentholder-company text-company">
          Company Overview display
          </div>
        </Fragment>
    )
}

CompanyDashboard.propTypes = {
    getCurrentCompanyProfile : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    companyprofile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    companyprofile: state.companyprofile
})

export default connect(mapStateToProps, {getCurrentCompanyProfile})(CompanyDashboard);
