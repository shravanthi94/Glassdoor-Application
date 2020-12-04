/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const Review = require('../../models/ReviewModel');
const Company = require('../../models/CompanyModel');
const { companyAuth, companyCheckAuth } = require('../../middleware/companyAuth');
const { ObjectId } = require('mongodb');
// const redisRead = require('../../config/RedisRead')
// const redisWrite = require('../../config/RedisWrite')
// const kafka = require('../../kafka/client');
const kafka = require('../../kafka/client');

companyAuth();

//check how to verify
router.post('/student', companyCheckAuth, async(req, res) => {
    // try {

    //     console.log("company id: ", req.body.companyId);
    //     console.log("student id: ", req.body.studentId);

    //     const reviews = await Review.find({ "company": req.body.companyId,  $or: [ { "approvalStatus": "approved" },  {"student": req.body.studentId}] })

    //     console.log("reviews list: ", reviews);
    //     if (!reviews) {
    //         return res.status(400).json({ msg: 'No reviews yet!' });
    //     }
    //     res.status(200).json(reviews);
    // } catch (err) {
    //     console.error(err.message);
    //     res.status(500).send('Server Error: Database');
    // }

    const payload = {
        topic: 'getStudentsReviewsByCompanyId',
        body: req.body,
        // params: req.params
    };
    kafka.make_request('companyReviews', payload, (err, results) => {
        console.log('in result');
        if (err) {
            console.log('Inside err', err);
            res.status(500).send('System Error, Try Again.');
        } else {
            if (results.status === 400) {
                console.log('Inside err2', results);
                return res.status(400).json({ msg: results.message });
            }
            if (results.status === 500) {
                console.log('Inside err3', results);
                return res.status(500).send('Server Error');
            }
            console.log('in result1234', results);
            res.status(200).json(results.message);
        }
    });
});


// @route  GET /company/review
// @Desc   Get all reviews of the company by id
// @access Private
//check how to verify
router.get('/:id', companyCheckAuth, async(req, res) => {
    // try {
    //     console.log("company id: ", req.params.id);
    //     const reviews = await Review.find({ "company": req.params.id });

    //     console.log("reviews list: ", reviews);
    //     if (!reviews) {
    //         return res.status(400).json({ msg: 'No reviews yet!' });
    //     }
    //     res.status(200).json(reviews);
    // } catch (err) {
    //     console.error(err.message);
    //     res.status(500).send('Server Error: Database');
    // }
    const payload = {
        topic: 'getReviewsByCompanyId',
        params: req.params,
        // params: req.params
    };
    kafka.make_request('companyReviews', payload, (err, results) => {
        console.log('in result');
        if (err) {
            console.log('Inside err', err);
            res.status(500).send('System Error, Try Again.');
        } else {
            if (results.status === 400) {
                console.log('Inside err2', results);
                return res.status(400).json({ msg: results.message });
            }
            if (results.status === 500) {
                console.log('Inside err3', results);
                return res.status(500).send('Server Error');
            }
            console.log('in result1234', results);
            res.status(200).json(results.message);
        }
    });
});


// @route  POST /company/review
// @Desc   Post a new review for the company
// @access Private
//check how to verify
router.post('/', companyCheckAuth, async(req, res) => {
    // try {
    //     console.log("review details: ", req.body);

    //     var comment = "";

    //     if (req.body.employment_status != "Intern") {
    //         comment = " employee";
    //     }

    //     var d = new Date();
    //     var mm = d.getMonth() + 1;
    //     var dd = d.getDate();
    //     var yy = d.getFullYear();
    //     var myDateString = yy + '-' + mm + '-' + dd;

    //     const review = new Review({

    //         company: req.body.company,
    //         student: req.body.student,
    //         headline: req.body.headline,
    //         pros: req.body.pros,
    //         cons: req.body.cons,
    //         overAllRating: req.body.rating,
    //         comment: req.body.comment + req.body.employment_status + comment,
    //         jobTitle: req.body.job_title,
    //         currentOrFormer: req.body.current_former,
    //         approvalStatus: "new",
    //         date: myDateString,

    //     });
    //     await Company.update({ _id: req.body.company }, { $inc: { numberOfReviews: 1 } });

    //     await review.save((error, data) => {
    //         if (error) {
    //             return res.status(400).json({ msg: "Couldn't add review, try after sometime!" });
    //         } else {

    //             return res.status(200).json({ msg: "Review successfully added" });
    //         }
    //     });

    // } catch (err) {
    //     console.error(err.message);
    //     res.status(500).send('Server Error: Database');
    // }

    const payload = {
        topic: 'postNewReview',
        body: req.body,
    };
    console.log("Update Status,", payload)
    kafka.make_request('companyReviews', payload, (err, results) => {
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
            return res.status(200).json({ msg: results.message });

        }
    });
});

// @route  GET /company/review/my/reviews
// @Desc   GET all current company's reviews approved
// @access Private

// Working
router.get('/my/reviews', companyCheckAuth, async(req, res) => {

    // try {
    //     const company = await Company.findOne({ "email": req.company.email })
    //     if (company) {
    //         console.log("company Id", company._id)
    //         const reviews = await Review.find({ $and: [{ "company": company._id }, { 'approvalStatus': 'approved' }] });
    //         console.log("after query")
    //         if (!reviews) {

    //             return res.status(400).json({ msg: 'No reviews for this company' });

    //         }
    //         // const results = JSON.stringify(reviews)
    //         res.status(200).json(reviews)
    //     } else {
    //         return res.status(400).json({ msg: 'No company found' });
    //     }

    // } catch (err) {
    //     console.error(err.message);
    //     res.status(500).send('Server Error');
    // }

    const payload = {
        topic: 'getCurrentCompanyReviews',
        company: req.company,
        // params: req.params
    };
    kafka.make_request('companyReviews', payload, (err, results) => {
        console.log('in result');
        if (err) {
            console.log('Inside err', err);
            res.status(500).send('System Error, Try Again.');
        } else {
            if (results.status === 400) {
                console.log('Inside err2', results);
                return res.status(400).json({ msg: results.message });
            }
            if (results.status === 500) {
                console.log('Inside err3', results);
                return res.status(500).send('Server Error');
            }
            console.log('in result1234', results);
            res.status(200).json(results.message);
        }
    });
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
// Working
router.post('/favorite/:id', companyCheckAuth, async(req, res) => {

    // try {
    //     // console.log(req.params.id)
    //     let review = await Review.findOne({ "_id": req.params.id })
    //     if (review) {
    //         if (review.favorite === false) {


    //             // console.log("company Id", review)
    //             review = await Review.findOneAndUpdate({ "_id": req.params.id }, { $set: { "favorite": true } }, { new: true });
    //         } else {
    //             return res.status(400).json({ msg: 'Review is already marked as favorite' });
    //         }
    //         // const updatedreviews = await ReviewfindById(req.company.id);
    //         return res.status(200).json(review);
    //     } else {
    //         return res.status(400).json({ msg: 'No Review found' });
    //     }

    // } catch (err) {
    //     console.error(err.message);
    //     res.status(500).send('Server Error');
    // }

    const payload = {
        topic: 'markFavoriteReview',
        params: req.params,
        // params: req.params
    };
    kafka.make_request('companyReviews', payload, (err, results) => {
        console.log('in result');
        if (err) {
            console.log('Inside err', err);
            res.status(500).send('System Error, Try Again.');
        } else {
            if (results.status === 400) {
                console.log('Inside err2', results);
                return res.status(400).json({ msg: results.message });
            }
            if (results.status === 500) {
                console.log('Inside err3', results);
                return res.status(500).send('Server Error');
            }
            console.log('in result1234', results);
            res.status(200).json(results.message);
        }
    });
});

// @route  POST /company/review/my/reviews
// @Desc   POST Mark a review as featured
// @access Private

router.post('/featured/:id', companyCheckAuth, async(req, res) => {

    // try {

    //     // console.log(req.params.id)
    //     let review = await Review.findOne({ "_id": req.params.id })
    //     if (review) {
    //         // console.log("company Id", review)
    //         if (review.featured === false) {
    //             review = await Review.findOneAndUpdate({ "_id": req.params.id }, { $set: { "featured": true } }, { new: true });
    //             const {
    //                 date,
    //                 favorite,
    //                 featured,
    //                 company,
    //                 student,
    //                 approvalStatus,
    //                 headline,
    //                 pros,
    //                 cons,
    //                 overAllRating,
    //                 comment,
    //                 currentOrFormer
    //             } = review
    //             const newFeturedReview = {
    //                 date,
    //                 favorite,
    //                 featured,
    //                 company,
    //                 student,
    //                 approvalStatus,
    //                 headline,
    //                 pros,
    //                 cons,
    //                 overAllRating,
    //                 comment,
    //                 currentOrFormer
    //             }
    //             let companyprofile = await Company.findById({ '_id': review.company })
    //             companyprofile.featuredreviews.unshift(newFeturedReview);
    //             await companyprofile.save();
    //         } else {
    //             return res.status(400).json({ msg: 'Review is already featured' });
    //         }
    //         return res.status(200).json(review);
    //     } else {
    //         return res.status(400).json({ msg: 'No Review found' });
    //     }

    // } catch (err) {
    //     console.error(err.message);
    //     res.status(500).send('Server Error');
    // }

    const payload = {
        topic: 'markFeaturedReview',
        params: req.params,
        // params: req.params
    };
    kafka.make_request('companyReviews', payload, (err, results) => {
        console.log('in result');
        if (err) {
            console.log('Inside err', err);
            res.status(500).send('System Error, Try Again.');
        } else {
            if (results.status === 400) {
                console.log('Inside err2', results);
                return res.status(400).json({ msg: results.message });
            }
            if (results.status === 500) {
                console.log('Inside err3', results);
                return res.status(500).send('Server Error');
            }
            console.log('in result1234', results);
            res.status(200).json(results.message);
        }
    });
});

// @route  GET /company/review/featured
// @Desc   GET all the featured reviews 
// @access Private
// not required 
// router.get('/featured/all', companyCheckAuth, async(req, res) => {

//     try {
//         const company = await Company.findOne({ "email": req.company.email })
//         if (company) {
//             console.log("company Id", company._id)
//             const reviews = await Review.find({ $and: [{ "company": company._id }, { "featured": true }] });
//             // console.log("after query")
//             if (!reviews) {

//                 return res.status(400).json({ msg: 'No reviews for this company' });

//             }
//             //const results = JSON.stringify(reviews)
//             res.status(200).json(reviews)
//         } else {
//             return res.status(400).json({ msg: 'No company found' });
//         }

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// @route  POST /company/review
// @Desc   Post a reply to review
// @access Private

router.post('/reply/:id', companyCheckAuth, async(req, res) => {

    // try {
    //     // console.log(req.params.id)
    //     console.log(req.body)
    //     const reply = req.body.reply
    //     console.log("reply inside post is ", reply)
    //     let review = await Review.findOne({ "_id": req.params.id })
    //     console.log("find review", review)
    //     if (review) {
    //         console.log("1")
    //             // review = await Review.findOneAndUpdate({ "_id": req.params.id }, { $set: { "reply.message": reply } }, { new: true });
    //         review.reply.push({ message: reply })
    //         await review.save()
    //         console.log("2")
    //         return res.status(200).json(review);
    //     } else {
    //         return res.status(400).json({ msg: 'No Review found' });
    //     }

    // } catch (err) {
    //     console.error(err.message);
    //     res.status(500).send('Server Error');
    // }

    // not working
    const payload = {
        topic: 'replyMessage',
        params: req.params,
        body: req.body
    };
    console.log("review", payload)
    kafka.make_request('companyReviews', payload, (err, results) => {
        console.log('in result');
        if (err) {
            console.log('Inside err', err);
            res.status(500).send('System Error, Try Again.');
        } else {
            if (results.status === 400) {
                console.log('Inside err2', results);
                return res.status(400).json({ msg: results.message });
            }
            if (results.status === 500) {
                console.log('Inside err3', results);
                return res.status(500).send('Server Error');
            }
            console.log('in result1234', results);
            res.status(200).json(results.message);
        }
    });
});


module.exports = router;