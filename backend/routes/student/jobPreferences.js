const express = require('express');

const router = express.Router();
const { checkAuth } = require('../../middleware/studentAuth');

const Student = require('../../models/StudentModel');

router.post('/', checkAuth, async (req, res) => {
  const studentEmail = req.user.email;
  const { status, title, relocation, salary, industry } = req.body;

  console.log('Backend relocation:', relocation);
  try {
    const student = await Student.findOne({ email: studentEmail });

    student.jobPreference.status = status;
    student.jobPreference.title = title;
    student.jobPreference.relocation = relocation;
    student.jobPreference.salary = salary;
    student.jobPreference.industry = industry;

    await student.save();

    res.status(200).json(student);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
