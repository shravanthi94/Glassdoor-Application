const { connect } = require("../../../../backend/routes/company/review");



const Reviews = ({
    getCompanyReviews,
  }) => {
    useEffect(() => {
      getCompanyReviews(restaurantId);
    }, []);

  return(<div>
      Inside Reviews
  </div>)
    }

export default connect(mapStateToProps, {getCompanyReviews})(Reviews);