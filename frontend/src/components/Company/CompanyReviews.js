import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import {getCurrentCompanyReviews} from '../../actions/company/companyreviews'
import CmpNav from './CmpNav'

const CompanyReviews = ({getCurrentCompanyReviews}) => {
    useEffect(()=>{
        getCurrentCompanyReviews()
    },[])
    return (
        <Fragment>
            <CmpNav/>
            Load Reviews here
        </Fragment>
    )
}

CompanyReviews.propTypes = {
    getCurrentCompanyReviews: PropTypes.func.isRequired,

}
// const mapStateToProps = state =>({

// })

export default connect(null, {getCurrentCompanyReviews})(CompanyReviews)
