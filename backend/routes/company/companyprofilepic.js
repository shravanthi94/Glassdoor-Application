/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const { check, validationResult } = require('express-validator');
const Company = require('../../models/CompanyModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Student = require('../../models/StudentModel');
const Jobposting = require('../../models/JobPostingModel');
const { companyAuth, companyCheckAuth } = require('../../middleware/companyAuth');
const mysqlConnectionPool = require('../../config/sqlConnectionPool');

const companyProfilePicstorage = multer.diskStorage({
    destination: `${path.join(__dirname, '../..')}/public/uploads/company`,
    filename: (req, file, cb) => {
        cb(
            // null, `${req.params.id}-company-${Date.now()}${path.extname(file.originalname)}`,
            null, `company${req.company.id}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

const companyuploads = multer({
    storage: companyProfilePicstorage,
    limits: { fileSize: 1000000000 },
}).single('image');

// @route  POST /company/profilepic/upload/:id
// @desc   Upload pictures of the company
// @access Private

router.post('/upload', companyCheckAuth, async(req, res) => {
    // console.log('In companyprofilepic: ', req.params.id);
    console.log('req.company: ', req.company);
    console.log('req.file', req.file);
    companyuploads(req, res, async(err) => {
        // console.log('this is useruploads');
        if (!err) {
            try {
                const company = await Company.findOneAndUpdate({ '_id': req.company.id }, { $set: { "profilePic.image": req.file.filename, status: 'new' } }, { new: true });
                if (!company) {
                    return res.status(400).json({ msg: 'company profile not found' });
                }
                res.json(company);
            } catch (error) {
                console.log('caught error', error);
                res.status(500).send('Try block Server Error');
            }
        } else {
            console.log('hit an error', err);
            res.status(500).send('Server Error');
        }
    });
});

// @route  GET /company/profilepic/:filename
// @desc   View the company photos
// @access Public
router.get('/:filename', (req, res) => {
    const image = `${path.join(__dirname, '../..')}/public/uploads/company/${
      req.params.filename
    }`;
    if (fs.existsSync(image)) {
        res.sendFile(image);
    } else {
        res.sendFile(
            `${path.join(__dirname, '../..')}/public/uploads/company/default.png`,
        );
    }
});

module.exports = router;