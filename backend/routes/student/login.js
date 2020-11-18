const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');
const { auth } = require('../../middleware/studentAuth');

// const Student = require('../../models/StudentModel');
const mysqlConnectionPool = require('../../config/sqlConnectionPool');

auth();

router.post('/', [
  check('email', 'Please include valid email').isEmail().notEmpty(),
  check('password', 'Password is required').notEmpty(),
  ],
  async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  // See if user exists
  try {
      mysqlConnectionPool.query(
          `SELECT * FROM student WHERE email= '${email}'`,
          async(error, result) => {
              if (error) {
                  console.log(error);
                  return res.status(500).send('Server Error');
              }
              if (result.length === 0) {
                  return res.status(400).json({
                      errors: [{ msg: 'Invalid Credentials' }],
                  });
              }

              const isMatch = await bcrypt.compare(
                  password,
                  result[0].password
              );

              if (!isMatch) {
                  return res
                      .status(400)
                      .json({ errors: [{ msg: 'Invalid Credentials' }] });
              }
              const payload = {
                  user: {
                      id: result[0].id,
                      name: result[0].name,
                      email: email,
                      usertype: 'student'
                  },
              };

              jwt.sign(
                  payload,
                  config.get('jwtSecret'), { expiresIn: 6000000 },
                  (error, token) => {
                      if (error) throw error;
                      res.json({
                          token,
                          id: result[0].id,
                          name: result[0].name,
                          email: email
                      });
                  }
              );

          }
      );
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
  }
});

module.exports = router;