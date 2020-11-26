import React, { Fragment, useState, useEffect } from 'react'
import {connect} from 'react-redux';
import {Link, Redirect } from 'react-router-dom'
import {setAlert} from '../../actions/alert';
import {companySignUP, loadCompanyUser} from '../../actions/company/auth'
import Alert from '../Alert';
import PropTypes from 'prop-types'
import CmpNav from './CmpNav'
import '../CSS/CompanySign.css'
import '../CSS/Alert.css'
import setAuthToken from '../../helpers/setAuthToken';

if (localStorage.token){
    setAuthToken(localStorage.token);
}

const CompanySignUP = ({setAlert, loadCompanyUser, companySignUP, isAuthenticated}) => {

    useEffect(()=>{
        loadCompanyUser()
    })

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const {name, email, password} = formData;

    const onChange = e => setFormData({
         ...formData, [e.target.name]: e.target.value
    });

    const onSubmit = e =>{
        e.preventDefault();
        companySignUP({name, email, password})
      
    }

    if(isAuthenticated){
        return <Redirect to="/companydashboard"></Redirect>
    }

    return ( 
        <Fragment>
        <CmpNav/>
        <div className = "contentholder-form-company text-company" >
        <Alert/>
        <p> Your next hire is researching your company on Glassdoor. 
            Take control of the conversation and show ideal candidates why they want to work with you.</p>
                <div className="form-box-company">
                <form className="form-company" onSubmit={e=> onSubmit(e)}>
                    <div className="form-group-company">
                        <p>Name</p>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-group-company">
                        <p> Email</p>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-group-company">
                        <p>Password</p>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className='btn-sign-company'>
                    <button className="button-company" type="submit" value="SignUp">Create Account</button>
                    </div>
                </form>
                 </div>
                <p className="my-1">
                    Already have an account ? {' '}
                    <Link to="/companysignin" className="text-dark">
                        Sign In
                    </Link>
                </p>
        </div> 
        </Fragment>

    )
}

CompanySignUP.propTypes = {
    setAlert: PropTypes.func.isRequired,
    companySignUP: PropTypes.func.isRequired,
    loadCompanyUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {setAlert, companySignUP, loadCompanyUser})(CompanySignUP)