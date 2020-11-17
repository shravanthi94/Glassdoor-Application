/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const Review = require('../../models/ReviewModel');
const Company = require('../../models/CompanyModel');
const { companyAuth, companyCheckAuth } = require('../../middleware/companyAuth');

companyAuth();

// @route  GET /company/review
// @Desc   Get all reviews of the company
// @access Private

router.get('/:id', async(req, res) => {
    try {
        console.log("company id: ", req.params.id);
        const reviews = await Review.find({ "company": req.params.id });

        console.log("reviews list: ", reviews);
        if (!reviews) {
            return res.status(400).json({ msg: 'No reviews yet!' });
        }
        res.status(200).json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});


// @route  POST /company/review
// @Desc   Post a new review for the company
// @access Private

router.post('/', async(req, res) => {
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

// @route  GET /company/review
// @Desc   GET all current company's reviews
// @access Private

router.get('/my/reviews', companyCheckAuth, async(req, res) => {

    try {
        const company = await Company.findOne({ "email": req.company.email })
        if (company) {
            // console.log("company Id", company._id)
            const reviews = await Review.find({ "company": company._id })
            if (reviews.length > 0) {
                // console.log(reviews)
                return res.status(200).json(reviews)
            }
            return res.status(400).json({ msg: 'No reviews for this company' });
        }
        return res.status(400).json({ msg: 'No company found' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;