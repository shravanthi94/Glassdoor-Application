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





module.exports = router;