const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysqlConnectionPool = require('../../config/sqlConnectionPool');

const Student = require('../../models/StudentModel');
const Review = require('../../models/ReviewModel');
const Company = require('../../models/CompanyModel');
const Jobposting = require('../../models/JobPostingModel');

var response = {};

//companyReviews
const handle_request = async(payload, callback) => {
    const { topic } = payload;
    console.log('In topic: ', topic);
    switch (topic) {
        case 'getStudentsReviewsByCompanyId':
            return getStudentsReviewsByCompanyId(payload, callback);
        case 'getReviewsByCompanyId':
            return getReviewsByCompanyId(payload, callback);
        case 'postNewReview':
            return postNewReview(payload, callback);
        case 'getCurrentCompanyReviews':
            return getCurrentCompanyReviews(payload, callback);
        case 'markFavoriteReview':
            return markFavoriteReview(payload, callback);
        case 'markFeaturedReview':
            return markFeaturedReview(payload, callback);
        case 'replyMessage':
            return replyMessage(payload, callback);

    }
}

async function getStudentsReviewsByCompanyId(payload, callback) {

    try {

        console.log("company id: ", payload.body.companyId);
        console.log("student id: ", payload.body.studentId);

        const reviews = await Review.find({ "company": payload.body.companyId, $or: [{ "approvalStatus": "approved" }, { "student": payload.body.studentId }] })

        console.log("reviews list: ", reviews);
        if (!reviews) {
            // return res.status(400).json({ msg: 'No reviews yet!' });
            response.status = 400;
            response.message = 'No reviews yet!';
            return callback(null, response);
        }
        // res.status(200).json(reviews);
        response.status = 200;
        response.message = reviews;
        return callback(null, response);
    } catch (err) {
        console.error(err.message);
        // res.status(500).send('Server Error: Database');
        repsonse.status = 500;
        response.message = 'Server Error: Database';
        return callback(null, response)
    }
}

async function getReviewsByCompanyId(payload, callback) {
    try {
        console.log("company id: ", payload.params.id);
        const reviews = await Review.find({ "company": payload.params.id });

        console.log("reviews list: ", reviews);
        if (!reviews) {
            // return res.status(400).json({ msg: 'No reviews yet!' });
            response.status = 400;
            response.message = 'No reviews yet!';
            return callback(null, response);
        }
        // res.status(200).json(reviews);
        response.status = 200;
        response.message = reviews;
        return callback(null, response);
    } catch (err) {
        console.error(err.message);
        // res.status(500).send('Server Error: Database');
        repsonse.status = 500;
        response.message = 'Server Error: Database';
        return callback(null, response)
    }
}

async function postNewReview(payload, callback) {
    console.log("Addnewreview", payload)
    try {

        console.log("review details: ", payload.body);

        var comment = "";

        if (payload.body.employment_status != "Intern") {
            comment = " employee";
        }

        var d = new Date();
        var mm = d.getMonth() + 1;
        var dd = d.getDate();
        var yy = d.getFullYear();
        var myDateString = yy + '-' + mm + '-' + dd;

        const review = new Review({

            company: payload.body.company,
            student: payload.body.student,
            headline: payload.body.headline,
            pros: payload.body.pros,
            cons: payload.body.cons,
            overAllRating: payload.body.rating,
            comment: payload.body.comment + payload.body.employment_status + comment,
            jobTitle: payload.body.job_title,
            currentOrFormer: payload.body.current_former,
            approvalStatus: "new",
            date: myDateString,

        });
        await Company.update({ _id: payload.body.company }, { $inc: { numberOfReviews: 1 } });

        await review.save((error, data) => {
            if (error) {
                // return res.status(400).json({ msg: "Couldn't add review, try after sometime!" });
                response.status = 400;
                response.message = ('Couldn\'t add review, try after sometime!');
                return callback(null, response);
            } else {

                // return res.status(200).json({ msg: "Review successfully added" });
                response.status = 200;
                response.message = ("Review successfully added");
                return callback(null, response);
            }
        });

    } catch (err) {
        console.error(err.message);
        // res.status(500).send('Server Error: Database');
        repsonse.status = 500;
        response.message = 'Server Error: Database';
        return callback(null, response)
    }
}

