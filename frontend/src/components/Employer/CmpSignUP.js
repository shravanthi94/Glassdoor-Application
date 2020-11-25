import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import CmpNav from './CmpNav'
import '../CSS/CompanyLanding.css'

const CmpSignUP = props => {
    return ( 
        <Fragment>
        <CmpNav/>
        <div className = "contentholder" >
        SignUP form 
        </div> 
        </Fragment>

    )
}

CmpSignUP.propTypes = {

}

export default CmpSignUP