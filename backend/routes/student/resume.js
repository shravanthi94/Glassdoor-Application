'use strict';
const express = require('express');
const router = express.Router();
const { checkAuth } = require('../../middleware/studentAuth');
const Student = require('../../models/StudentModel');
const path = require('path');
const multer = require('multer');
// const { delete } = require("../../app");

// router.post('/resume/:id', checkAuth, async (req, res) => {
//   try {
//     let student = await Student.findOne({ email: req.user.email });

//     if (student) {
//       let newResume = { file, format };
//       newResume.file = req.body.file;
//       newResume.format = req.body.format;
//       student.resumes.unshift(newResume);
//       await job.save();
//       res.json('resume added');
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

/*
router.get("/", checkAuth, async (req, res) => {

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

}); */

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('call back');
    cb(null, `${path.join(__dirname, '../..')}/public/uploads/files`);
  },
  filename: function (req, file, cb) {
    console.log('cb file name: ', file);
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const maxSize = 1 * 10000 * 10000;

var upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function(req, file, cb) {
        console.log('file filter');
        var filetypes = /pdf/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        console.log('mimetype', mimetype);
        console.log('extname', extname);

        if (mimetype && extname) {
            console.log('mimetype && extname');
            return cb(null, true);
        }
        cb(
            'Error: File upload only supports the following filetypes - ' + filetypes,
        );
    },
}).single('resume');

router.post('/', checkAuth, async(req, res) => {
    try {
        console.log('inside backend upload resume: ', req.body);

        console.log('all data: ', req.body);

        upload(req, res, async(err) => {
            if (err) {
                console.log('Uploading Files Error:', err);
                res.status(400).send('Couldnt upload resume');
            } else {
                console.log('resume name: ', res.req.file.filename);

                var data = {
                    file: res.req.file.filename,
                    isPrimary: false,
                };

                const student = await Student.findByIdAndUpdate({ _id: req.body.studentId }, { $push: { resumes: data } }, { new: true }, );

                if (!student) {
                    res.status(400).send("Couldn't upload resume. Try after sometime");
                } else {
                    res.status(200).send(student);
                }
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/primary', checkAuth, async(req, res) => {
    // try {
    //     console.log('primary: ', req.body);
    //     var data = { 'resumes.$.isPrimary': true };

    //     let primaryResume = await Student.findOneAndUpdate({ _id: req.body.studentId, 'resumes.isPrimary': true }, { $set: { 'resumes.$.isPrimary': false } }, { new: true }, );

    //     let student = await Student.findOneAndUpdate({ _id: req.body.studentId, 'resumes._id': req.body.resumeId }, { $set: data }, { new: true }, );

    //     if (!student) {
    //         res.status(400).send("Couldn't make primary. Try after sometime");
    //     } else {
    //         res.status(200).send(student);
    //     }
    // } catch (err) {
    //     console.error(err.message);
    //     res.status(500).send('Server Error');
    // }
    const payload = {
        topic: 'makeResumePrimary',
        body: req.body,
    };
    kafka.make_request('studentResume', payload, (err, results) => {
        console.log('in result');
        if (err) {
            console.log('Inside err');
            res.status(500).send('System Error, Try Again.');
        } else {
            if (results.status === 400) {
                return res.status(400).json({ msg: results.message });
            }
            if (results.status === 500) {
                return res.status(500).send('Server Error');
            }
            res.status(200).json(results.message);
        }
    });
});

router.post('/remove', checkAuth, async(req, res) => {
    // try {
    //     console.log('req data remove: ', req.body);

    //     await Student.update({ _id: req.body.studentId }, { $pull: { resumes: { _id: req.body.resumeId } } }, );

    //     let student = await Student.findById(req.body.studentId);

    //     if (!student) {
    //         res.status(400).send("Couldn't make primary. Try after sometime");
    //     } else {
    //         console.log('student: ', student);
    //         res.status(200).send(student);
    //     }
    // } catch (err) {
    //     console.error(err.message);
    //     res.status(500).send('Server Error');
    // }
    const payload = {
        topic: 'makeResumeRemove',
        body: req.body,
    };
    kafka.make_request('studentResume', payload, (err, results) => {
        console.log('in result');
        if (err) {
            console.log('Inside err');
            res.status(500).send('System Error, Try Again.');
        } else {
            if (results.status === 400) {
                return res.status(400).json({ msg: results.message });
            }
            if (results.status === 500) {
                return res.status(500).send('Server Error');
            }
            res.status(200).json(results.message);
        }
    });

});

module.exports = router;