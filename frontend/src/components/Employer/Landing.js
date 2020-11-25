/* eslint-disable jsx-a11y/alt-text */
import React, {Fragment} from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import EmpNav from './EmpNav';
import '../CSS/EmployerLanding.css';

const Landing = props => {
    return (
        <Fragment>
            <EmpNav/>
            <div className="container">
                <img src="https://www.glassdoor.com/employers/app/uploads/sites/2/2020/11/illustration_home_your-employer-brand-large-3.svg"/>
            </div> 
           
        </Fragment>
        
    )
}

Landing.propTypes = {

}

export default Landing
