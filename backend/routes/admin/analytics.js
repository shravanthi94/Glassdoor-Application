// No of reviews per day.
// Top 10 company based on viewed per day.

const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Company = require('../../models/CompanyModel');
const Reviews = require('../../models/ReviewModel');
const Student = require('../../models/StudentModel');

const { adminAuth, adminCheckAuth } = require('../../middleware/adminAuth');

adminAuth();

// @route  GET /admin/analytics/most-reviewed-company
// @Desc   Get a list of all top most reviewed companies from the database
// @access Private

router.get('/most-reviewed-company', adminCheckAuth, async(req, res) => {
    try {
        console.log(req.query.limit);
        console.log("Get a list of all top most reviewed companies from the database");
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
                return res.status(500).send('Server Error: Database');
            } else if(mostReviewedCompany){
                return res.status(200).json({mostReviewedCompanies:mostReviewedCompany});
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

// @route  GET /admin/analytics/best-average-rating
// @Desc   Get a list of all top companies having the best average rating from the database
// @access Private
router.get('/best-average-rating', adminCheckAuth, async(req, res) => {
    try {
        console.log(req.query.limit);
        console.log("Get a list of all top companies having the best average rating from the database");
        const query = Company.find();
        query.select('_id overAllRating name');
        query.sort({overAllRating:-1});
        query.limit(parseInt(req.query.limit));
        query.exec((err, bestAverageRating) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Server Error: Database');
            } else if(bestAverageRating){
                return res.status(200).json({bestAverageRating:bestAverageRating});
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

// @route  GET /admin/analytics/top-ceo
// @Desc   Get a list of all top companies having the best ceo based rating from the database
// @access Private
router.get('/top-ceo', adminCheckAuth, async(req, res) => {
    try {
        console.log(req.query.limit);
        console.log("Get a list of all top companies having the best ceo based rating from the database");
        const query = Company.find();
        query.select('_id ceoApprovalRating ceoName name');
        query.sort({ceoApprovalRating:-1});
        query.limit(parseInt(req.query.limit));
        query.exec((err, bestCeoRating) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Server Error: Database');
            } else if(bestCeoRating){
                return res.status(200).json({bestCeos:bestCeoRating});
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

// @route  GET /admin/analytics/top-student-reviewer
// @Desc   Get a list of top students based on total accepted reviews made from the database
// @access Private
router.get('/top-student-reviewer', adminCheckAuth, async(req, res) => {
    try {
        console.log(req.query.limit);
        console.log("Get a list of top students based on total accepted reviews made from the database");
        // const query = Reviews.find({approvalStatus:{ $eq: 'approved' }});
        // query.select('student');
        // query.populate({ path: 'student', select: 'name' });
        // query.count(student._id);
        // query.sort({ceoApprovalRating:-1});
        // query.limit(parseInt(req.query.limit));

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
                return res.status(500).send('Server Error: Database');
            } else if(mostStudentReviews){
                return res.status(200).json({topStudentReviewers:mostStudentReviews});
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

module.exports = router;