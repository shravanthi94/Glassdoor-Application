import React, { Fragment, useState } from 'react'
import {Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import CmpNav from './CmpNav'
import Alert from '../Alert';
import '../CSS/CompanySign.css'
import '../CSS/Alert.css'
import {companySignIn} from '../../actions/company/auth'

const CompanyLogin = ({companySignIn, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const onChange = e => setFormData({
         ...formData, [e.target.name]: e.target.value
    });

    const onSubmit = e =>{
        e.preventDefault();
        console.log("SUCCESS1")
        companySignIn(email, password)
        console.log("SUCCESS2")
    }

    // Redirect on successful signin

    if(isAuthenticated){
        return <Redirect to="/companydashboard"></Redirect>
    }

    return (
        <Fragment>
        <CmpNav/>
        <div className = "contentholder" >
            <Alert/>
        <p> Your next hire is researching your company on Glassdoor. 
            Take control of the conversation and show ideal candidates why they want to work with you.</p>
                <div className="form-box">
                <form className="form" onSubmit={e=> onSubmit(e)}>
                    <div className="form-group">
                        <p> Email</p>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <p>Password</p>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                            // minLength='6'
                            required
                        />
                    </div>
                
                    <button type="submit" className="btn btn-dark" value="SignUp">Sign In</button>
                </form>
                 </div>
                <p className="my-1">
                    Already have an account ? {' '}
                    <Link to="/companylogin" className="text-dark">
                        Create Account
                    </Link>
                </p>
        </div> 
        </Fragment>

    )
}

CompanyLogin.propTypes = {
    companySignIn: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,

}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {companySignIn})(CompanyLogin)
