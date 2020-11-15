const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { auth } = require('../../middleware/studentAuth');

const Student = require('../../models/StudentModel');

auth();

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //  1. Query to check if customer exists
    let student = await Student.findOne({ email });

    if (student) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Student already exits' }] });
    }

    //  3. Create student
    student = new Student({
      name,
      email,
      password,
    });

    //  2. If customer does not exist, hash the password
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(password, salt);

    //  4. save to database
    await student.save();

    //  5. Pass the jsonwebtoken for that customer
    const payload = {
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        usertype: 'customer',
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 6000000 },
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
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;