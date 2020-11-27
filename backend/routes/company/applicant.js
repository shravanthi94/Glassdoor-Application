/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const Company = require('../../models/CompanyModel');
const Student = require('../../models/StudentModel');
const Jobposting = require('../../models/JobPostingModel');
const { companyAuth, companyCheckAuth } = require('../../middleware/companyAuth');
const mysqlConnectionPool = require('../../config/sqlConnectionPool');

companyAuth();

/*** APPLICANT PAGE (COMPANY) ***/

// @route  GET /company/applicant
// @Desc   Fetch current company's jobs by jobid
// @access Private

router.get('/:id', companyCheckAuth, async(req, res) => {
    try {
        let company = await Company.findOne({ "email": req.company.email });
        console.log("Print this", company._id)
        if (company) {
            const jobPosting = await Jobposting.find({
                $and: [{ "_id": req.params.id },
                    { "company": company._id }
                ]
            });
            if (jobPosting.length > 0) {
                res.status(200).json(jobPosting[0]);
            } else {
                console.log("No jobs found")
            }


        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});



// @route  GET /company/applicant
// @Desc   Employer can see the resume and cover letter attached by applicant in front of their name.
// @access Private


// @route  POST /company/applicant/statusUpdate
// @Desc   Update the applicant status Submitted, reviewed, initial screening, Interviewing, Hired
// @access Private

module.exports = router;