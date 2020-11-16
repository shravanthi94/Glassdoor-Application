/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
// const { restauth, restcheckAuth } = require('../../../config/passportjwt');
const Company = require('../../models/CompanyModel');
const Student = require('../../models/StudentModel');
// const auth = require('../../../middleware/auth');
const { companyAuth, companyCheckAuth } = require('../../middleware/companyAuth');
const mysqlConnectionPool = require('../../config/sqlConnectionPool');

companyAuth();

// @route  POST /company/profile
// @Desc   Create/ Update company profile
// @access Private

router.post('/', [companyCheckAuth, [
    check('ceoName', 'ceoName is required.').not().isEmpty(),
    check('location', 'location type is required').not().isEmpty(),
    check('website', 'company website are required').not().isEmpty(),
    check('type', 'Please mention type of this company').not().isEmpty(),
    check('revenue', 'Please mention revenue of this company').not().isEmpty(),

]], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // build profile object
    const {
        ceoName,
        location,
        description,
        website,
        size,
        type,
        revenue,
        headquarters,
        industry,
        founded,
        mission
    } = req.body;
    const cmpnyProfileFields = {};
    cmpnyProfileFields.name = req.company.name;
    cmpnyProfileFields.email = req.company.email;
    if (ceoName) cmpnyProfileFields.ceoName = ceoName;
    if (location) cmpnyProfileFields.location = location;
    if (description) cmpnyProfileFields.description = description;
    if (website) cmpnyProfileFields.website = website;
    if (size) cmpnyProfileFields.size = size;
    if (type) cmpnyProfileFields.type = type;
    if (revenue) cmpnyProfileFields.revenue = revenue;
    if (headquarters) cmpnyProfileFields.headquarters = headquarters;
    if (industry) cmpnyProfileFields.industry = industry;
    if (founded) cmpnyProfileFields.founded = founded;
    if (mission) cmpnyProfileFields.mission = mission;
    try {
        console.log("Profile of Company", req.company.email)
        mysqlConnectionPool.query(
            `SELECT * FROM company WHERE email= '${req.company.email}'`,
            async(error, result) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send('Server Error');
                }
                if (result) {
                    let company = await Company.findOne({ company: req.company.email });
                    if (company) {
                        // update
                        company = await Company.findOneAndUpdate({ company: req.company.email }, { $set: cmpnyProfileFields }, { new: true });
                        return res.json(company);
                    }
                    company = new Company(cmpnyProfileFields);
                    await company.save();
                    res.status(200).json(company);
                }
                return res.status(400).json({ errors: [{ msg: 'Company is not yet registered.' }] });
            }
        )

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


// @route  GET /company/profile/me
// @Desc   Get current logged in company profile
// @access Private

module.exports = router;