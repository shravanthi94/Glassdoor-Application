import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import CmpNav from './CmpNav'
import '../CSS/CompanyLanding.css'

const CmpSignUP = props => {
    return ( 
        <Fragment>
        <CmpNav/>
        <div className = "contentholder" >
        <p> Your next hire is researching your company on Glassdoor. 
            Take control of the conversation and show ideal candidates why they want to work with you.</p>
        </div> 
        </Fragment>

    )
}

CmpSignUP.propTypes = {

}

export default CmpSignUP