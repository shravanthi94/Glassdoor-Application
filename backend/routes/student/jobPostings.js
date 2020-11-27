"use strict"
const express = require("express");
const router = express.Router();
const { checkAuth } = require('../../middleware/studentAuth');
const Jobposting = require('../../models/JobPostingModel');

router.post("/apply/:id",async (req, res) => {
    let applicant ={...req.body}
    console.log("to apply:",applicant)
    try {
        console.log("job_id to apply: ", req.params.id);
        let appliedJob = await Jobposting.findOneAndUpdate({ _id: req.params.id }, { $push: { applicants: applicant } }, { new: true });
        if (appliedJob){
            console.log("after apply:",appliedJob.applicants)
            return res.status(200).json({ msg: 'application posted successfully' });
        }
        else {
            return res.status(400).json({ msg: 'No job found' });
        }
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }

});

router.get("/", async (req, res) => {
      
    try {
      let jobs = await Jobposting.find();
      if (!jobs) {
          return res.status(400).json({ msg: 'No jobs posted yet' });
      }
      res.status(200).json(jobs);
  } catch (err) {
      console.error(err.message);
      res.status(500).send({ msg: 'Server Error: Database' });
  }
      

});

router.get("/applied",checkAuth, async (req, res) => {
      
    try {
      let jobs = await Jobposting.find({ "applicants.student" : req.body.student});
      if (!jobs) {
          return res.status(400).json({ msg: 'No jobs posted yet' });
      }
      res.status(200).json(jobs);
  } catch (err) {
      console.error(err.message);
      res.status(500).send({ msg: 'Server Error: Database' });
  }
      

});

router.post("/withdraw/:id",async (req, res) => {
    
    try {
        console.log("job_id to withdraw: ", req.params.id);
        console.log("student_id to withdraw: ", req.body.student);
    let job = await Jobposting.findOne({ _id: req.params.id })
    console.log("before filter",job.applicants)
        job.applicants = job.applicants.filter(data => data.student != req.body.student );;
        console.log("AFTER filter:",job.applicants)
        job.save();
        res.status(200).json('application withdrawn');
        
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }

});



module.exports = router;