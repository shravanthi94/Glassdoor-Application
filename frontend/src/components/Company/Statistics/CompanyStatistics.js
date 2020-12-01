import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentCompanyJobs } from '../../../actions/company/companyjobpostings';
import CmpNav2 from '../CmpNav2';

const CompanyStatistics = ({getCurrentCompanyJobs, companyjobs:{companyjobs, loading}}) => {
    useEffect(()=>{
        getCurrentCompanyJobs()
    }, [])
    return (
        <Fragment>
            <CmpNav2/>
        </Fragment>
    )
}

CompanyStatistics.propTypes = {
    getCurrentCompanyJobs: PropTypes.func.isRequired,
    companyjobs: PropTypes.object.isRequired,

}

const mapStateToProps = state =>({
    companyjobs: state.companyjobs
})

export default connect(mapStateToProps, {getCurrentCompanyJobs})(CompanyStatistics)
