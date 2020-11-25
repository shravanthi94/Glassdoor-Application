/* eslint-disable jsx-a11y/alt-text */
import React, {Fragment} from 'react'
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types'
import '../CSS/CompanyLanding.css'

const CmpNav = props => {
    return (
        <Fragment>
            <div className="employerLandingNav">
            <nav >
               <div className='logo-icon'>
                    <img
                        className="logo-icon"
                        src="https://www.glassdoor.com/employers/app/themes/theme-gd-employers/dist/images/gd-logo-eng.svg"
                    ></img>
               </div>
               <ul className="list-options">
                    <li>
                        <Link to="/employersignin"> Sign In</Link>
                    </li>
                    <li>
                        <Link to="/employersignup"> Sign Up</Link>
                    </li>
                </ul>
            
            </nav>
            </div>
        </Fragment>
    )
}

CmpNav.propTypes = {

}

export default CmpNav
