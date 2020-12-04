/* eslint-disable max-len */
// Kafka working all routes in this file
const express = require('express');

const router = express.Router();
const Company = require('../../models/CompanyModel');
const { companyAuth, companyCheckAuth } = require('../../middleware/companyAuth');
const kafka = require('../../kafka/client');

companyAuth();
// companyCheckAuth

// @route  POST /company/interview
// @Desc   Post an interview experience
// @access Private

router.post('/', companyCheckAuth, async(req, res) => {
    // try {
    //     console.log("interview details: ", req.body);
    //     var data = {
    //         overallInterviewExp: req.body.overAllExperience,
    //         title: req.body.jobTitle,
    //         description: req.body.description,
    //         difficulty: req.body.difficulty,
    //         offerStatus: req.body.offerStatus,
    //         questions: req.body.question,
    //         answers: req.body.answer,
    //         jobTitle: req.body.jobTitle,
    //         student: req.body.student
    //     };

    //     const company = await Company.findByIdAndUpdate({ _id: req.body.company }, { $push: { interview: data }, $inc: { numberOfInterviews: 1 } }, { new: true });

    //     if (!company) {
    //         res.status(400).send("Couldn't add interview experience. Try after sometime");
    //     } else {
    //         console.log("After interview add - company: ", company);
    //         res.status(200).send(company);
    //     }

    // } catch (err) {
    //     console.error(err.message);
    //     res.status(500).send('Server Error: Database');
    // }

    const payload = {
        topic: 'addInterview',
        body: req.body,
        // id: req.params.id
    };
    console.log("addinterview", payload)
    kafka.make_request('interviewStudent', payload, (err, results) => {
        console.log('in result');
        if (err) {
            console.log('Inside err', err);
            res.status(500).send('System Error, Try Again.');
        } else {
            if (results.status === 400) {
                console.log('Inside err2', results);
                return res.status(400).json({ msg: results.message });
            }
            if (results.status === 500) {
                console.log('Inside err3', results);
                return res.status(500).send('Server Error');
            }
            console.log('in result1234', results);
            res.status(200).json(results.message);
        }
    });
});

module.exports = router;