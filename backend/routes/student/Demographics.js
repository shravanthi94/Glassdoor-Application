const express = require('express');

const router = express.Router();
const { checkAuth } = require('../../middleware/studentAuth');

const Student = require('../../models/StudentModel');

router.post('/', checkAuth, async (req, res) => {
  const studentId = req.user.id;
  const {
    ethnicity,
    gender,
    disability,
    vetran,
  } = req.body;

  try {
    const student = await Student.findById(studentId).select('-password');
    student.demographics.ethnicity = ethnicity;
    student.demographics.dob = gender;
    student.demographics.disability = disability;
    student.demographics.vetran = vetran;

    await student.save();

    res.json(student);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});
module.exports = router;