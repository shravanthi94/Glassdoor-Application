"use strict"
const express = require("express");
const router = express.Router();
const { checkAuth } = require('../../middleware/studentAuth');

const resume = require('../../models/ResumeModel');
router.post("/:id/resume", checkAuth, async (req, res) => {
    // try {
    //     var newResume = new resume();
    //     newResume.student = req.params.id;
    //     newResume.file= req.body.file;
    //     newResume.format= req.body.format;
    //     newResume.preview= req.body.preview;

    //     await newResume.save();
    
    //     res.json("resume added");
    //   } catch (err) {
    //     console.log(err);
    //     res.status(500).send('Server Error');
    // }

});

router.get("/:student", checkAuth, async (req, res) => {

    // try {
    //     console.log("student_id: ", req.params.student);
    //     let resumes = await resume.find({ "student_id": req.params.student});
    //     if (!resumes) {
    //         return res.status(400).json({ msg: 'No resumes added yet!'});
    //     }
    //     res.status(200).json(resumes);
    // } catch (err) {
    //     console.error(err.message);
    //     res.status(500).send('Server Error: Database');
    // }

});

router.get("/:resume", checkAuth, async (req, res) => {

    // try {
    //     console.log("resume_id: ", req.params.resume);
    //     var Resume = await resume.findOne({ "_id": req.params.resume });
    //     if (!Resume) {
    //         return res.status(400).json({ msg: 'No resume with given id ' });
    //     }
    //     res.status(200).json(Resume);
    // } catch (err) {
    //     console.error(err.message);
    //     res.status(500).send('Server Error: Database');
    // }

});


module.exports = router;

