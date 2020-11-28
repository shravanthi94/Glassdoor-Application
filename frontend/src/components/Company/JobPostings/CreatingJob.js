import React,{Fragment, useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CmpNav2 from '../CmpNav2';
import {getCurrentCompanyProfile} from '../../../actions/company/companyprofile';
import {createCompanyJob} from '../../../actions/company/companyjobpostings';
import '../../CSS/CompanySign.css';
import '../../CSS/CompanyProfile.css';

const CreatingJob = ({
    companyprofile:{companyprofile, loading}, 
    getCurrentCompanyProfile, 
    createCompanyJob, 
    history}) => {

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        title:'',
        description:'',
        responsibilities:'',
        qualifications:'',
        industry:'',
        country:'',
        Remote:'',
        inPerson:'',
        street:'',
        city:'',
        state:'',
        zip:''
    })

    useEffect(()=>{
        getCurrentCompanyProfile();
        setFormData({
            name: loading || !companyprofile.name ? '': companyprofile.name,
            email: loading || !companyprofile.email ? '': companyprofile.email,
        }) 
    }, [loading])

    const {
        name,
        email,
        title,
        description,
        responsibilities,
        qualifications,
        industry,
        country,
        Remote,
        inPerson,
        street,
        city,
        state,
        zip
    } = formData;

    const onChange = e=>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = e =>{
        e.preventDefault();
        console.log("before submit action")
        createCompanyJob(formData, history)
        console.log("after submit action")
    }

    return (
        <Fragment>
            <CmpNav2/>
            <div className="contentholder-company text-company">
                Create Job 
                <br/>
                <br/>
                <div className="form-box-company-job">
                    <form className="form-company" onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group-company"><p>Name</p>
                        <input type="text" name="name" value={name} onChange={(e) => onChange(e)}/>
                    </div>
                    <div className="form-group-company"><p> Email</p>
                        <input type="email" name="email" value={email} onChange={(e) => onChange(e)}/>
                    </div>
                    <div className="form-group-company"><p>Job Tile</p>
                        <input type="text" name="title" value={title} onChange={(e) => onChange(e)}/>
                    </div>
                    <div className="form-group-company"><p>Job description</p>
                        <textarea rows="6" cols="100" type="text" name="description" value={description} onChange={(e) => onChange(e)}/>
                    </div>
                    <div className="form-group-company"><p>Responsibilities</p>
                        <textarea rows="6" cols="100" type="text" name="responsibilities" value={responsibilities} onChange={(e) => onChange(e)}/>
                    </div>
                    <div className="form-group-company"><p>Qualifications</p>
                        <textarea rows="6" cols="100" type="text" name="qualifications" value={qualifications} onChange={(e) => onChange(e)}/>
                    </div>
                    <div className="form-group-company"><p>Industry</p>
                        <input type="text" name="industry" value={industry} onChange={(e) => onChange(e)}/>
                    </div>
                    <div className="form-group-company">
                        <label><p>Remote</p></label>
                        <select name="Remote" value={Remote} onChange={(e) => onChange(e)}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="form-group-company">
                        <label><p>In Person</p></label>
                        <select name="inPerson" value={inPerson} onChange={(e) => onChange(e)}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className="form-group-company"><p>Street</p>
                        <input type="text" name="street" value={street} onChange={(e) => onChange(e)}/>
                    </div>
                    <div className="form-group-company"><p>City</p>
                        <input type="text" name="city" value={city} onChange={(e) => onChange(e)}/>
                    </div>
                    <div className="form-group-company"><p>State</p>
                        <input type="text" name="state" value={state} onChange={(e) => onChange(e)}/>
                    </div>
                    <div className="form-group-company"><p>Country</p>
                        <input type="text" name="country" value={country} onChange={(e) => onChange(e)}/>
                    </div>
                    <div className="form-group-company"><p>ZipCode</p>
                        <input type="text" name="zip" value={zip} onChange={(e) => onChange(e)}/>
                    </div>
                    <div className='btn-sign-company-job'>
                    <button className="button-company" type="submit" value="Submit">Post</button>
                    </div>
                    </form>
                </div>
            </div>
            
        </Fragment>
    )
}

CreatingJob.propTypes = {
    getCurrentCompanyProfile: PropTypes.func.isRequired,
    createCompanyJob: PropTypes.func.isRequired,
    companyprofile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    companyprofile: state.companyprofile
})

export default connect(mapStateToProps, {getCurrentCompanyProfile, createCompanyJob})(withRouter(CreatingJob))