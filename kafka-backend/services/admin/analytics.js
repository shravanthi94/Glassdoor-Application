const Company = require('../../models/CompanyModel');
const Reviews = require('../../models/ReviewModel');

function handle_request(msg, callback) {
    if (msg.path === 'most_reviewed_company') {
        mostReviewedCompany(msg, callback);
    } else if (msg.path === 'best_average_rating') {
        bestAverageRating(msg, callback);
    } else if (msg.path === 'best_ceos') {
        bestCeos(msg, callback);
    } else if (msg.path === 'top_student_reviewer') {
        topStudentReviewer(msg, callback);
    } else if (msg.path === 'top_student_reviewer') {
        topStudentReviewer(msg, callback);
    } else if (msg.path === 'reviews_per_day') {
        reviewsPerDay(msg, callback);
    } 
}

async function mostReviewedCompany(msg, callback) {
    var res = {};
    try {
        console.log('Entered most_reviewed_company. Message', msg);
        const query = Reviews.aggregate([
            {  
                "$group": {
                    "_id": "$company",
                    "company_id": {
                        "$first" : "$company"
                    },
                    "count": { "$sum": 1 }
                } 
            },
            { 
                "$sort": { 
                    "count": -1 
                } 
            },
            {
                "$lookup": {
                    "from": "companies",
                    "localField": "company_id",
                    "foreignField": "_id",
                    "as": "company"
                }
            },
            {
                "$unwind": "$company"
            },
            {
                "$project": {
                  "_id": 0,
                  "company_id": 1,
                  "name": '$company.name',
                  "count": 1
                }
            }
        ]);
        query.limit(parseInt(req.query.limit));
        query.exec((err, mostReviewedCompany) => {
            if (err) {
                console.error(err.message);
                res.status = 500;
                res.message = 'Server Error: Database';
                callback(null, res);
            } else if(mostReviewedCompany){
                res.status = 200;
                res.message = JSON.stringify({mostReviewedCompanies:mostReviewedCompany});
                callback(null, res);
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status = 500;
        res.message = 'Server Error: Database';
        callback(null, res);
    }
}

async function bestAverageRating(msg, callback) {
    var res = {};
    try {
        console.log('Entered best_average_rating. Message', msg);
        const query = Company.find();
        query.select('_id overAllRating name');
        query.sort({overAllRating:-1});
        query.limit(parseInt(req.query.limit));
        query.exec((err, bestAverageRating) => {
            if (err) {
                console.error(err.message);
                res.status = 500;
                res.message = 'Server Error: Database';
                callback(null, res);
            } else if(bestAverageRating){
                res.status = 200;
                res.message = JSON.stringify({bestAverageRating:bestAverageRating});
                callback(null, res);
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status = 500;
        res.message = 'Server Error: Database';
        callback(null, res);
    }
}

async function bestCeos(msg, callback) {
    var res = {};
    try {
        console.log('Entered best_ceos. Message', msg);
        const query = Company.find();
        query.select('_id ceoApprovalRating ceoName name');
        query.sort({ceoApprovalRating:-1});
        query.limit(parseInt(req.query.limit));
        query.exec((err, bestCeoRating) => {
            if (err) {
                console.error(err.message);
                res.status = 500;
                res.message = 'Server Error: Database';
                callback(null, res);
            } else if(bestCeoRating){
                res.status = 200;
                res.message = JSON.stringify({bestCeos:bestCeoRating});
                callback(null, res);
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status = 500;
        res.message = 'Server Error: Database';
        callback(null, res);   
    }
};

async function topStudentReviewer(msg, callback) {
    var res = {};
    try {
        console.log('Entered top_student_reviewer. Message', msg);
        const query = Reviews.aggregate([
            { 
                "$match": { "approvalStatus": { $eq: 'approved' } } 
            },
            {  
                "$group": {
                    "_id": "$student",
                    "student_id": {
                        "$first" : "$student"
                    },
                    "count": { "$sum": 1 }
                } 
            },
            { 
                "$sort": { 
                    "count": -1 
                } 
            },
            {
                "$lookup": {
                    "from": "students",
                    "localField": "student_id",
                    "foreignField": "_id",
                    "as": "student"
                }
            },
            {
                "$unwind": "$student"
            },
            {
                "$project": {
                  "_id": 0,
                  "student_id": 1,
                  "name": '$student.name',
                  "count": 1
                }
            }
        ]);
        query.limit(parseInt(req.query.limit));
        query.exec((err, mostStudentReviews) => {
            if (err) {
                console.error(err.message);
                res.status = 500;
                res.message = 'Server Error: Database';
                callback(null, res);
            } else if(mostStudentReviews){
                res.status = 200;
                res.message = JSON.stringify({topStudentReviewers:mostStudentReviews});
                callback(null, res);
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status = 500;
        res.message = 'Server Error: Database';
        callback(null, res);
    }
}

async function reviewsPerDay(msg, callback) {
    var res = {};
    try {
        console.log('Entered reviews_per_day. Message', msg);
        const query = Reviews.aggregate([
            {  
                "$group": {
                    "_id": "$date",
                    "count": { "$sum": 1 }
                } 
            },
            { 
                "$sort": { 
                    "count": -1 
                } 
            },
        ]);
        query.exec((err, reviewsPerDay) => {
            if (err) {
                console.error(err.message);
                res.status = 500;
                res.message = 'Server Error: Database';
                callback(null, res);;
            } else if(reviewsPerDay){
                res.status = 200;
                res.message = JSON.stringify({reviewsAnalytics:reviewsPerDay});
                callback(null, res);
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status = 500;
        res.message = 'Server Error: Database';
        callback(null, res);
    }
}

async function topViewedCompany(msg, callback) {
    var res = {};
    try {
        console.log('Entered top_viewed_company. Message', msg);
        var d = new Date();
        var mm = d.getMonth() + 1;
        var dd = d.getDate();
        var yy = d.getFullYear();
        var myDateString = yy + '-' + mm + '-' + dd;

        const query = Company.aggregate([
            { 
                "$match": { 
                    "views.date" : myDateString
                }
            },
            { 
                "$project": {
                    "views": {
                        "$map": {
                            "input": {
                                "$filter": {
                                    "input": "$views",
                                    "as": "views",
                                    "cond": { "$eq": ["$$views.date", myDateString] }
                                }
                            },
                            "as": "item",
                            "in": "$$item"
                        }
                    },
                    "name": 1,
                },
            },
        ]);
        query.sort({"views.count": -1});
        query.limit(parseInt(req.query.limit));
        query.exec((err, viewsPerDay) => {
            if (err) {
                console.error(err.message);
                res.status = 500;
                res.message = 'Server Error: Database';
                callback(null, res);
            } else if(viewsPerDay){
                res.status = 200;
                res.message = JSON.stringify({viewsAnalytics:viewsPerDay});
                callback(null, res);
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status = 500;
        res.message = 'Server Error: Database';
        callback(null, res);
    }
}

exports.handle_request = handle_request;