"user strict";
const Review = require('../../models/ReviewModel');

const handle_request = async (msg, callback) => {
    console.log("reviews service: ", msg);
    var res = {};
    const reviews = await Review.find({ "company": msg }).limit(10);

    if (!reviews) {
        res.status = 400; res.reviews = "No reviews yet!";
        callback(null, res);
    } else {
        res.status = 200; res.reviews = reviews;
        callback(null, res);
    }
}
module.exports.handle_request = handle_request;