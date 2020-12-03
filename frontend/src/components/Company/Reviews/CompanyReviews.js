import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import {Link, useHistory} from 'react-router-dom';
import {getCurrentCompanyReviews} from '../../../actions/company/companyreviews'
import {getCurrentCompanyProfile} from '../../../actions/company/companyprofile'
import CmpNav2 from '../CmpNav2'
import Spinner from '../../Spinner/spinner';
import { PieChart } from 'react-minimal-pie-chart';
import StarRatings from 'react-star-ratings'
import '../../CSS/CompanyReviews.css'
import Paginate from '../Paginate';
import {markReviewFav, markReviewFeatured} from '../../../actions/company/companyreviews';
import Alert from '../../Alert';
import defaultLogo from '../../images/default_logo.png';
import Pagination from 'react-js-pagination';

const CompanyReviews = ({
    getCurrentCompanyReviews, 
    getCurrentCompanyProfile, 
    companyreviews:{companyreviews, loading},
    companyprofile:{companyprofile},
    markReviewFav,
    markReviewFeatured,
    match
}) => {
    useEffect(()=>{
        getCurrentCompanyReviews()
        getCurrentCompanyProfile()
    },[getCurrentCompanyProfile, getCurrentCompanyReviews])

    // const [curPage, setCurPg] = useState(1);
    // const [profilesPerPage, setProfilesPerPage] = useState(3);

    // const lastpostidx = curPage * profilesPerPage;
    // const firstpostidx = lastpostidx-profilesPerPage;

    // const paginate = pg => setCurPg(pg);

    const [activePage, setactivePage] = useState(1);

  // Logic for displaying current menu items
  const indexOfLast = activePage * 3;
  const indexOfFirst = indexOfLast - 3;
  // const currentResults = results.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => {
    setactivePage(pageNumber);
  };

    const markFav =(rev_id)=>{
        markReviewFav(rev_id)
        window.location.reload();
    }

    const markFeatured =(rev_id)=>{
        markReviewFeatured(rev_id)
        window.location.reload();
    }

    const history = useHistory();

    const reviewReply = (id) =>{ 
        let path = `/company/reply/review/${id}`; 
        history.push(path);
      }

    return (
        <Fragment>
            <CmpNav2/>
            
            <div className='contentholder-Jobs-company mt-1'>
            <Alert/>
                <div className="contentholder-Jobs-company-sub">
                    {loading  && companyprofile ===null ? <Spinner/>:
                    <Fragment>
                    <div className="company-reviews-stats">
                        <div className="profile-row-three-inside">
                            <div style={{ fontSize: "18px", color: "#0D0D0D" }} className="font-weight-bold">{companyprofile.name} Reviews</div>
                            <table className="overview-charts">
                                <tr>
                                    <td><PieChart
                                        data={[
                                            { title: 'One', value: companyprofile.overAllRating, color: '#13aa41' },
                                            { title: 'Two', value: (100 - companyprofile.overAllRating), color: '#dee0e3' }
                                        ]}
                                        totalValue={100}
                                        lineWidth={25}
                                        style={{ height: '70px' }}
                                        label={({ dataEntry }) => (dataEntry.title === "One" ? dataEntry.value + "%" : "")}
                                        labelStyle={{
                                            fontSize: '22px',
                                            fontFamily: 'sans-serif',
                                            fill: '#13aa41',
                                        }}
                                        labelPosition={0}/> 
                                    </td>
                                    <td> Over All Rating</td>
                                    <td><PieChart
                                        data={[
                                            { title: 'One', value: companyprofile.recommendationRating, color: '#13aa41' },
                                            { title: 'Two', value: (100 - companyprofile.recommendationRating), color: '#dee0e3' }
                                        ]} totalValue={100}
                                        lineWidth={25}
                                        style={{ height: '70px' }}
                                        label={({ dataEntry }) => (dataEntry.title === "One" ? dataEntry.value + "%" : "")}
                                        labelStyle={{
                                            fontSize: '22px',
                                            fontFamily: 'sans-serif',
                                            fill: '#13aa41',
                                        }}
                                        labelPosition={0}/>
                                    </td>
                                    <td>Recommend to a Friend</td>
                                    <td><PieChart
                                        data={[
                                            { title: 'One', value: companyprofile.ceoApprovalRating, color: '#13aa41' },
                                            { title: 'Two', value: (100 - companyprofile.ceoApprovalRating), color: '#dee0e3' }
                                        ]} totalValue={100}
                                        lineWidth={25}
                                        style={{ height: '70px' }}
                                        label={({ dataEntry }) => (dataEntry.title === "One" ? dataEntry.value + "%" : "")}
                                        labelStyle={{
                                            fontSize: '22px',
                                            fontFamily: 'sans-serif',
                                            fill: '#13aa41',
                                        }}
                                        labelPosition={0}/>
                                    </td>
                                    <td>Approve of CEO</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                    <div className="company-cards-3columns">
                        
                        {(companyreviews && companyreviews.length > 0) ? companyreviews.slice(indexOfFirst,indexOfLast).map(review => (
                            <React.Fragment>
                            <div className='company-cards-column-one'>
                                <div className="overview-review-date">{(review.date + "").substring(0, 10)}</div>
                                    <table className="overview-reviews-table-all">
                                        <tr>
                                            <td style={{ verticalAlign: "top" }}><img className="overview-logo-jobs" src={companyprofile.logo? require('../../../components/images/' + companyprofile.logo + '_logo.jpg').default : companyprofile.logo} alt="" /></td>
                                            <td>
                                                <table>
                                                    <tr className="overview-review-headline"><td>"{review.headline}"</td></tr>
                                                    <tr className="overview-review-star-ratings"> <td>{review.overAllRating}.0 <StarRatings rating={+review.overAllRating} starDimension="20px" starSpacing="1px" starRatedColor="#0caa41" numberOfStars={5} name='rating' /></td></tr><br/>
                                                    <tr><td>{review.comment}</td></tr>
                                                    <tr><td><div className="overview-reviews-pros-cons-title">Pros:</div><div className="overview-reviews-pros-cons"> {review.pros} </div></td></tr>
                                                    <tr><td><div className="overview-reviews-pros-cons-title">Cons:</div><div className="overview-reviews-pros-cons"> {review.cons} </div></td></tr>
                                                    {/* {review.reply>0?  */}
                                                    <tr><td><div className="overview-reviews-pros-cons-title" style={{color: '#1861bf'}}>Reply:</div> {review.reply.map(reply=>(
                                                        <div className="overview-reviews-pros-cons"> {reply.message} </div>
                                                    ))}
                                                    </td></tr> 
                                                </table>
                                            </td>
                                        </tr>
                                    </table> 
                                    <br/>
                                    <div className="company-reviews-options">
                                <ul>
                                    <li>
                                        {review.favorite===true ? <Link className="action-icons"><i className="fas fa-heart" style={{ color: '#ff0000' }}></i></Link>:
                                        <button className="action-icons" onClick={(e)=> (markFav(review._id))}><i type='button' className="far fa-heart" style={{ color: '#13AA41' }}></i></button>}
                                        
                                    </li>
                                    &emsp;
                                    <li>
                                        <button className="action-icons" onClick={(e)=> (reviewReply(review._id))}><i className="fas fa-comments" style={{ color: '#13AA41' }}></i></button>  
                                    </li>
                                    &emsp;
                                    <li>
                                        {review.featured === true ? <button className='actions-green'>Featured</button> : <button className='actions-light' onClick={(e)=> (markFeatured(review._id))}>Featured</button>}
                                        
                                    </li>
                                    
                                </ul>
                            </div>                    
                            </div>
                            
                            
                            </React.Fragment>
                        )) : <div> No Reviews Yets</div>
                        
                        } 
                        <br/>
                        

                    </div>
                    
                            {/* <Paginate itemsPerPage={profilesPerPage} totalItems={companyreviews.length} paginate={paginate}/> */}
                            <div style={{marginLeft:"40%"}}>
            <Pagination
              itemClass='page-item'
              linkClass='page-link'
              activeClass='gd-blue'
              activeLinkClass='paginate'
              activePage={activePage}
              itemsCountPerPage={3}
              totalItemsCount={companyreviews.length}
              pageRangeDisplayed={10}
              onChange={handlePageChange}
            />
          </div>

                       
                </Fragment>                 
                    }
                </div>
            </div>
            
        </Fragment>
    )
}

CompanyReviews.propTypes = {
    getCurrentCompanyReviews: PropTypes.func.isRequired,
    getCurrentCompanyProfile: PropTypes.func.isRequired,
    companyreviews: PropTypes.object.isRequired,
    companyprofile: PropTypes.object.isRequired,
    markReviewFav: PropTypes.func.isRequired,
    markReviewFeatured: PropTypes.func.isRequired,
}
 const mapStateToProps = state =>({
    companyreviews: state.companyreviews,
    companyprofile: state.companyprofile

})

export default connect(mapStateToProps, {getCurrentCompanyReviews, getCurrentCompanyProfile, markReviewFav, markReviewFeatured})(CompanyReviews)
