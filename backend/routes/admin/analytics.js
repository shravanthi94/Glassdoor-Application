const express = require('express');
const router = express.Router();
const Company = require('../../models/CompanyModel');
const Reviews = require('../../models/ReviewModel');
const redisRead = require('../../config/RedisRead')
const redisWrite = require('../../config/RedisWrite')
const kafka = require('../../kafka/client');

const { adminAuth, adminCheckAuth } = require('../../middleware/adminAuth');

adminAuth();

// @route  GET /admin/analytics/most-reviewed-company
// @Desc   Get a list of all top most reviewed companies from the database
// @access Private

router.get('/most-reviewed-company', adminCheckAuth, async(req, res) => {
  try {
    redisRead.get('redisMostReviewedCompany', async (err, redisMostReviewedCompany) => {
      if(redisMostReviewedCompany !== null) {
        console.log("fetching redisMostReviewedCompany from inside redis")
        return res.status(200).json(JSON.parse(redisMostReviewedCompany));
      } else {
        console.log("fetching redisMostReviewedCompany from kafka call");
        req.body.path = 'most_reviewed_company';
        req.body.limit = req.query.limit;
        console.log('most_reviewed_company-> Authentication Completed');
        kafka.make_request('adminAnalytics', req.body, (err, results) => {
          if (err) {
            res.status(500).end('System Error');
          } else {
            if(results.status) {
              redisWrite.setex('redisMostReviewedCompany', 36000, results.message);
              console.log("writing redisMostReviewedCompany to redis finished", JSON.stringify(results))
            }
            res.status(results.status).end(results.message);
          }
        });
      }
    });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// @route  GET /admin/analytics/best-average-rating
// @Desc   Get a list of all top companies having the best average rating from the database
// @access Private

router.get('/best-average-rating', adminCheckAuth, async(req, res) => {
  try {
  redisRead.get('bestAverageRating', async (err, bestAverageRating) => {
    if(bestAverageRating !== null) {
      console.log("fetching bestAverageRating from inside redis")
      return res.status(200).json(JSON.parse(bestAverageRating));
    } else {
      console.log("fetching bestAverageRating from kafka call");
      req.body.path = 'best_average_rating';
      req.body.limit = req.query.limit;
      console.log('best_average_rating-> Authentication Completed');
      kafka.make_request('adminAnalytics', req.body, (err, results) => {
        if (err) {
          res.status(500).end('System Error');
        } else {
          if(results.status) {
            redisWrite.setex('bestAverageRating', 36000, results.message);
            console.log("writing bestAverageRating to redis finished", JSON.stringify(results))
          }
          res.status(results.status).end(results.message);
        }
      });
    }
});
} catch (err) {
  console.error(err.message);
  res.status(500).send('Server Error');
}
});

// @route  GET /admin/analytics/top-ceo
// @Desc   Get a list of all top companies having the best ceo based rating from the database
// @access Private

router.get('/top-ceo', adminCheckAuth, async(req, res) => {
  try {
    redisRead.get('topCeo', async (err, topCeo) => {
      if(topCeo !== null) {
        console.log("fetching topCeo from inside redis")
        return res.status(200).json(JSON.parse(topCeo));
      } else {
        console.log("fetching topCeo from kafka call");
    req.body.path = 'best_ceos';
    req.body.limit = req.query.limit;
    console.log('best_ceos-> Authentication Completed');
    kafka.make_request('adminAnalytics', req.body, (err, results) => {
      if (err) {
        res.status(500).end('System Error');
      } else {
        if(results.status) {
          redisWrite.setex('topCeo', 36000, results.message);
          console.log("writing topCeo to redis finished", JSON.stringify(results))
        }
        res.status(results.status).end(results.message);
      }
    });
  }
});
} catch (err) {
console.error(err.message);
res.status(500).send('Server Error');
}
});

// @route  GET /admin/analytics/top-student-reviewer
// @Desc   Get a list of top students based on total accepted reviews made from the database
// @access Private

router.get('/top-student-reviewer', adminCheckAuth, async(req, res) => {
  try {
    redisRead.get('topStudentReviewer', async (err, topStudentReviewer) => {
      if(topStudentReviewer !== null) {
        console.log("fetching topStudentReviewer from inside redis")
        return res.status(200).json(JSON.parse(topStudentReviewer));
      } else {
        console.log("fetching topStudentReviewer from kafka call");
    req.body.path = 'top_student_reviewer';
    req.body.limit = req.query.limit;
    console.log('top_student_reviewer-> Authentication Completed');
    kafka.make_request('adminAnalytics', req.body, (err, results) => {
      if (err) {
        res.status(500).end('System Error');
      } else {
        if(results.status) {
          redisWrite.setex('topStudentReviewer', 36000, results.message);
          console.log("writing topStudentReviewer to redis finished", JSON.stringify(results))
        }
        res.status(results.status).end(results.message);
      }
    });
  }
});
} catch (err) {
console.error(err.message);
res.status(500).send('Server Error');
}
});

// @route  GET /admin/analytics/reviews-per-day
// @Desc   Get a list of daily review count made from the database
// @access Private

router.get('/reviews-per-day', adminCheckAuth, async(req, res) => {
  try {
    redisRead.get('reviewsPerDay', async (err, reviewsPerDay) => {
      if(reviewsPerDay !== null) {
        console.log("fetching reviewsPerDay from inside redis")
        return res.status(200).json(JSON.parse(reviewsPerDay));
      } else {
        console.log("fetching reviewsPerDay from kafka call");
    req.body.path = 'reviews_per_day';
    req.body.limit = req.query.limit;
    console.log('reviews_per_day-> Authentication Completed');
    kafka.make_request('adminAnalytics', req.body, (err, results) => {
      if (err) {
        res.status(500).end('System Error');
      } else {
        if(results.status) {
          redisWrite.setex('reviewsPerDay', 36000, results.message);
          console.log("writing reviewsPerDay to redis finished", JSON.stringify(results))
        }
        res.status(results.status).end(results.message);
      }
    });
  }
});
} catch (err) {
console.error(err.message);
res.status(500).send('Server Error');
}
});

// @route  GET /admin/analytics/top-viewed-company
// @Desc   Get a list of top 10 company based on viewed per day from the database
// @access Private

router.get('/top-viewed-company', adminCheckAuth, async(req, res) => {
    req.body.path = 'top_viewed_company';
    req.body.limit = req.query.limit;
    console.log('top_viewed_company-> Authentication Completed');
    kafka.make_request('adminAnalytics', req.body, (err, results) => {
      if (err) {
        res.status(500).end('System Error');
      } else {
        res.status(results.status).end(results.message);
      }
    });
});

// router.get('/most-reviewed-company', adminCheckAuth, async(req, res) => {
//     try {
//         console.log(req.query.limit);
//         console.log("Get a list of all top most reviewed companies from the database");
//         const query = Reviews.aggregate([
//             {  
//                 "$group": {
//                     "_id": "$company",
//                     "company_id": {
//                         "$first" : "$company"
//                     },
//                     "count": { "$sum": 1 }
//                 } 
//             },
//             { 
//                 "$sort": { 
//                     "count": -1 
//                 } 
//             },
//             {
//                 "$lookup": {
//                     "from": "companies",
//                     "localField": "company_id",
//                     "foreignField": "_id",
//                     "as": "company"
//                 }
//             },
//             {
//                 "$unwind": "$company"
//             },
//             {
//                 "$project": {
//                   "_id": 0,
//                   "company_id": 1,
//                   "name": '$company.name',
//                   "count": 1
//                 }
//             }
//         ]);
//         query.limit(parseInt(req.query.limit));
//         query.exec((err, mostReviewedCompany) => {
//             if (err) {
//                 console.error(err.message);
//                 return res.status(500).send('Server Error: Database');
//             } else if(mostReviewedCompany){
//                 return res.status(200).json({mostReviewedCompanies:mostReviewedCompany});
//             }
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error: Database');
//     }
// });

// @route  GET /admin/analytics/best-average-rating
// @Desc   Get a list of all top companies having the best average rating from the database
// @access Private
// router.get('/best-average-rating', adminCheckAuth, async(req, res) => {
//     try {
//         console.log(req.query.limit);
//         console.log("Get a list of all top companies having the best average rating from the database");
//         const query = Company.find();
//         query.select('_id overAllRating name');
//         query.sort({overAllRating:-1});
//         query.limit(parseInt(req.query.limit));
//         query.exec((err, bestAverageRating) => {
//             if (err) {
//                 console.error(err.message);
//                 return res.status(500).send('Server Error: Database');
//             } else if(bestAverageRating){
//                 return res.status(200).json({bestAverageRating:bestAverageRating});
//             }
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error: Database');
//     }
// });

// @route  GET /admin/analytics/top-ceo
// @Desc   Get a list of all top companies having the best ceo based rating from the database
// @access Private
// router.get('/top-ceo', adminCheckAuth, async(req, res) => {
//     try {
//         console.log(req.query.limit);
//         console.log("Get a list of all top companies having the best ceo based rating from the database");
//         const query = Company.find();
//         query.select('_id ceoApprovalRating ceoName name');
//         query.sort({ceoApprovalRating:-1});
//         query.limit(parseInt(req.query.limit));
//         query.exec((err, bestCeoRating) => {
//             if (err) {
//                 console.error(err.message);
//                 return res.status(500).send('Server Error: Database');
//             } else if(bestCeoRating){
//                 return res.status(200).json({bestCeos:bestCeoRating});
//             }
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error: Database');
//     }
// });

// @route  GET /admin/analytics/top-student-reviewer
// @Desc   Get a list of top students based on total accepted reviews made from the database
// @access Private
// router.get('/top-student-reviewer', adminCheckAuth, async(req, res) => {
//     try {
//         console.log(req.query.limit);
//         console.log("Get a list of top students based on total accepted reviews made from the database");
//         const query = Reviews.aggregate([
//             { 
//                 "$match": { "approvalStatus": { $eq: 'approved' } } 
//             },
//             {  
//                 "$group": {
//                     "_id": "$student",
//                     "student_id": {
//                         "$first" : "$student"
//                     },
//                     "count": { "$sum": 1 }
//                 } 
//             },
//             { 
//                 "$sort": { 
//                     "count": -1 
//                 } 
//             },
//             {
//                 "$lookup": {
//                     "from": "students",
//                     "localField": "student_id",
//                     "foreignField": "_id",
//                     "as": "student"
//                 }
//             },
//             {
//                 "$unwind": "$student"
//             },
//             {
//                 "$project": {
//                   "_id": 0,
//                   "student_id": 1,
//                   "name": '$student.name',
//                   "count": 1
//                 }
//             }
//         ]);
//         query.limit(parseInt(req.query.limit));
//         query.exec((err, mostStudentReviews) => {
//             if (err) {
//                 console.error(err.message);
//                 return res.status(500).send('Server Error: Database');
//             } else if(mostStudentReviews){
//                 return res.status(200).json({topStudentReviewers:mostStudentReviews});
//             }
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error: Database');
//     }
// });

// @route  GET /admin/analytics/reviews-per-day
// @Desc   Get a list of daily review count made from the database
// @access Private
// router.get('/reviews-per-day', adminCheckAuth, async(req, res) => {
//     try {
//         console.log(req.query.limit);
//         console.log("Get a list of daily review count made from the database");
//         const query = Reviews.aggregate([
//             {  
//                 "$group": {
//                     "_id": "$date",
//                     "count": { "$sum": 1 }
//                 } 
//             },
//             { 
//                 "$sort": { 
//                     "count": -1 
//                 } 
//             },
//         ]);
//         query.exec((err, reviewsPerDay) => {
//             if (err) {
//                 console.error(err.message);
//                 return res.status(500).send('Server Error: Database');
//             } else if(reviewsPerDay){
//                 return res.status(200).json({reviewsAnalytics:reviewsPerDay});
//             }
//         });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error: Database');
//     }
// });

// @route  GET /admin/analytics/top-viewed-company
// @Desc   Get a list of top 10 company based on viewed per day from the database
// @access Private
// router.get('/top-viewed-company', adminCheckAuth, async(req, res) => {
//     try {
//         console.log(req.query.limit);
//         console.log("Get a list of top 10 company based on viewed per day from the database");

//         var d = new Date();
//         var mm = d.getMonth() + 1;
//         var dd = d.getDate();
//         var yy = d.getFullYear();
//         var myDateString = yy + '-' + mm + '-' + dd;

//         const query = Company.aggregate([
//             { 
//                 "$match": { 
//                     "views.date" : myDateString
//                 }
//             },
//             { 
//                 "$project": {
//                     "views": {
//                         "$map": {
//                             "input": {
//                                 "$filter": {
//                                     "input": "$views",
//                                     "as": "views",
//                                     "cond": { "$eq": ["$$views.date", myDateString] }
//                                 }
//                             },
//                             "as": "item",
//                             "in": "$$item"
//                         }
//                     },
//                     "name": 1,
//                 },
//             },
//         ]);
//         query.sort({"views.count": -1});
//         query.limit(parseInt(req.query.limit));
//         query.exec((err, viewsPerDay) => {
//             if (err) {
//                 console.error(err.message);
//                 return res.status(500).send('Server Error: Database');
//             } else if(viewsPerDay){
//                 return res.status(200).json({viewsAnalytics:viewsPerDay});
//             }
//         });

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

module.exports = router;
