const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../config/sqlConnectionPool');

const kafka = require('../../kafka/client');

//@route POST /admin/signup
//@desc  admin registration
//@access Public
router.post(
    '/', [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 }),
    ],
    async(req, res) => {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // const { name, email, password } = req.body;
        // // See if user exists
        // try {
        //     mysqlConnectionPool.query(
        //         `SELECT email FROM admin WHERE email= '${email}'`,
        //         async(error, result) => {
        //             if (error) {
        //                 console.log(error);
        //                 return res.status(500).send('Server Error');
        //             }
        //             if (result.length > 0) {
        //                 return res.status(400).json({ msg: 'Admin already exists' }).end();
        //             }

        //             //Encrypt password using bcrypt
        //             const salt = await bcrypt.genSalt(10);
        //             const passwordEncrypted = await bcrypt.hash(password, salt);
        //             mysqlConnectionPool.query(
        //                 `INSERT into admin (name, email, password) 
        //                 VALUES ('${name}', '${email}', '${passwordEncrypted}')`,
        //                 (error, result) => {
        //                     if (error) {
        //                         console.log(error);
        //                         return res.status(500).send('Server Error');
        //                     }
        //                     const payload = {
        //                         admin: {
        //                             id: result.insertId,
        //                             name: name,
        //                             email: email,
        //                             usertype: 'admin'
        //                         },
        //                     };
        //                     jwt.sign(
        //                         payload,
        //                         config.get('jwtSecret'), { expiresIn: 6000000 },
        //                         (error, token) => {
        //                             if (error) throw error;
        //                             res.json({
        //                                 token,
        //                                 id: result.insertId,
        //                                 name: name,
        //                                 email: email
        //                             });
        //                         }
        //                     );
        //                     return res.status(200).json({ msg: 'Admin successfully registered!' });
        //                 }
        //             );
        //         }
        //     );
        // } catch (error) {
        //     console.error(err.message);
        //     res.status(500).send('Server Error');
        // }

        const payload = {
      topic: 'adminSignup',
      body: req.body,
    };

    console.log('payload:', payload);

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