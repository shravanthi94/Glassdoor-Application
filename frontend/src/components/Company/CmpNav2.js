/* eslint-disable jsx-a11y/alt-text */
import React, {Fragment} from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {companySignOut} from '../../actions/company/auth'
import '../CSS/CompanyLanding.css'

const CmpNav = ({companySignOut}) => {

    return (
        <Fragment>
            <div className="employerLandingNav">
               <div>
                    <img
                        className="logo-icon-company"
                        src="https://www.glassdoor.com/employers/app/themes/theme-gd-employers/dist/images/gd-logo-eng.svg"
                    ></img>
               </div>
               <ul className="list-options-company">
                    <li>
                        <a onClick={companySignOut} href='/'> 
                            <i className="fa fa-sign-out-alt"></i> {' '}Sign Out</a>
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