async function getCurrentCompanyReviews(payload, callback) {
    try {
        const company = await Company.findOne({ "email": payload.company.email })
        if (company) {
            console.log("company Id", company._id)
            const reviews = await Review.find({ $and: [{ "company": company._id }, { 'approvalStatus': 'approved' }] });
            console.log("after query")
            if (!reviews) {

                // return res.status(400).json({ msg: 'No reviews for this company' });
                response.status = 400;
                response.message = ('No reviews for this company');
                return callback(null, response);

            }
            // const results = JSON.stringify(reviews)
            // res.status(200).json(reviews)
            response.status = 200;
            response.message = (reviews);
            return callback(null, response);
        } else {
            // return res.status(400).json({ msg: 'No company found' });
            response.status = 400;
            response.message = ('No company found');
            return callback(null, response);
        }

    } catch (err) {
        console.error(err.message);
        // res.status(500).send('Server Error');
        repsonse.status = 500;
        response.message = 'Server Error: Database';
        return callback(null, response)

    }
}

async function markFavoriteReview(payload, callback) {
    try {
        // console.log(req.params.id)
        let review = await Review.findOne({ "_id": payload.params.id })
        if (review) {
            if (review.favorite === false) {
                // console.log("company Id", review)
                review = await Review.findOneAndUpdate({ "_id": payload.params.id }, { $set: { "favorite": true } }, { new: true });
            } else {
                // return res.status(400).json({ msg: 'Review is already marked as favorite' });
                response.status = 400;
                response.message = 'Review is already marked as favorite';
                return callback(null, response);
            }
            // const updatedreviews = await ReviewfindById(req.company.id);
            // return res.status(200).json(review);
            response.status = 200;
            response.message = review
            return callback(null, response);
        } else {
            // return res.status(400).json({ msg: 'No Review found' });
            response.status = 400;
            response.message = 'No Review found';
            return callback(null, response);
        }

    } catch (err) {
        console.error(err.message);
        // res.status(500).send('Server Error');
        response.status = 500;
        response.message = 'Server Error';
        return callback(null, response);
    }
}

async function markFeaturedReview(payload, callback) {
    try {
        // console.log(req.params.id)
        let review = await Review.findOne({ "_id": payload.params.id })
        if (review) {
            // console.log("company Id", review)
            if (review.featured === false) {
                review = await Review.findOneAndUpdate({ "_id": payload.params.id }, { $set: { "featured": true } }, { new: true });
                const {
                    date,
                    favorite,
                    featured,
                    company,
                    student,
                    approvalStatus,
                    headline,
                    pros,
                    cons,
                    overAllRating,
                    comment,
                    currentOrFormer
                } = review
                const newFeturedReview = {
                    date,
                    favorite,
                    featured,
                    company,
                    student,
                    approvalStatus,
                    headline,
                    pros,
                    cons,
                    overAllRating,
                    comment,
                    currentOrFormer
                }
                let companyprofile = await Company.findById({ '_id': review.company })
                companyprofile.featuredreviews.unshift(newFeturedReview);
                await companyprofile.save();
            } else {
                // return res.status(400).json({ msg: 'Review is already featured' });
                response.status = 400;
                response.message = 'Review is already featured';
                return callback(null, response);
            }
            // return res.status(200).json(review);
            response.status = 200;
            response.message = review
            return callback(null, response);
        } else {
            // return res.status(400).json({ msg: 'No Review found' });
            response.status = 400;
            response.message = 'No Review found';
            return callback(null, response);
        }

    } catch (err) {
        console.error(err.message);
        // res.status(500).send('Server Error');
        response.status = 500;
        response.message = 'Server Error';
        return callback(null, response);
    }
}

async function replyMessage(payload, callback) {
    try {
        // console.log(req.params.id)
        console.log(payload.body)
        const reply = payload.body.message
        console.log("reply inside post is ", reply)
        let review = await Review.findOne({ "_id": payload.params.id })
        console.log("result review", review)
        if (review) {
            console.log("1")
                // review = await Review.findOneAndUpdate({ "_id": payload.params.id }, { $set: { "reply.message": reply } }, { new: true });
            review.reply.push({ message: reply })
            await review.save()
                // return res.status(200).json(review);
            console.log("2", review)
            response.status = 200;
            response.message = review
            console.log("reply response", response)
            return callback(null, response);
        } else {
            // return res.status(400).json({ msg: 'No Review found' });
            response.status = 400;
            response.message = 'No Review found';
            console.log("error", response)
            return callback(null, response);
        }

    } catch (err) {
        console.error(err.message);
        // res.status(500).send('Server Error');
        response.status = 500;
        response.message = 'Server Error';
        return callback(null, response);
    }
}

exports.handle_request = handle_request;