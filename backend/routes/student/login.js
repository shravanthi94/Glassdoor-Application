const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { auth } = require('../../middleware/studentAuth');

const Student = require('../../models/StudentModel');

auth();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. See if student exists
    const student = await Student.findOne({ email });

    if (!student) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    // 2. Match student's password matches
    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    // 3. return jsonWebToken
    const payload = {
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        usertype: 'student',
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '10 hours' },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          id: student.id,
          name: student.name,
          email: student.email,
        });
      },
    );
  } catch (err) {
    console.log(err.message);
    res.send(500).send('Server Error');
  }
});

module.exports = router;