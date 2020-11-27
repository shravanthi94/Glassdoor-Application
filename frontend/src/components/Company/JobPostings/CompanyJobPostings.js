import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import CmpNav2 from '../CmpNav2'
import '../../CSS/CompanyJoblistings.css'

const CompanyJobPostings = props => {
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

}

export default CompanyJobPostings
