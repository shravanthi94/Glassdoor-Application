/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const Review = require('../../models/ReviewModel');
const Company = require('../../models/CompanyModel');
const { companyAuth, companyCheckAuth } = require('../../middleware/companyAuth');
// const redisRead = require('../../config/RedisRead')
// const redisWrite = require('../../config/RedisWrite')
// const kafka = require('../../kafka/client');

companyAuth();

// @route  GET /company/review
// @Desc   Get all reviews of the company by id
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

// @route  GET /company/review/my/reviews
// @Desc   GET all current company's reviews
// @access Private

router.get('/my/reviews', async(req, res) => {

    try {
        // const company = await Company.findOne({ "email": req.company.email })
        // if (company) {
        // console.log("company Id", company._id)
        const reviews = await Review.find({ "company": "5fb2f87d828aa81479d846a1" }).select("headline -_id");
        // console.log("after query")
        if (!reviews) {

            return res.status(400).json({ msg: 'No reviews for this company' });

        }
        const results = JSON.stringify(reviews)
        res.status(200).send(results)
            // } 
            // else {
            //     return res.status(400).json({ msg: 'No company found' });
            // }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/my/reviews/redis', async(req, res) => {
    // try {
    //     redisRead.get('myreviews', async (err, redisMyReviews) => {

    //         if(redisMyReviews !== null) {
    //             console.log("fetching reviews from inside redis")
    //             return res.status(200).send(JSON.parse(redisMyReviews));
    //         } else {
    //             console.log("fetching reviews from kafka call")
    //             req.body.path = 'reviews_company_all';
    //             kafka.make_request('reviews', req.body, (err, results) => {
    //                 if (err) {
    //                 res.status(500).end('System Error');
    //                 } else {
    //                 console.log('results',results);
    //                 redisWrite.setex('myreviews', 36000, JSON.stringify(results));
    //                 console.log("writing reviews to redis finished")
    //                 res.status(results.status).end(JSON.stringify(results.message));
    //                 }
    //             });

    //             // console.log("fetching reviews from mongodb")
    //             // const reviews = await Review.find({ "company": "5fb2f87d828aa81479d846a1" }).select("headline -_id")
    //             // console.log("after query")
    //             // if (!reviews) {
    //             //     return res.status(400).json({ msg: 'No reviews for this company' });
    //             // }
    //             // console.log("fetching reviews from mongodb finished")
    //             // redisWrite.setex('myreviews', 36000, JSON.stringify(reviews));
    //             // console.log("writing reviews to redis finished")
    //             // return res.status(200).json(JSON.stringify(reviews));
    //         }
    //     })
    // } catch (err) {
    //     console.error(err.message);
    //     res.status(500).send('Server Error');
    // }
});


// @route  POST /company/review/my/reviews
// @Desc   POST Mark a review as favorite
// @access Private

router.post('/favorite/:id', companyCheckAuth, async(req, res) => {

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

// @route  POST /company/review/my/reviews
// @Desc   POST Mark a review as featured
// @access Private

router.post('/featured/:id', companyCheckAuth, async(req, res) => {

    try {
        console.log(req.params.id)
        let review = await Review.findOne({ "_id": req.params.id })
        if (review) {
            console.log("company Id", review)
            review = await Review.findOneAndUpdate({ "_id": req.params.id }, { $set: { "featured": true } }, { new: true });
            return res.status(200).json(review);
        } else {
            return res.status(400).json({ msg: 'No Review found' });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET /company/review/featured
// @Desc   GET all the featured reviews 
// @access Private

router.get('/featured/all', companyCheckAuth, async(req, res) => {

    try {
        const company = await Company.findOne({ "email": req.company.email })
        if (company) {
            console.log("company Id", company._id)
            const reviews = await Review.find({ $and: [{ "company": company._id }, { "featured": true }] });
            // console.log("after query")
            if (!reviews) {

                return res.status(400).json({ msg: 'No reviews for this company' });

            }
            //const results = JSON.stringify(reviews)
            res.status(200).json(reviews)
        } else {
            return res.status(400).json({ msg: 'No company found' });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;