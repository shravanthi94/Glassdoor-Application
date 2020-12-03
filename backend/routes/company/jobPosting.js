/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
// const { restauth, restcheckAuth } = require('../../../config/passportjwt');
const Company = require('../../models/CompanyModel');
const Student = require('../../models/StudentModel');
const Jobposting = require('../../models/JobPostingModel');

// const auth = require('../../../middleware/auth');
const {
  companyAuth,
  companyCheckAuth,
} = require('../../middleware/companyAuth');
const mysqlConnectionPool = require('../../config/sqlConnectionPool');

const kafka = require('../../kafka/client');

companyAuth();

// @route  POST /company/jobposting
// @Desc   Create/ Update job posting by currently logged in company
// @access Private

// router.post('/', [companyCheckAuth, [
//     check('title', 'title is required.').not().isEmpty(),
//     check('description', 'description is required').not().isEmpty(),
//     check('responsibilities', 'Mention responsibilities').not().isEmpty(),
//     check('qualifications', 'Mention qualifications').not().isEmpty(),
//     check('country', 'Please mention country').not().isEmpty(),
//     check('Remote', 'Please mention if the work type is Remote').not().isEmpty(),

// ]], async(req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     // build profile object
//     const {
//         title,
//         description,
//         responsibilities,
//         qualifications,
//         industry,
//         country,
//         Remote,
//         inPerson,
//         street,
//         city,
//         state,
//         zip
//     } = req.body;
//     const jobPostingFields = {};
//     // jobPostingFields.company = req.body.company;
//     jobPostingFields.name = req.company.name;
//     jobPostingFields.email = req.company.email;
//     if (title) jobPostingFields.title = title;
//     if (description) jobPostingFields.description = description;
//     if (responsibilities) {
//         jobPostingFields.responsibilities = responsibilities.split(',').map(responsibility => responsibility.trim());
//     }
//     if (qualifications) {
//         jobPostingFields.qualifications = qualifications.split(',').map(qualification => qualification.trim());
//     }
//     if (industry) jobPostingFields.industry = industry;
//     if (country) jobPostingFields.country = country;
//     if (Remote) jobPostingFields.Remote = Remote;
//     if (inPerson) jobPostingFields.inPerson = inPerson;
//     if (street) jobPostingFields.street = street;
//     if (city) jobPostingFields.city = city;
//     if (state) jobPostingFields.state = state;
//     if (zip) jobPostingFields.zip = zip;
//     try {

//         let company = await Jobposting.findOne({ "email": req.company.email });

//         if (company) {
//             // update
//             company = await Jobposting.findOneAndUpdate({ "email": req.company.email }, { $set: jobPostingFields }, { new: true });
//             return res.json(company);
//         }
//         company = new Jobposting(jobPostingFields);
//         await company.save();
//         res.status(200).json(company);

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }

// });

router.post(
  '/',
  [
    companyCheckAuth,
    [
      check('title', 'title is required.').not().isEmpty(),
      check('description', 'description is required').not().isEmpty(),
      check('responsibilities', 'Mention responsibilities').not().isEmpty(),
      check('qualifications', 'Mention qualifications').not().isEmpty(),
      check('country', 'Please mention country').not().isEmpty(),
      check('Remote', 'Please mention if the work type is Remote')
        .not()
        .isEmpty(),
      check('jobType', 'Please enter job type').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // build profile object
      const {
        title,
        description,
        responsibilities,
        qualifications,
        industry,
        country,
        Remote,
        inPerson,
        street,
        city,
        state,
        salary,
        zip,
        jobType,
      } = req.body;

      let company = await Company.findOne({ email: req.company.email });
      if (company) {
        console.log(company._id);
        const jobPostingFields = {};
        jobPostingFields.company = company._id;
        jobPostingFields.name = req.company.name;
        jobPostingFields.email = req.company.email;
        if (title) jobPostingFields.title = title;
        if (salary) jobPostingFields.salary = salary;
        if (description) jobPostingFields.description = description;
        if (responsibilities) {
          jobPostingFields.responsibilities = responsibilities
            .split(',')
            .map((responsibility) => responsibility.trim());
        }
        if (qualifications) {
          jobPostingFields.qualifications = qualifications
            .split(',')
            .map((qualification) => qualification.trim());
        }
        if (industry) jobPostingFields.industry = industry;
        if (country) jobPostingFields.country = country;
        if (Remote) jobPostingFields.Remote = Remote;
        if (inPerson) jobPostingFields.inPerson = inPerson;
        if (street) jobPostingFields.street = street;
        if (city) jobPostingFields.city = city;
        if (state) jobPostingFields.state = state;
        if (zip) jobPostingFields.zip = zip;
        if (jobType) jobPostingFields.jobType = jobType;
        console.log('job Type', jobType);
        // company = await Jobposting.findOneAndUpdate({ "email": req.company.email }, { $set: jobPostingFields }, { new: true });
        let job = new Jobposting(jobPostingFields);
        await job.save();
        res.status(200).json(job);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// get all the job postings by current company
// @route  GET /company/jobposting/myjobs
// @Desc   Get all the jobs created by current company
// @access Private

router.get('/myjobs', companyCheckAuth, async (req, res) => {
  //   try {
  //     const jobs = await Jobposting.find({ email: req.company.email })
  //       .populate('applicants.student')
  //       .sort({ date: -1 });
  //     if (!jobs)
  //       return res
  //         .status(400)
  //         .json({ msg: 'There are no Jobs created by this Restaurant' });
  //     res.json(jobs);
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send('Server Error');
  //   }

  const payload = {
    topic: 'allJobs',
    company: req.company,
  };
  kafka.make_request('companyJobPosting', payload, (err, results) => {
    console.log('in result');
    if (err) {
      console.log('Inside err');
      res.status(500).send('System Error, Try Again.');
    } else {
      if (results.status === 400) {
        return res.status(400).json({ errors: [{ msg: results.message }] });
      }
      if (results.status === 500) {
        return res.status(500).send('Server Error');
      }
      res.status(200).json(results.message);
    }
  });
});

module.exports = router;
