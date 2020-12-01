import React, { Fragment, useState } from 'react'
import {useHistory } from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import CmpNav2 from '../CmpNav2'
import '../../CSS/CompanySign.css'
import {updateApplicantStatus} from '../../../actions/company/companyjobpostings';


// 
const UpdateApplicantStatus = ({updateApplicantStatus, match, history}) => {

    const [formData, setFormData] = useState({
        applicantStatus: ''
    })

    const {applicantStatus} = formData;

    const onChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
   });

   const onSubmit = e =>{
    e.preventDefault();
    console.log ("formData is onSubmit",applicantStatus)
    updateApplicantStatus(match.params.id,applicantStatus, history)
}

    return (
        <Fragment>
        <CmpNav2/>
        <div className = "contentholder-form-company text-company" >
                <div className="form-box-company">
                <form className="form-company" onSubmit={e=> onSubmit(e)}>
                    <div className="form-group-company">
                        <p> Update Applicant Status</p>
                        <select  name='applicantStatus' onChange={(e) => onChange(e)}>
                            <option value='reviewed'> reviewed </option>
                            <option value='initial screening'> initial screening </option>
                            <option value='interviewing'>interviewing </option>
                            <option value='hired'> hired </option>
                        </select>
                    </div>
                    <div className='btn-sign-company'>
                    <button type="submit" className="button-company" value="Update Status">Update Status</button>
                    </div>
                </form>
                 </div>
        </div> 
        </Fragment>
    )
}

UpdateApplicantStatus.propTypes = {
    updateApplicantStatus: PropTypes.func.isRequired,
}

export default connect(null, {updateApplicantStatus})(UpdateApplicantStatus)
