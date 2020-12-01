const express = require('express');

const router = express.Router();
const { validationResult, check } = require('express-validator');
const { checkAuth } = require('../../middleware/studentAuth');

const Student = require('../../models/StudentModel');

// @route  POST /student/profile/basic
// @desc   Update current student basic details
// @access Private
router.post(
  '/basic',
  [checkAuth, [check('name', 'Student name is required').notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const studentId = req.user.id;
    const { name, email } = req.body;

    try {
      const student = await Student.findById(studentId).select('-password');
      student.name = name;
      student.email = email;

      await student.save();

      res.status(200).json(student);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;
