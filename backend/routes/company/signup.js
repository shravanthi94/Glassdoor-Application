const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../config/sqlConnectionPool');
const Company = require('../../models/CompanyModel');

//@route POST /company/signup
//@desc  company registration
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

        const { name, email, password } = req.body;

        // See if user exists
        try {
            company = new Company({
                name,
                email,
            });

            await company.save();
            mysqlConnectionPool.query(
                `SELECT email FROM company WHERE email= '${email}'`,
                async(error, result) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).send('Server Error');
                    }
                    if (result.length > 0) {
                        return res.status(400).json({
                            errors: [{ msg: 'Company already exists' }],
                        });
                    }

                    //Encrypt password using bcrypt
                    const salt = await bcrypt.genSalt(10);
                    const passwordEncrypted = await bcrypt.hash(password, salt);
                    mysqlConnectionPool.query(
                        `INSERT into company (name, email, password) 
                        VALUES ('${name}', '${email}', '${passwordEncrypted}')`,
                        (error, result) => {
                            if (error) {
                                console.log(error);
                                return res.status(500).send('Server Error');
                            }
                            const payload = {
                                company: {
                                    // id: result.insertId,
                                    id: company._id,
                                    name: name,
                                    email: email,
                                    usertype: 'company'
                                },
                            };
                            jwt.sign(
                                payload,
                                config.get('jwtSecret'), { expiresIn: 6000000 },
                                (error, token) => {

                                    if (error) throw error;
                                    // console.log(token)
                                    res.json({
                                        token,
                                        // id: result.insertId,
                                        id: company._id,
                                        name: name,
                                        email: email
                                    });
                                }
                            );
                        }
                    );
                }
            );
            //res.send('Customer Registered');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

        //return jsonwebtoken
    }
);

module.exports = router;

//Cust_Name: