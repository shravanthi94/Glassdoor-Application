/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const Company = require('../../models/CompanyModel');
const { companyAuth, companyCheckAuth } = require('../../middleware/companyAuth');

// companyAuth();
// companyCheckAuth

// @route  POST /company/interview
// @Desc   Post an interview experience
// @access Private

router.post('/', async (req, res) => {
    try {
        console.log("interview details: ", req.body);
        var data = {
            overallInterviewExp: req.body.overAllExperience,
            title: req.body.jobTitle,
            description: req.body.description,
            difficulty: req.body.difficulty,
            offerStatus: req.body.offerStatus,
            questions: req.body.question,
            answers: req.body.answer,
            jobTitle: req.body.jobTitle,
            student: req.body.student
        };

        const company = await Company.findByIdAndUpdate({ _id: req.body.company }, { $push: { interview: data }, $inc:{numberOfInterviews : 1}}, { new: true });

        if (!company) {
            res.status(400).send("Couldn't add interview experience. Try after sometime");
        } else {
            console.log("After interview add - company: ", company);
            res.status(200).send(company);
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

module.exports = router;