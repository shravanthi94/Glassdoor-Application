const express = require('express');

const router = express.Router();
const { checkAuth } = require('../../middleware/studentAuth');

const Student = require('../../models/StudentModel');

router.post('/', checkAuth, async (req, res) => {
  const studentEmail = req.user.email;
  const {
    status,
    title,
    relocation,
    salary,
    industry,
  } = req.body;

  try {
    const student = await Student.find({ email : studentEmail });
    student.jobPreferance.status = status;
    student.jobPreferance.title = title;
    student.jobPreferance.relocation = relocation;
    student.jobPreferance.salary = salary;
    student.jobPreferance.industry = industry;

    await student.save();

    res.json(student);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});
module.exports = router;