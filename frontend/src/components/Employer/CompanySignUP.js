import React, { Fragment, useState } from 'react'
import {connect} from 'react-redux';
import {Link } from 'react-router-dom'
import {setAlert} from '../../actions/alert';
import Alert from '../Alert';
import PropTypes from 'prop-types'
import CmpNav from './CmpNav'
import '../CSS/CompanyLanding.css'
import '../CSS/Alert.css'

const CompanySignUP = ({setAlert}) => {

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
        if(password.length < 6){
           setAlert("Inavlid Password", 'danger')  
        }else {
            console.log('SUCCESS')
        }
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
                        <p>Name</p>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
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
                
                    <button type="submit" className="btn btn-dark" value="SignUp">Create Account</button>
                </form>
                 </div>
                <p className="my-1">
                    Already have an account ? {' '}
                    <Link to="/companylogin" className="text-dark">
                        Sign In
                    </Link>
                </p>
        </div> 
        </Fragment>

    )
}

CompanySignUP.propTypes = {
    setAlert: PropTypes.func.isRequired,
}

export default connect(null, {setAlert})(CompanySignUP)