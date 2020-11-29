const express = require('express');

const router = express.Router();
const { checkAuth } = require('../../middleware/studentAuth');

const Student = require('../../models/StudentModel');

router.post('/', checkAuth, async (req, res) => {
  const studentEmail = req.user.email;
  const { ethnicity, gender, disability, vetran } = req.body;

  try {
    const student = await Student.findOne({ email: studentEmail });
    student.demographics.ethnicity = ethnicity;
    student.demographics.gender = gender;
    student.demographics.disability = disability;
    student.demographics.vetran = vetran;

    await student.save();

    res.status(200).json(student);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
