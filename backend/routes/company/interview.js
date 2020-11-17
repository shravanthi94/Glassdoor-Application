/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const Interview = require('../../models/InterviewModel');
const { companyAuth, companyCheckAuth } = require('../../middleware/companyAuth');

// companyAuth();
// companyCheckAuth

// @route  GET /company/interview
// @Desc   Get all the company interview experiences
// @access Private

router.get('/:id', async (req, res) => {
    try {
        console.log("company id: ", req.params.id);
        const interviews = await Interview.find({ "company": req.params.id });

        console.log("reviews list: ", interviews);
        if (!interviews) {
            return res.status(400).json({ msg: 'No interview experience posted yet!' });
        }
        res.status(200).json(interviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});


// @route  POST /company/interview
// @Desc   Post an interview experience
// @access Private

router.post('/', async (req, res) => {
    try {
        console.log("interview details: ", req.body);
        const interview =  new Interview({ 

            company: req.body.company,
            employerName: req.body.employerName,
            overallInterviewExp: req.body.overallInterviewExp,
            title: req.body.title,
            description: req.body.description,
            difficulty: req.body.difficulty,
            offerStatus: req.body.offerStatus,
            questions: req.body.questions,
            answers: req.body.answers

         });

         await interview.save((error, data) => {
            if (error) {
                return res.status(400).json({ msg: "Couldn't add interview experience, try after sometime!" });
            }
            else {
                return res.status(200).json({ msg: "Interview experience added successfully" });
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

module.exports = router;