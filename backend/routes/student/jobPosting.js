"use strict"
const express = require("express");
const router = express.Router();
const { checkAuth } = require('../../middleware/studentAuth');
const Jobposting = require('../../models/JobPostingModel');

router.post("/:id/apply", checkAuth, async (req, res) => {
    let applicant ={...req.body}
    try {
        console.log("job_id to apply: ", req.params.id);
        await Jobposting.update({ _id: req.params.id }, { $push: { applicants: applicant } }, { new: true });
        
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }

});

router.get("/", checkAuth, async (req, res) => {
      
    try {
      let jobs = await Jobposting.find();
      if (!jobs) {
          return res.status(400).json({ msg: 'No jobs posted yet' });
      }
      res.status(200).json(jobs);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error: Database');
  }
      

});

router.get("/applied", checkAuth, async (req, res) => {
      
    try {
      let jobs = await Jobposting.find({ "applicants.student" : req.body.student});
      if (!jobs) {
          return res.status(400).json({ msg: 'No jobs posted yet' });
      }
      res.status(200).json(jobs);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error: Database');
  }
      

});



module.exports = router;