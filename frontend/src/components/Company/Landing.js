/* eslint-disable jsx-a11y/alt-text */
import React, {Fragment} from 'react' 
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import CmpNav from './CmpNav';
import '../CSS/CompanyLanding.css';

const Landing = props => {
    return (
        <Fragment>
            <CmpNav/>
            <div className="contentholder-company">
                <div className="container_2columns-company">
                    <div className="column1-company">
                    <div className="text-company">
                    <h1>Let’s make your next great hire. Fast.</h1>
                    <br/>
                    <p>Ready to post a job? Get started with Glassdoor, where you can post an open role in minutes. 
                        Jobs you pay to post on Indeed will also appear on Glassdoor.</p>
                    <h4>Source, screen, and hire faster with Glassdoor.</h4>
                    </div>
                    <Link to='/companysignup'>
                    <button className="button-company">Get started</button>
                    </Link>
                    </div>
                    <div className="column2-company">
                    <img src="https://www.glassdoor.com/employers/app/uploads/sites/2/2020/11/illustration_home_your-employer-brand-large-3.svg"/>
                    </div>
                
                </div>
            </div> 
           
        </Fragment>
        
    )
}

Landing.propTypes = {

}

export default Landing
