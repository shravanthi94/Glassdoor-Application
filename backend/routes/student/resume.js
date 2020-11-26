"use strict"
const express = require("express");
const router = express.Router();
const { checkAuth } = require('../../middleware/studentAuth');

const resume = require('../../models/ResumeModel');
router.post("/:id/resume", checkAuth, async (req, res) => {
    try {
        var newResume = new resume();
        newResume.student = req.params.id;
        newResume.file= req.body.file;
        newResume.format= req.body.format;
        newResume.preview= req.body.preview;

        await newResume.save();
    
        res.json("resume added");
      } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }

});




module.exports = router;

