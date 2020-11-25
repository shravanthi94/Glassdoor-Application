import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const Landing = props => {
    return (
        <div className='container'>
        <h2> Find The Job That Fits Your Life</h2>  
        <form className="form">
             <div className="form-group">
                 <input
                         type="email"
                         placeholder="Create account with Email"
                         required
                     />
                 </div>
                 <div className="form-group">
                     <input
                         type="password"
                         placeholder="Password"
                         required
                     />
                 </div>
                 <input type="submit" value="Continue with Email" />

             </form>
             <br/>
             Are you Hiring ?
             <Link to='/company' className='text-light'>
         Post Jobs
         </Link>
 
   </div>
    )
}

Landing.propTypes = {

}

export default Landing
