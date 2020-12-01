const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');
const { auth } = require('../../middleware/studentAuth');

const Student = require('../../models/StudentModel');
const mysqlConnectionPool = require('../../config/sqlConnectionPool');

auth();

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 4 or more characters',
    ).isLength({ min: 4 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    // See if user exists
    try {
      student = new Student({
        name,
        email,
      });

      await student.save();
      mysqlConnectionPool.query(
        `SELECT email FROM student WHERE email= '${email}'`,
        async (error, result) => {
          if (error) {
            console.log(error);
            return res.status(500).send('Server Error');
          }
          if (result.length > 0) {
            return res.status(400).json({
              errors: [{ msg: 'User already exists' }],
            });
          }

          //Encrypt password using bcrypt
          const salt = await bcrypt.genSalt(10);
          const passwordEncrypted = await bcrypt.hash(password, salt);

          mysqlConnectionPool.query(
            `INSERT into student (name, email, password) 
                        VALUES ('${name}', '${email}', '${passwordEncrypted}')`,
            (error, result) => {
              if (error) {
                console.log(error);
                return res.status(500).send('Server Error');
              }
              const payload = {
                user: {
                  id: student._id,
                  name: name,
                  email: email,
                  usertype: 'student',
                },
              };
              jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 6000000 },
                (error, token) => {
                  if (error) throw error;
                  res.json({
                    token,
                    id: student._id,
                    name: name,
                    email: email,
                  });
                },
              );
            },
          );
        },
      );
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;
