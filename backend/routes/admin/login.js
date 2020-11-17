const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../config/sqlConnectionPool');

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

        const { email, password } = req.body;
        // See if user exists
        try {
            mysqlConnectionPool.query(
                `SELECT * FROM admin WHERE email= '${email}'`,
                async(error, result) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).send('Server Error');
                    }
                    if (result.length === 0) {
                        return res.status(400).json({
                            errors: [{ msg: 'No Admin Credentials Found. Kindly Signup' }],
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
                        admin: {
                            id: result[0].id,
                            name: result[0].name,
                            email: email,
                            usertype: 'admin'
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
                    // return res.status(200).json({msg:''});
                }
            );
        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;

//Cust_Name: