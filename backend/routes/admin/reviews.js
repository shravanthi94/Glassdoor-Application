/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const Review = require('../../models/ReviewModel');
const { adminAuth, adminCheckAuth } = require('../../middleware/adminAuth');
// const redisRead = require('../../config/RedisRead')
// const redisWrite = require('../../config/RedisWrite')
// const kafka = require('../kafka/client');

adminAuth();

// @route  GET /admin/review/newreviews
// @Desc   Get all reviews which are pending for approval
// @access Private

router.get('/newreviews', adminCheckAuth, async(req, res) => {
    try {
        console.log("Get all new reviwes from the database");
        const reviews = await Review.find({ "approvalStatus": 'new' });

        console.log("reviews list: ", reviews);
        if (!reviews || reviews.length === 0 ) {
            return res.status(400).json({ msg: 'No reviews for approval!' });
        }
        res.status(200).json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});


// @route  POST /admin/review/approve
// @Desc   Approve a review posted by student.
// @access Private

router.post('/approve/:review_id', adminCheckAuth, async(req, res) => {
    try {
        console.log('Review for Approval : ', req.params.review_id)
        let review = await Review.findOne({ "_id": req.params.review_id })
        if (review) {
            console.log("Found the review. Updating the approvalStatus", review)
            review = await Review.findOneAndUpdate({ "_id": req.params.review_id }, { $set: { "approvalStatus": req.body.approvalStatus } }, { new: true });
            return res.status(200).json({ msg: 'Review approval status changed successfully.' });
        } else {
            return res.status(400).json({ msg: 'No Review found' });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;