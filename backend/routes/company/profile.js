/* eslint-disable max-len */
// Kafka completed all routes working
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
// const { restauth, restcheckAuth } = require('../../../config/passportjwt');
const Company = require('../../models/CompanyModel');
const Student = require('../../models/StudentModel');
// const auth = require('../../../middleware/auth');
const {
    companyAuth,
    companyCheckAuth,
} = require('../../middleware/companyAuth');
const mysqlConnectionPool = require('../../config/sqlConnectionPool');

const kafka = require('../../kafka/client');

companyAuth();

// @route  POST /company/profile
// @Desc   Create/ Update company profile
// @access Private

router.post('/', companyCheckAuth, async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // build profile object
    // const {
    //   ceoName,
    //   location,
    //   description,
    //   website,
    //   size,
    //   type,
    //   revenue,
    //   headquarters,
    //   industry,
    //   founded,
    //   mission,
    // } = req.body;
    // const cmpnyProfileFields = {};
    // cmpnyProfileFields.name = req.company.name;
    // cmpnyProfileFields.email = req.company.email;
    // if (ceoName) cmpnyProfileFields.ceoName = ceoName;
    // if (location) cmpnyProfileFields.location = location;
    // if (description) cmpnyProfileFields.description = description;
    // if (website) cmpnyProfileFields.website = website;
    // if (size) cmpnyProfileFields.size = size;
    // if (type) cmpnyProfileFields.type = type;
    // if (revenue) cmpnyProfileFields.revenue = revenue;
    // if (headquarters) cmpnyProfileFields.headquarters = headquarters;
    // if (industry) cmpnyProfileFields.industry = industry;
    // if (founded) cmpnyProfileFields.founded = founded;
    // if (mission) cmpnyProfileFields.mission = mission;
    // try {
    //   mysqlConnectionPool.query(
    //     `SELECT * FROM company WHERE email= '${req.company.email}'`,
    //     async (error, result) => {
    //       if (error) {
    //         console.log(error);
    //         return res.status(500).send('Server Error');
    //       }
    //       if (result) {
    //         let company = await Company.findOne({ email: req.company.email });
    //         console.log('create profile find query', company);
    //         if (company) {
    //           // update
    //           company = await Company.findOneAndUpdate(
    //             { email: req.company.email },
    //             { $set: cmpnyProfileFields },
    //             { new: true },
    //           );
    //           return res.json(company);
    //         }
    //         company = new Company(cmpnyProfileFields);
    //         await company.save();
    //         res.status(200).json(company);
    //       }
    //       return res
    //         .status(400)
    //         .json({ errors: [{ msg: 'Company is not yet registered.' }] });
    //     },
    //   );
    // } catch (err) {
    //   console.error(err.message);
    //   res.status(500).send('Server Error');
    // }

    const payload = {
        topic: 'updateProfile',
        body: req.body,
        company: req.company,
    };
    console.log("update profile", payload)
    kafka.make_request('companyProfile', payload, (err, results) => {
        console.log('in result');
        if (err) {
            console.log('Inside err');
            res.status(500).send('System Error, Try Again.');
        } else {
            if (results.status === 400) {
                return res.status(400).json({ msg: results.message });
            }
            if (results.status === 500) {
                return res.status(500).send('Server Error');
            }
            res.status(200).json(results.message);
        }
    });

});

// @route  GET /company/profile
// @Desc   Get current logged in company profile
// @access Private

router.get('/', companyCheckAuth, async(req, res) => {
    // try {
    //     const company = await Company.findOne({ email: req.company.email });
    //     if (!company) {
    //         return res
    //             .status(400)
    //             .json({ msg: 'There is no profile for this company' });
    //     }
    //     res.json(company);
    // } catch (err) {
    //     console.error(err.message);
    //     res.status(500).send('Server Error: Database');
    // }

    const payload = {
        topic: 'getCurrentCompanyProfile',
        company: req.company,
    };
    kafka.make_request('companyProfile', payload, (err, results) => {
        console.log('in result');
        if (err) {
            console.log('Inside err');
            res.status(500).send('System Error, Try Again.');
        } else {
            if (results.status === 400) {
                return res.status(400).json({ msg: results.message });
            }
            if (results.status === 500) {
                return res.status(500).send('Server Error');
            }
            res.status(200).json(results.message);
        }
    });
});

module.exports = router;