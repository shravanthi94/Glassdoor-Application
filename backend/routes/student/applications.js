"use strict"
const express = require("express");
const router = express.Router();
const { checkAuth } = require('../../middleware/studentAuth');
const JobPostings = require('../../models/JobPostingModel');
const path = require("path");
const mongoose= require("mongoose");
router.get("/:student_id", async (req, res) => {
    try {
         JobPostings.aggregate([
            { "$match":  
                    { "applicants.student": mongoose.Types.ObjectId(req.params.student_id)}
                
            },
            { "$project": {
                    "name": 1,
                    "title": 1,
                    "applications": {
                        "$map": {
                            "input": {
                                "$filter": {
                                    "input": "$applicants",
                                    "as": "applicant",
                                    "cond": { "$eq": ["$$applicant.student", mongoose.Types.ObjectId(req.params.student_id)] }
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
                return res.status(200).json({jobPostings});
            } else {
                return res.status(404).json({msg:'No hires for the company!'});
            }
        });
    }catch (err) {
        console.error(err.message);
        res.status(500).send({ msg: 'Server Error: Database' });
    }
});


router.post("/job/:job_id/withdraw/:application_id", async (req, res) => {
    try {
    console.log('Job application for withdraw : ', req.params.application_id)
    let job = await JobPostings.findOne({ "_id": req.params.job_id })
    if (job) {
        console.log("Found the job. Updating the status");
        job.applicants.map((applicant) => {
            if(applicant._id+"" === req.params.application_id) {
                applicant.applicantStatus = 'withdraw';
            }
        });
        job.save();
        return res.status(200).json({msg:"Application withdraw successful!"});

    } else {
        return res.status(400).json({ msg: 'No Job found' });
    }
 } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

module.exports = router;