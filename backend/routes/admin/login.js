const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../config/sqlConnectionPool');
const kafka = require('../../kafka/client');

//@route POST /admin/login
//@desc  admin login
//@access Public
router.post(
    '/', [
        check('email', 'Please include valid email').isEmail(),
    ],
    async(req, res) => {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const payload = {
            topic: 'adminLogin',
            body: req.body,
        };

        console.log('payload:', payload);

        // See if user exists
        kafka.make_request('authorization', payload, (err, results) => {
          console.log('in result');
          console.log('Results: ', results);
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
    }
);

module.exports = router;
