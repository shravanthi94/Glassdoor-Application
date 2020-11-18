/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
// const { restauth, restcheckAuth } = require('../../../config/passportjwt');
const Company = require('../../models/CompanyModel');
const Student = require('../../models/StudentModel');
const Jobposting = require('../../models/JobPostingModel');

// const auth = require('../../../middleware/auth');
const { companyAuth, companyCheckAuth } = require('../../middleware/companyAuth');
const mysqlConnectionPool = require('../../config/sqlConnectionPool');

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

router.post('/', [companyCheckAuth, [
    check('title', 'title is required.').not().isEmpty(),
    check('description', 'description is required').not().isEmpty(),
    check('responsibilities', 'Mention responsibilities').not().isEmpty(),
    check('qualifications', 'Mention qualifications').not().isEmpty(),
    check('country', 'Please mention country').not().isEmpty(),
    check('Remote', 'Please mention if the work type is Remote').not().isEmpty(),

]], async(req, res) => {
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
            zip
        } = req.body;

        let company = await Company.findOne({ "email": req.company.email });
        if (company) {
            console.log(company._id)
            const jobPostingFields = {};
            jobPostingFields.company = company._id;
            jobPostingFields.name = req.company.name;
            jobPostingFields.email = req.company.email;
            if (title) jobPostingFields.title = title;
            if (description) jobPostingFields.description = description;
            if (responsibilities) {
                jobPostingFields.responsibilities = responsibilities.split(',').map(responsibility => responsibility.trim());
            }
            if (qualifications) {
                jobPostingFields.qualifications = qualifications.split(',').map(qualification => qualification.trim());
            }
            if (industry) jobPostingFields.industry = industry;
            if (country) jobPostingFields.country = country;
            if (Remote) jobPostingFields.Remote = Remote;
            if (inPerson) jobPostingFields.inPerson = inPerson;
            if (street) jobPostingFields.street = street;
            if (city) jobPostingFields.city = city;
            if (state) jobPostingFields.state = state;
            if (zip) jobPostingFields.zip = zip;
            // company = await Jobposting.findOneAndUpdate({ "email": req.company.email }, { $set: jobPostingFields }, { new: true });
            company = new Jobposting(jobPostingFields);
            await company.save();
            res.status(200).json(company);

        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// get job by id by currently logged in company

// get all the job postings 


module.exports = router;