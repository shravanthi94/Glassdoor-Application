"use strict"
const express = require("express");
const router = express.Router();
const { checkAuth } = require('../../middleware/studentAuth');
const JobPostings = require('../../models/JobPostingModel');
const path = require("path");
const mongoose= require("mongoose");
const kafka = require('../../kafka/client');

// router.get("/:student_id", async (req, res) => {
//     try {
//          JobPostings.aggregate([
//             { "$match":  
//                     { "applicants.student": mongoose.Types.ObjectId(req.params.student_id)}
                
//             },
//             { "$project": {
//                     "name": 1,
//                     "title": 1,
//                     "applications": {
//                         "$map": {
//                             "input": {
//                                 "$filter": {
//                                     "input": "$applicants",
//                                     "as": "applicant",
//                                     "cond": { "$eq": ["$$applicant.student", mongoose.Types.ObjectId(req.params.student_id)] }
//                                 }
//                             },
//                             "as": "item",
//                             "in": "$$item"
//                         }
//                     }
//                 } 
//             },
//         ]).exec((err, jobPostings) => {
//             console.log("jobPostings list fetched");
//             if (err) {
//                 console.error(err.message);
//                 return res.status(500).send('Server Error: Database');
//             } else if (jobPostings && jobPostings.length>0 ){
//                 return res.status(200).json({jobPostings});
//             } else {
//                 return res.status(404).json({msg:'No hires for the company!'});
//             }
//         });
//     }catch (err) {
//         console.error(err.message);
//         res.status(500).send({ msg: 'Server Error: Database' });
//     }
// });

router.get("/:student_id", async (req, res) => {
    req.body.path = 'my_applications';
    req.body.student_id = req.params.student_id;
    console.log('all_companies_get-> Authentication Completed');
    kafka.make_request('studentJobApplications', req.body, (err, results) => {
      if (err) {
        res.status(500).end('System Error');
      } else {
        res.status(results.status).end(results.message);
      }
    });
});

// router.post("/job/:job_id/withdraw/:application_id", async (req, res) => {
//   try {
//   console.log('Job application for withdraw : ', req.params.application_id)
//   let job = await JobPostings.findOne({ "_id": req.params.job_id })
//   if (job) {
//       console.log("Found the job. Updating the status");
//       job.applicants.map((applicant) => {
//           if(applicant._id+"" === req.params.application_id) {
//               applicant.applicantStatus = 'withdraw';
//           }
//       });
//       job.save();
//       return res.status(200).json({msg:"Application withdraw successful!"});

//   } else {
//       return res.status(400).json({ msg: 'No Job found' });
//   }
// } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error: Database');
//   }
// });

router.post("/job/:job_id/withdraw/:application_id", async (req, res) => {
    req.body.path = 'withdraw_application';
    req.body.job_id = req.params.job_id;
    req.body.application_id = req.params.application_id;
    console.log('all_companies_get-> Authentication Completed');
    kafka.make_request('studentJobApplications', req.body, (err, results) => {
      if (err) {
        res.status(500).end('System Error');
      } else {
        res.status(results.status).end(results.message);
      }
    });
});


//check how to verify
router.post('/easy/apply', checkAuth, async(req, res) => {


  console.log("helpful backend: ", req.body);
  const payload = {
      path: 'easyApplyJobs',
      body: req.body,
      // params: req.params
  };
  kafka.make_request('studentJobApplications', payload, (err, results) => {
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