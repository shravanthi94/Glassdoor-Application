const express = require('express');

const router = express.Router();
const { checkAuth } = require('../../middleware/studentAuth');

const Student = require('../../models/StudentModel');

const kafka = require('../../kafka/client');

router.post('/', checkAuth, async (req, res) => {
  // const studentEmail = req.user.email;
  // const { status, title, relocation, salary, industry } = req.body;

  // console.log('Backend relocation:', relocation);
  // try {
  //   const student = await Student.findOne({ email: studentEmail });

  //   student.jobPreference.status = status;
  //   student.jobPreference.title = title;
  //   student.jobPreference.relocation = relocation;
  //   student.jobPreference.salary = salary;
  //   student.jobPreference.industry = industry;

  //   await student.save();

  //   res.status(200).json(student);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send('Server Error');
  // }

  const payload = {
    topic: 'updateJobPreference',
    body: req.body,
    user: req.user,
  };
  kafka.make_request('studentProfile', payload, (err, results) => {
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
module.exports = router;
