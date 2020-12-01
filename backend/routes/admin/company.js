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
        const companies = await Company.find().select("overAllRating name _id email location ceoName website type industry headquarters size founded revenue logo");

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
                    "name": 1,
                    "title": 1,
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
                jobPostings.map(jobPosting =>  {
                    jobPosting.count = jobPosting.applicants.length;
                    delete jobPosting.applicants;
                });
                return res.status(200).json({jobPostings});
            } else {
                return res.status(404).json({msg:'No hires for the company!'});
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

// @route  GET /admin/companies/*/applicant-demographics
// @Desc   Get demographics of an applicant for a company
// @access Private

router.get('/:company_id/applicant-demographics', adminCheckAuth, async(req, res) => {
    try {
        console.log("Get a list of all reviews for a company from the database");
        var query = JobPostings.find({company: req.params.company_id}).select('applicants name title');
        query.populate({ path: 'applicants.student', select: 'demographics' });
        query.exec((err, jobPostings) => {
            console.log("jobPostings list fetched");
            if (err) {
                console.error(err.message);
                return res.status(500).send('Server Error: Database');
            } else if (jobPostings && jobPostings.length>0 ){
                jobDemographics = [];
                for ( var i = 0; i < jobPostings.length; i++ ) {
                    if ( jobPostings[i].applicants && jobPostings[i].applicants.length > 0 ) {
                        var asianCount = 0, nativeCount = 0, blackCount = 0, whiteCount = 0, islanderCount =0;
                        var maleCount = 0, femaleCount = 0;
                        var disabilityYes = 0, disabilityNo = 0;
                        var veteranYes = 0, veteranNo = 0;
                        for ( var j=0; j < jobPostings[i].applicants.length; j++ ) {
                            if ( jobPostings[i].applicants[j].student && jobPostings[i].applicants[j].student.demographics ) {

                                console.log('veteran: ', jobPostings[i].applicants[j].student.demographics.veteran)
                                console.log('disability: ', jobPostings[i].applicants[j].student.demographics.disability)

                                if ( jobPostings[i].applicants[j].student.demographics.veteran === 'Yes' ) {
                                    veteranYes = veteranYes+1;
                                } else if ( jobPostings[i].applicants[j].student.demographics.veteran === 'No' ) {
                                    veteranNo = veteranNo+1;
                                }

                                if ( jobPostings[i].applicants[j].student.demographics.disability === 'Yes' ) {
                                    disabilityYes = disabilityYes+1;
                                } else if (jobPostings[i].applicants[j].student.demographics.disability === 'No') {
                                    disabilityNo = disabilityNo+1;
                                }

                                if ( jobPostings[i].applicants[j].student.demographics.gender === 'Female' ) {
                                    femaleCount = femaleCount+1;
                                } else if (jobPostings[i].applicants[j].student.demographics.gender === 'Male' ) {
                                    maleCount = maleCount+1;
                                }

                                if ( jobPostings[i].applicants[j].student.demographics.ethnicity === 'American Indian or Alaska Native' ) {
                                    nativeCount = nativeCount+1;
                                } else if (jobPostings[i].applicants[j].student.demographics.ethnicity === 'Asian' ) {
                                    asianCount = asianCount+1;
                                } else if (jobPostings[i].applicants[j].student.demographics.ethnicity === 'Black or African American' ) {
                                    blackCount = blackCount+1;
                                } else if (jobPostings[i].applicants[j].student.demographics.ethnicity === 'Native Hawaiian or Other Pacific Islander' ) {
                                    islanderCount = islanderCount+1;
                                } else if (jobPostings[i].applicants[j].student.demographics.ethnicity === 'White' ) {
                                    whiteCount = whiteCount+1;
                                }
                            }
                        }
                        jobDemographics.push(
                            {
                                jobId: jobPostings[i]._id,
                                name: jobPostings[i].name,
                                title: jobPostings[i].title,
                                whiteCount : whiteCount, 
                                islanderCount : islanderCount, 
                                blackCount : blackCount, 
                                asianCount : asianCount,
                                nativeCount : nativeCount,
                                femaleCount : femaleCount,
                                maleCount : maleCount,
                                disabilityNo : disabilityNo,
                                disabilityYes : disabilityYes,
                                veteranNo : veteranNo,
                                veteranYes : veteranYes
                            }
                        )
                    } 
                }
                return res.status(200).json(
                    { 
                        jobDemographics: jobDemographics,
                        company : req.params.company_id
                        // jobPostings
                    }
                );
            } else {
                return res.status(404).json({msg:'No applicants for the jobs posted by the company!'});
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

module.exports = router;