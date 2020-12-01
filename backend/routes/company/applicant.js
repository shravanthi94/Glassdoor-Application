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
        // console.log("Print this", company._id)
        if (company) {
            const jobPosting = await Jobposting.find({
                $and: [{ "_id": req.params.id },
                    { "company": company._id }
                ]
            }).populate('applicants.student');
            if (jobPosting.length > 0) {
                res.status(200).json(jobPosting[0]);
            } else {
                return res.status(400).json({ msg: 'No job posted yet!' });
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


// @route  GET /company/applicant/aplicantdetail/:id
// @Desc   Get applicant detail by ID
// @access Private

router.get('/aplicantdetail/:id', companyCheckAuth, async(req, res) => {
    try {
        const job = await Jobposting.findOne({
            $and: [{ email: req.company.email },
                { 'applicants._id': req.params.id }
            ]
        });

        const applicantIndex = job.applicants.map((item) => item.id).indexOf(req.params.id);
        const applicant = await job.applicants[applicantIndex];
        if (!job) return res.status(400).json({ msg: 'There is no Job' });
        res.json(applicant);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

// @route  GET /company/applicant/student/:id
// @Desc   Get student detail by ID
// @access Private

// router.get('/student/:id', async(req, res) => {
//     try {
//         const student = await Student.findOne({ '_id': req.params.id });
//         if (!student) return res.status(400).json({ msg: 'No student Found' });
//         res.status(200).json(student);

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error: Database');
//     }
// });

// @route  GET /company/applicant/student/:email
// @Desc   Get student detail by emailID
// @access Private

router.get('/student/:email', async(req, res) => {
    try {
        const student = await Student.findOne({ 'email': req.params.email });
        if (!student) return res.status(400).json({ msg: 'No student Found' });
        res.status(200).json(student);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

// @route  POST /company/applicant/statusUpdate/:applicantId
// @Desc   Update the applicant status Submitted, reviewed, initial screening, Interviewing, Hired
// @access Private

router.post('/statusUpdate/:applicantId', companyCheckAuth, async(req, res) => {
    console.log("backend1")
    const data = {
        'applicants.$.applicantStatus': req.body.applicantStatus,
    };
    try {
        console.log('backend', req.body.applicantStatus);
        const job = await Jobposting.findOneAndUpdate({ "email": req.company.email, 'applicants._id': req.params.applicantId }, { $set: data }, { new: true });
        // console.log(job);

        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// router.put('aplicantdetail/:jobId/:appId', auth, async(req, res) => {
//     // build profile object

//     const data = {
//         'applicants.$.applicantStatus': req.body.applicantStatus,
//     };
//     try {
//         console.log('Props', data);
//         const Job = await RestProfile.findOneAndUpdate({ restuser: req.restuser.id, 'menuitems._id': req.params.menu_id }, { $set: data }, { new: true });
//         console.log(restprofile);

//         res.json(restprofile);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });


module.exports = router;