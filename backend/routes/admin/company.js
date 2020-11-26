// 1. Admin users should be able to see the list of companies in the system.
// 2. They should be able to search for companies using Company name.
// 3. On clicking a Company name from results, they should be able to view all the reviews 
// of the company(both approved reviews and rejected reviews).
// 4. Admin user should also be able to see the statistics of job related data of that particular company.
// For example (Number of hired applicant, demography of the applicant).

const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Company = require('../../models/CompanyModel');
const JobPostings = require('../../models/JobPostingModel');
const Reviews = require('../../models/ReviewModel');

const { adminAuth, adminCheckAuth } = require('../../middleware/adminAuth');

adminAuth();

// @route  GET /admin/companies
// @Desc   Get all reviews of which are pending for approval
// @access Private

router.get('/', adminCheckAuth, async(req, res) => {
    try {
        console.log("Get a list of all companies from the database");
        const companies = await Company.find().select("overAllRating name _id email location ceoName website type industry");

        console.log("companies list fetched");
        if (!companies || companies.length === 0 ) {
            return res.status(404).json({ msg: 'No Companies have registered!' });
        } else if( companies ) {
            return res.status(200).json(companies);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

// @route  GET /admin/companies/*/reviews
// @Desc   Get all approved and rejected company reviews
// @access Private

router.get('/:company_id/reviews', adminCheckAuth, async(req, res) => {
    try {
        console.log("Get a list of all reviews for a company from the database");
        const reviews = await Reviews.find({company: req.params.company_id, approvalStatus:{ $ne: 'new' }});
        console.log("reviews list fetched");
        if (!reviews || reviews.length === 0 ) {
            return res.status(404).json({ msg: 'No Reviews for the company!' });
        } else if( reviews ) {
            return res.status(200).json(reviews);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

// @route  GET /admin/companies/*/hired-applicants
// @Desc   Get number of hired applicants for a company
// @access Private

router.get('/:company_id/hired-applicants', adminCheckAuth, async(req, res) => {
    try {
        console.log("Get a list of all reviews for a company from the database");
        JobPostings.aggregate([
            { "$match": { 
                $and: [
                    {'company': mongoose.Types.ObjectId(req.params.company_id)}, 
                    { "applicants.applicantStatus": { $eq: 'hired' } }
                ]} 
            },
            { "$project": {
                    "applicants": {
                        "$map": {
                            "input": {
                                "$filter": {
                                    "input": "$applicants",
                                    "as": "applicant",
                                    "cond": { "$eq": ["$$applicant.applicantStatus", "hired"] }
                                }
                            },
                            "as": "item",
                            "in": "$$item"
                        }
                    }
                } 
            },
        ]).exec((err, jobPostings) => {
            console.log("jobPostings list fetched");
            if (err) {
                console.error(err.message);
                return res.status(500).send('Server Error: Database');
            } else if (jobPostings && jobPostings.length>0 ){
                var counter = 0;
                for(var i = 0; i < jobPostings.length; i++) {
                    counter = counter + jobPostings[i].applicants.length;
                }
                return res.status(200).json({ hiredApplicants : counter, company : req.params.company_id});
            } else {
                return res.status(404).json({msg:'No hires for the company!'});
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

// @route  GET /admin/companies/*/hired-applicants
// @Desc   Get number of hired applicants for a company
// @access Private

router.get('/:company_id/hired-applicants', adminCheckAuth, async(req, res) => {
    try {
        console.log("Get a list of all reviews for a company from the database");
        JobPostings.aggregate([
            { "$match": { 
                $and: [
                    {'company': mongoose.Types.ObjectId(req.params.company_id)}, 
                    { "applicants.applicantStatus": { $eq: 'hired' } }
                ]} 
            },
            { "$project": {
                    "jobPostings": {
                        "$map": {
                            "input": {
                                "$filter": {
                                    "input": "$applicants",
                                    "as": "applicant",
                                    "cond": { "$eq": ["$$applicant.applicantStatus", "hired"] }
                                }
                            },
                            "as": "item",
                            "in": "$$item"
                        }
                    }
                } 
            },
        ]).exec((err, jobPostings) => {
            console.log("jobPostings list fetched");
            if (err) {
                console.error(err.message);
                return res.status(500).send('Server Error: Database');
            } else {
                return res.status(200).json(jobPostings);
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

module.exports = router;