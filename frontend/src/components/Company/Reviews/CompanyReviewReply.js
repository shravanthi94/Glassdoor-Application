import React, { Fragment, useState } from 'react'
import {useHistory } from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import CmpNav2 from '../CmpNav2'
import '../../CSS/CompanySign.css'
import {replyComment} from '../../../actions/company/companyreviews';

const CompanyReviewReply = ({replyComment, match}) => {

    const [formData, setFormData] = useState({
        message: ''
    });

    const {message} = formData;

    const onChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
   });
   console.log("form data", formData )
   const history = useHistory();

    const redirectReviews = () =>{ 
        let path = `/company/reviewspage`; 
        history.push(path);
      }

console.log(match.params.id)
   const onSubmit = e =>{
    e.preventDefault();
    console.log ("formData is",formData)
    replyComment(match.params.id,formData)
    redirectReviews();
}


    return (
        <Fragment>
        <CmpNav2/>
        <div className = "contentholder-form-company text-company" >
                <div className="form-box-company">
                <form className="form-company" onSubmit={e=> onSubmit(e)}>
                    <div className="form-group-company">
                        <p> Reply</p>
                        <textarea
                            cols="50"
                            rows="4"
                            type="text"
                            name="message"
                            value={message}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className='btn-sign-company'>
                    <button type="submit" className="button-company" value="Reply">Reply</button>
                    </div>
                </form>
                 </div>
        </div> 
        </Fragment>
    )
}

CompanyReviewReply.propTypes = {
    replyComment: PropTypes.func.isRequired,
}

export default connect(null, {replyComment})(CompanyReviewReply)
