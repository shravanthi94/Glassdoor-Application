const express = require('express');

const router = express.Router();
const { checkAuth } = require('../../middleware/studentAuth');

const Student = require('../../models/StudentModel');

const kafka = require('../../kafka/client');

router.post('/', checkAuth, async (req, res) => {
  // const studentEmail = req.user.email;
  // const { ethnicity, gender, disability, vetran } = req.body;

  // try {
  //   const student = await Student.findOne({ email: studentEmail });
  //   student.demographics.ethnicity = ethnicity;
  //   student.demographics.gender = gender;
  //   student.demographics.disability = disability;
  //   student.demographics.vetran = vetran;

  //   await student.save();

  //   res.status(200).json(student);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send('Server Error');
  // }

  const payload = {
    topic: 'updateStudentDemographics',
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
