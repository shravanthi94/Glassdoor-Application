/* eslint-disable max-len */
const Review = require('../../models/ReviewModel');

function handle_request(msg, callback) {
    if (msg.path === 'company_new_reviews') {
        companyNewReviews(msg, callback);
    } else if (msg.path === 'approve_review') {
        approveReview(msg, callback);
    }
}

async function companyNewReviews(msg, callback) {
    var res = {};
    try {
        console.log('Entered company_new_reviews. Message', msg);
        const reviews = await Review.find({ "approvalStatus": 'new' });

        console.log("reviews list: ", reviews);
        if (!reviews || reviews.length === 0 ) {
            res.status = 200;
            res.message = JSON.stringify({ msg: 'No reviews for approval!' });
            callback(null, res);
        }
        res.status = 200;
        res.message = JSON.stringify(reviews);
        callback(null, res);
    } catch (err) {
        console.error(err.message);
        res.status = 500;
        res.message = 'Server Error: Database';
        callback(null, res);
    }
}

async function approveReview(msg, callback) {
    var res = {};
    try {
        console.log('Entered approve_review. Message', msg);
        let review = await Review.findOne({ "_id": msg.review_id })
        if (review) {
            console.log("Found the review. Updating the approvalStatus", review)
            review = await Review.findOneAndUpdate({ "_id": msg.review_id }, { $set: { "approvalStatus": msg.approvalStatus } }, { new: true });
            res.status = 200;
            res.message = JSON.stringify({ msg: 'Review approval status changed successfully.' });
            callback(null, res);
        } else {
            res.status = 200;
            res.message = JSON.stringify({ msg: 'No Review found' });
            callback(null, res);
        }
    } catch (err) {
        console.error(err.message);
        res.status = 500;
        res.message = 'Server Error: Database';
        callback(null, res);
    }
}

exports.handle_request = handle_request;