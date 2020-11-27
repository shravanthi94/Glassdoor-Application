import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import CmpNav2 from '../CmpNav2'
import '../../CSS/CompanyJoblistings.css'
import {getCurrentCompanyJobs} from '../../../actions/company/companyjobpostings'

const CompanyJobPostings = ({getCurrentCompanyJobs}) => {
    useEffect(()=>{
        getCurrentCompanyJobs()
    }, [])
    return (
        <Fragment>
            <CmpNav2/>
            <div className="contentholder-Jobs-company">
                <div className="contentholder-Jobs-company-sub">
                    <Link to='/company/addjob' className="link-company">Add a new Job ?</Link>
                </div>
            List the Jobs
            </div>
            
        </Fragment>
    )
}

CompanyJobPostings.propTypes = {
    getCurrentCompanyJobs:PropTypes.func.isRequired,
}

export default connect(null, {getCurrentCompanyJobs})(CompanyJobPostings)
