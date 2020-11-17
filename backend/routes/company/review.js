/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const Company = require('../../models/CompanyModel');
const { companyAuth, companyCheckAuth } = require('../../middleware/companyAuth');
const mysqlConnectionPool = require('../../config/sqlConnectionPool');

companyAuth();


// @route  GET /company/profile
// @Desc   Get current logged in company profile
// @access Private

router.get('/:id', companyCheckAuth, async(req, res) => {
    // try {
    //     const company = await Company.findOne({ "email": req.company.email });
    //     if (!company) {
    //         return res.status(400).json({ msg: 'There is no profile for this company' });
    //     }
    //     res.json(company);
    // } catch (err) {
    //     console.error(err.message);
    //     res.status(500).send('Server Error: Database');
    // }
});

module.exports = router;