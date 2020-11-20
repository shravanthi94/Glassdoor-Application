const Review = require('../models/ReviewModel');

function handle_request(msg, callback) {
  var res = {};
  console.log('Calling in reviews.js for path : ', msg.path);
  if (msg.path === 'reviews_company_all') {
    console.log('Entered reviews_company_all');
    //5fb2f87d828aa81479d846a2
    Review.find({ company: "5fb2f87d828aa81479d846a1" }, (error,reviews) => {
      if (error) {
        console.log('Entered error block');
        res.status = 400;
        res.message= ({ msg: 'No reviews for this company' });
      }
      else if (reviews) {
        console.log('Entered success block');
        res.status = 200;
        res.message = JSON.stringify(reviews);
      }
      console.log('Before call back',res.message.length);
      callback(null, res);
    }).select("headline -_id");
  }
};

exports.handle_request = handle_request;