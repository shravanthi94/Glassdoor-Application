import React,{Fragment, useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CmpNav2 from './CmpNav2';
import {editCompanyProfile, getCurrentCompanyProfile} from '../../actions/company/companyprofile';
import {insertProfilePic} from '../../actions/company/insertProfilePic'
import '../CSS/CompanySign.css';
import '../CSS/CompanyProfile.css';

const CompanyEditProfile = ({getCurrentCompanyProfile, companyprofile:{companyprofile, loading},editCompanyProfile, history}) => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        ceoName:'',
        location:'',
        description:'',
        website:'',
        size:'',
        type:'',
        revenue:'',
        headquarters:'',
        industry:'',
        founded:'',
        mission:'',
    })

    useEffect(()=>{
        getCurrentCompanyProfile();
        setFormData({
            name: loading || !companyprofile.name ? '': companyprofile.name,
            email: loading || !companyprofile.email ? '': companyprofile.email,
            ceoName: loading || !companyprofile.ceoName ? '': companyprofile.ceoName,
            location: loading || !companyprofile.location ? '': companyprofile.location,
            description: loading || !companyprofile.description ? '': companyprofile.description,
            website: loading || !companyprofile.website ? '': companyprofile.website,
            size: loading || !companyprofile.size ? '': companyprofile.size,
            type: loading || !companyprofile.type ? '': companyprofile.type,
            revenue: loading || !companyprofile.revenue ? '': companyprofile.revenue,
            headquarters: loading || !companyprofile.headquarters ? '': companyprofile.headquarters,
            industry: loading || !companyprofile.industry ? '': companyprofile.industry,
            founded: loading || !companyprofile.founded ? '': companyprofile.founded,
            mission: loading || !companyprofile.mission ? '': companyprofile.mission,
        });
        // setImage({profilePic: loading || !companyprofile.profilePic ? '': companyprofile.profilePic})
    }, [loading])

    const {
        name,
        email,
        ceoName,
        location,
        description,
        website,
        size,
        type,
        revenue,
        headquarters,
        industry,
        founded,
        mission,
    } = formData;

    const onChange = e=>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    // const [image,setImage] = useState({
    //     file: "",
    //     fileText: "",
    //   })
    
    //   const imageChange = (e)=>{
    //     console.log("image file name is ",e.target.files[0].name)
    //     setImage({file:e.target.files[0],fileText: e.target.files[0].name})
    //   }

    //   const imageSave = (e) => {
    //     e.preventDefault();
    //     console.log("inside imageSave, file is ", image.file);
    //     console.log("inside imageSave, fileText is ", image.fileText);
    //     insertProfilePic(image.file, companyprofile._id,companyprofile.name);
        // const newimg = "rest_"+string(restprofile.restuser._id)+"."
        // if (userprofile.user.image)
        // {
        //   setImage({file:userprofile.user.image})
        // }
    //   }


    const onSubmit = e =>{
        e.preventDefault();
        editCompanyProfile(formData, history)
    }
    return (
        <Fragment>
            <CmpNav2/>
            <div className="contentholder-form-companyprofile text-company">
                Update your Company Profile 
                <br/>
                <br/>
                <div className="form-box-companyprofile">
                <form className="form-company">
                        <div >
                            <div className="form-group-company">
                                Update profile picture<br/><br/>
                                <input type ="file" />
                            </div>
                        <button type="submit" className="btn-updateprofile">
                        Save
                        </button>
                        </div>
                </form>
                <hr/>
                <form className="form-company">
                        <div >
                            <div className="form-group-company">
                                Update Company Logo<br/><br/>
                                <input type ="file"/>
                            </div>
                        <button type="submit" className="btn-updateprofile">
                        Save
                        </button>
                        </div>
                </form>
                </div>
                <br/>
                <div className="form-box-companyprofile">
                    <form className="form-company" onSubmit={(e) => onSubmit(e)}>
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
                        <p> CEO Name</p>
                        <input
                            type="text"
                            name="ceoName"
                            value={ceoName}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-group-company">
                        <p> Location</p>
                        <input
                            type="text"
                            name="location"
                            value={location}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-group-company">
                        <p> Mission</p>
                        <textarea
                            rows="4"
                            columns="50"
                            type="text"
                            name="mission"
                            value={mission}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-group-company">
                        <p> Description</p>
                        <textarea
                            rows="4"
                            columns="50"
                            type="text"
                            name="description"
                            value={description}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-group-company">
                        <p> WebSite</p>
                        <input
                            type="text"
                            name="website"
                            value={website}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-group-company">
                        <p> Company Size</p>
                        <input
                            type="text"
                            name="size"
                            value={size}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-group-company">
                        <p> Company Type</p>
                        <input
                            type="text"
                            name="type"
                            value={type}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-group-company">
                        <p> Revenue</p>
                        <input
                            type="text"
                            name="revenue"
                            value={revenue}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-group-company">
                        <p> Headquarters</p>
                        <input
                            type="text"
                            name="headquarters"
                            value={headquarters}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-group-company">
                        <p> Industry</p>
                        <input
                            type="text"
                            name="industry"
                            value={industry}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-group-company">
                        <p> Founded</p>
                        <input
                            type="text"
                            name="founded"
                            value={founded}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className='btn-sign-company'>
                    <button className="button-company" type="submit" value="Submit">Apply Changes</button>
                    </div>

                    </form>

                </div>
            </div>
            
        </Fragment>
    )
}

CompanyEditProfile.propTypes = {
    editCompanyProfile: PropTypes.func.isRequired,
    getCurrentCompanyProfile: PropTypes.func.isRequired,
    companyprofile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    companyprofile: state.companyprofile
})

export default connect(mapStateToProps, {getCurrentCompanyProfile, editCompanyProfile})(withRouter(CompanyEditProfile))
