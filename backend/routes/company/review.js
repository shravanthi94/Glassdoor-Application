/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
var kafka = require('../../kafka/client');

const Review = require('../../models/ReviewModel');
const Company = require('../../models/CompanyModel');
const { companyAuth, companyCheckAuth } = require('../../middleware/companyAuth');

companyAuth();

// @route  GET /company/review
// @Desc   Get all reviews of the company
// @access Private

router.get('/:id', async (req, res) => {
    try {
        console.log("company id: ", req.params.id);

        kafka.make_request('company_reviews', req.params.id, function (err, results) {

            if (err) {
                console.log("Inside err");
                res.status(500).send("Kafka Error");
            }
            else if (results.status == 200 || results.status == 400) {
                res.status(results.status).json(results.reviews);
            }
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});


// @route  POST /company/review
// @Desc   Post a new review for the company
// @access Private

router.post('/', async (req, res) => {
    try {
        console.log("review details: ", req.body);
        const review = new Review({

            company: req.body.company,
            student: req.body.student,
            approvalStatus: req.body.approvalStatus,
            headline: req.body.headline,
            pros: req.body.pros,
            cons: req.body.cons,
            overAllRating: req.body.overAllRating,
            comment: req.body.comment

        });

        await review.save((error, data) => {
            if (error) {
                return res.status(400).json({ msg: "Couldn't add review, try after sometime!" });
            } else {
                return res.status(200).json({ msg: "Review successfully added" });
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

// @route  GET /company/review/my/reviews
// @Desc   GET all current company's reviews
// @access Private

router.get('/my/reviews', companyCheckAuth, async (req, res) => {

    try {
        const company = await Company.findOne({ "email": req.company.email })
        if (company) {
            // console.log("company Id", company._id)
            const reviews = await Review.find({ "company": company._id })
            if (reviews) {
                // console.log(reviews)
                return res.status(200).json(reviews)
            }
            return res.status(400).json({ msg: 'No reviews for this company' });
            // }
            // else {
            //     return res.status(400).json({ msg: 'No company found' });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  POST /company/review/my/reviews
// @Desc   POST all current company's reviews
// @access Private

router.post('/my/reviews/:id', companyCheckAuth, async (req, res) => {

    try {
        console.log(req.params.id)
        let review = await Review.findOne({ "_id": req.params.id })
        if (review) {
            console.log("company Id", review)
            review = await Review.findOneAndUpdate({ "_id": req.params.id }, { $set: { "favorite": true } }, { new: true });
            return res.status(200).json(review);
        } else {
            return res.status(400).json({ msg: 'No Review found' });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;