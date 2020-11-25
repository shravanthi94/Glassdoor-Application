"use strict"
const express = require("express");
const router = express.Router();
const router = express.Router();
const { checkAuth } = require('../../middleware/studentAuth');


router.post("/:id/resume", checkAuth, async (req, res) => {


});

router.get("/:id/resume", checkAuth, async (req, res) => {

    try {
        console.log("student_id: ", req.params.id);
        var resumes = await JobPosting.find({ "student_id": req.params.id });
        if (!resumes) {
            return res.status(400).json({ msg: 'No resumes added yet!' });
        }
        res.status(200).json(resumes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }

});

module.exports = router;