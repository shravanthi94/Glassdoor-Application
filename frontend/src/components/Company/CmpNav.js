/* eslint-disable jsx-a11y/alt-text */
import React, {Fragment} from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {companySignOut} from '../../actions/company/auth'
import '../CSS/CompanyLanding.css'

const CmpNav = ({auth: {isAuthenticated, loading}, companySignOut}) => {

    // const authLinks = (
    //     <ul className="list-options-company">
    //                 <li>
    //                     <a onClick={companySignOut} href='/'> 
    //                         <i className="fa fa-sign-out-alt"></i> {' '}Sign Out</a>
    //                 </li>
    //     </ul>

    // )

    // const guestLinks = (
    //     <ul className="list-options-company">
    //         <li>
    //             <Link to="/companysignin"> Sign In</Link>
    //         </li>
    //         <li>
    //             <Link to="/companysignup"> Sign Up</Link>
    //         </li>
    //     </ul>
    // )
    return (
        <Fragment>
            <div className="employerLandingNav">
               <div>
                    <img
                        className="logo-icon-company"
                        src="https://www.glassdoor.com/employers/app/themes/theme-gd-employers/dist/images/gd-logo-eng.svg"
                    ></img>
               </div>
               {/* {!loading && (
                   <Fragment>
                       {isAuthenticated ? authLinks : guestLinks}
                   </Fragment>
               )} */}
                 <ul className="list-options-company">
                    <li>
                        <Link to="/companysignin"> Sign In</Link>
                    </li>
                    <li>
                        <Link to="/companysignup"> Sign Up</Link>
                    </li>
                </ul>
            </div>
        </Fragment>
    )
}

CmpNav.propTypes = {
    companySignOut: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {companySignOut})(CmpNav)
