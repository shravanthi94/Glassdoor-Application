/* eslint-disable jsx-a11y/alt-text */
import React, {Fragment} from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {companySignOut} from '../../actions/company/auth'
import '../CSS/CompanyLanding.css'

const CmpNav = ({auth: {isAuthenticated, loading}, companySignOut}) => {

    // const authLinks = (
    //     <ul className="list-options">
    //                 <li>
    //                     <Link to="#!"> Applicants</Link>
    //                 </li>
    //                 <li>
    //                     <Link to="#!"> Job Posts</Link>
    //                 </li>
    //                 <li>
    //                     <Link to="#!"> Reviews</Link>
    //                 </li>
    //                 <li>
    //                     <Link to="#!"> Statistics</Link>
    //                 </li>
    //                 <li>
    //                     <a onClick={companySignOut} href='/company'> 
    //                         <i className="fa fa-sign-out-alt"></i> {' '}Sign Out</a>
    //                 </li>
    //     </ul>

    // )

    // const guestLinks = (
    //     <ul className="list-options">
    //                 <li>
    //                     <Link to="/companysignin"> Sign In</Link>
    //                 </li>
    //                 <li>
    //                     <Link to="/companysignup"> Sign Up</Link>
    //                 </li>
    //             </ul>
    // )
    return (
        <Fragment>
            <div className="employerLandingNav">
            <nav >
               <div>
                    <img
                        className="logo-icon"
                        src="https://www.glassdoor.com/employers/app/themes/theme-gd-employers/dist/images/gd-logo-eng.svg"
                    ></img>
               </div>
               {/* {!loading && (
                   <Fragment>
                       {isAuthenticated ? authLinks : guestLinks}
                   </Fragment>
               )} */}
                 <ul className="list-options">
                    <li>
                        <Link to="/companysignin"> Sign In</Link>
                    </li>
                    <li>
                        <Link to="/companysignup"> Sign Up</Link>
                    </li>
                </ul>
            
            </nav>
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
