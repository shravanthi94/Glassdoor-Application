// check if we r using first route
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Company = require('../../models/CompanyModel');
const mysqlConnectionPool = require('../../config/sqlConnectionPool');
const { companyAuth, companyCheckAuth } = require('../../middleware/companyAuth');

const kafka = require('../../kafka/client');

companyAuth();

//@route GET /company/login
//@desc  Get registered company user
//@access Public
router.get('/', companyCheckAuth, async(req, res) => {
    // const email = req.company.email;
    // try {
    //     mysqlConnectionPool.query(
    //         `SELECT id, email, name FROM company WHERE email = '${email}'`,
    //         (error, result) => {
    //             if (error) {
    //                 console.log(error);
    //                 return res.status(500).send('Database Server Error');
    //             }
    //             res.json(result);
    //         }
    //     );
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).send('Server Error');
    // }

    const payload = {
        topic: 'getRegisteredCompany',
        company: req.company,
    };
    console.log("Update Status,", payload)
    kafka.make_request('companyProfile', payload, (err, results) => {
        console.log('in result');
        if (err) {
            console.log('Inside err');
            res.status(500).send('System Error, Try Again.');
        } else {
            if (results.status === 500) {
                return res.status(500).send('Server Error');
            }
            res.status(200).json(results.message);
        }
    });
});

//@route POST /company/login
//@desc  company login
//@access Public
router.post(
    '/', [
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

        const { email, password } = req.body;
        // See if user exists
        try {
            const company = await Company.findOne({ email: email });
            mysqlConnectionPool.query(
                `SELECT * FROM company WHERE email= '${email}'`,
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
                        company: {
                            // id: result[0].id,
                            id: company._id,
                            name: result[0].name,
                            email: email,
                            usertype: 'company'
                        },
                    };

                    jwt.sign(
                        payload,
                        config.get('jwtSecret'), { expiresIn: 6000000 },
                        (error, token) => {
                            if (error) throw error;
                            res.json({
                                token,
                                // id: result[0].id,
                                id: company._id,
                                name: result[0].name,
                                email: email
                            });
                        }
                    );

                }
            );
            //res.send('Customer Registered');
        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

        //return jsonwebtoken

        // const payload = {
        //     topic: 'companyLogin',
        //     body: req.body,
        // };

        // console.log('payload:', payload);

        // kafka.make_request('authorization', payload, (err, results) => {
        //     console.log('in result');
        //     console.log('Results: ', results);
        //     if (err) {
        //         console.log('Inside err');
        //         res.status(500).send('System Error, Try Again.');
        //     } else {
        //         if (results.status === 400) {
        //             return res.status(400).json({ errors: [{ msg: results.message }] });
        //         }
        //         if (results.status === 500) {
        //             return res.status(500).send('Server Error');
        //         }
        //         res.status(200).json(results);
        //     }
        // });
    }
);

module.exports = router;