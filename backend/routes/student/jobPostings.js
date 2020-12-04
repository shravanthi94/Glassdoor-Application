'use strict';
const express = require('express');
const router = express.Router();
const { checkAuth } = require('../../middleware/studentAuth');
const Jobposting = require('../../models/JobPostingModel');
const path = require('path');
const multer = require('multer');

const kafka = require('../../kafka/client');
const fs = require('fs');

// @route  POST /student/jobs
// @Desc   Apply for a particular job
// @access Private

// router.post("/apply/:jobId", checkAuth, async(req, res) => {
//     try {
//         let student = await Student.findOne({ "email": req.user.email });
//         if (student) {
//             const newJobApplicant = {
//                 student: student._id,
//                 email: req.user.email,
//                 // resume: req.body.resume,
//                 // coverletter: req.body.coverletter
//             };
//             console.log(req.params.jobId)
//             let job = await Jobposting.findOne({ "_id": req.params.jobId })
//             job.applicants.unshift(newJobApplicant);
//             await job.save();
//             res.json(job)
//         }
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }

// });

router.get('/', checkAuth, async (req, res) => {
  //   try {
  //     let jobs = await Jobposting.find().sort({ date: -1 }).populate('company');
  //     if (!jobs) {
  //       return res.status(400).json({ msg: 'No jobs posted yet' });
  //     }
  //     res.status(200).json(jobs);
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send({ msg: 'Server Error: Database' });
  //   }

  const payload = {
    topic: 'displayAllJobs',
  };
  kafka.make_request('studentJobs', payload, (err, results) => {
    console.log('in result');
    if (err) {
      console.log('Inside err');
      res.status(500).send('System Error, Try Again.');
    } else {
      if (results.status === 400) {
        return res.status(400).json({ errors: [{ msg: results.message }] });
      }
      if (results.status === 500) {
        return res.status(500).send('Server Error');
      }
      res.status(200).json(results.message);
    }
  });
});

router.get('/details/:id', async (req, res) => {
  //   try {
  //     let job = await Jobposting.findById(req.params.id);
  //     if (!job) {
  //       return res.status(400).json({ msg: 'No jobs posted yet' });
  //     }
  //     res.status(200).json(job);
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send({ msg: 'Server Error: Database' });
  //   }
  const payload = {
    topic: 'viewEachJobDetail',
    params: req.params,
  };
  kafka.make_request('studentJobs', payload, (err, results) => {
    console.log('in result');
    if (err) {
      console.log('Inside err');
      res.status(500).send('System Error, Try Again.');
    } else {
      if (results.status === 400) {
        return res.status(400).json({ errors: [{ msg: results.message }] });
      }
      if (results.status === 500) {
        return res.status(500).send('Server Error');
      }
      res.status(200).json(results.message);
    }
  });
});

// router.get("/applied", checkAuth, async(req, res) => {

//     try {
//         let jobs = await Jobposting.find({ "applicants.student": req.body.student });
//         if (!jobs) {
//             return res.status(400).json({ msg: 'No jobs posted yet' });
//         }
//         res.status(200).json(jobs);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send({ msg: 'Server Error: Database' });
//     }
// });

// router.post("/withdraw/:id", async(req, res) => {

//     try {
//         console.log("job_id to withdraw: ", req.params.id);
//         console.log("student_id to withdraw: ", req.body.student);
//         let job = await Jobposting.findOne({ _id: req.params.id })
//         console.log("before filter", job.applicants)
//         job.applicants = job.applicants.filter(data => data.student != req.body.student);;
//         console.log("AFTER filter:", job.applicants)
//         job.save();
//         res.status(200).json('application withdrawn');

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error: Database');
//     }
// });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('call back');
    cb(null, `${path.join(__dirname, '../..')}/public/uploads/files`);
  },
  filename: function (req, file, cb) {
    console.log('cb file name: ', file);
    cb(null, file.fieldname + '-' + Date.now() + '.pdf');
  },
});

const maxSize = 1 * 10000 * 10000;

var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
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
}).fields([
  {
    name: 'resume',
    maxCount: 1,
  },
  {
    name: 'coverLetter',
    maxCount: 1,
  },
]);

// @route /student/jobs
router.post('/company', async (req, res) => {
  try {
    console.log('all data: ', req.body);

    upload(req, res, async (err) => {
      if (err) {
        console.log('Uploading Files Error:', err);
        res.status(400).send('Couldnt upload resume');
      } else {
        console.log('resume name: ', res.req.files['resume']);
        console.log('cover name: ', res.req.files['coverLetter']);

        var data = {
          resume: res.req.files['resume']
            ? res.req.files['resume'][0].filename
            : '',
          coverLetter: res.req.files['coverLetter']
            ? res.req.files['coverLetter'][0].filename
            : '',
          student: req.body.studentId,
          email: req.body.studentEmail,
        };

        const company = await Jobposting.findByIdAndUpdate(
          { _id: req.body.jobId },
          { $push: { applicants: data } },
          { new: true },
        );

        if (!company) {
          res.status(400).send("Couldn't apply to job. Try after sometime");
        } else {
          res.status(200).send('Successfully applied to job.');
        }
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error: Database');
  }
});

// @route  GET /student/jobs
// @desc   download resume
// @access Public
router.get('/company/:filename', (req, res) => {
  const resume = `${path.join(__dirname, '../..')}/public/uploads/files/${
    req.params.filename
  }`;
  if (fs.existsSync(resume)) {
    res.sendFile(resume);
  } else {
    // res.sendFile(
    //     `${path.join(__dirname, '../..')}/public/uploads/company/default.png`,
    // );
  }
});
module.exports = router;
