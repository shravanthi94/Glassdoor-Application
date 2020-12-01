/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const Company = require('../../models/CompanyModel');
const { adminAuth, adminCheckAuth } = require('../../middleware/adminAuth');

adminAuth();

// @route  GET /admin/review/company/newphotos
// @Desc   Get all company photos which are pending for approval
// @access Private

router.get('/company/newphotos', adminCheckAuth, async(req, res) => {
    try {
        console.log("Get all new company photos from the database");
        const photos = await Company.//find({"photos.status":'new'}).select("_id name photos");

        aggregate([
            { "$match": {  "photos.status": { $eq: 'new' } }
            },
            { "$project": {
                    "name": 1,
                    "photos": {
                        "$map": {
                            "input": {
                                "$filter": {
                                    "input": "$photos",
                                    "as": "photo",
                                    "cond": { "$eq": ["$$photo.status", "new"] }
                                }
                            },
                            "as": "item",
                            "in": "$$item"
                        }
                    }
                },
            },
        ]).exec((err, photosForApproval) => {
            console.log("photosForApproval list fetched : ", photosForApproval);
            if (err) {
                console.error(err.message);
                return res.status(500).send('Server Error: Database');
            } else if (!photosForApproval || photosForApproval.length === 0 ) {
                return res.status(400).json({ msg: 'No photos for approval!' });
            } else if (photosForApproval) {
                res.status(200).json(photosForApproval);
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});


// @route  POST /admin/review/approve
// @Desc   Approve a review posted by student.
// @access Private

router.post('/company/:company_id/approve/photo/:photo_id', adminCheckAuth, async(req, res) => {
    try {
        console.log('Photo for Approval : ', req.params.photo_id)
        let company = await Company.findOne({ "_id": req.params.company_id })
        if (company) {
            console.log("Found the company. Updating the approvalStatus");
            company.photos.map((photo) => {
                console.log('photo.id : ', photo._id+"", ' req.params.photo_id : ', req.params.photo_id)
                console.log('equality : ', photo._id+"" === req.params.photo_id)
                if(photo._id+"" === req.params.photo_id) {
                    photo.status = req.body.status;
                    console.log("photo.status : ", photo.status);
                }
            });
            company.save();
            return res.status(200).json({company});
        } else {
            return res.status(400).json({ msg: 'No Photo found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;