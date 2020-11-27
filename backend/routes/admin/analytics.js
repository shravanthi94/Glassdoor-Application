// No of reviews per day.
// Top 5 company based on average rating.
// Top 5 students based on total accepted reviews made. 
// Top 10 CEO’s based on rating.
// Top 10 company based on viewed per day.

const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Company = require('../../models/CompanyModel');
const JobPostings = require('../../models/JobPostingModel');
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
                  "company.name": 1,
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

module.exports = router;