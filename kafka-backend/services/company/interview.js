const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Student = require('../../models/StudentModel');
const Review = require('../../models/ReviewModel');
const Company = require('../../models/CompanyModel');
const Jobposting = require('../../models/JobPostingModel');

var response = {};

const handle_request = async(payload, callback) => {
    const { topic } = payload;
    console.log('In topic: ', topic);
    switch (topic) {
        case 'addInterview':
            return addInterview(payload, callback);
    }
}

async function addInterview(payload, callback) {
    try {
        console.log("interview details: ", payload.body);
        var data = {
            overallInterviewExp: payload.body.overAllExperience,
            title: payload.body.jobTitle,
            description: payload.body.description,
            difficulty: payload.body.difficulty,
            offerStatus: payload.body.offerStatus,
            questions: payload.body.question,
            answers: payload.body.answer,
            jobTitle: payload.body.jobTitle,
            student: payload.body.student
        };

        const company = await Company.findByIdAndUpdate({ _id: payload.body.company }, { $push: { interview: data }, $inc: { numberOfInterviews: 1 } }, { new: true });

        if (!company) {
            // res.status(400).send("Couldn't add interview experience. Try after sometime");
            response.status = 400;
            // console.log("Before", response)
            response.message = ("Couldn't add interview experience. Try after sometime");
            console.log("After", response)
            return callback(null, response);
        } else {
            console.log("After interview add - company: ", company);
            // res.status(200).send(company);
            response.status = 200;
            // console.log("Before", response)
            response.message = company;
            console.log("After", response)
            return callback(null, response);
        }

    } catch (err) {
        console.error(err.message);
        // res.status(500).send('Server Error: Database');
        response.status = 500;
        // console.log("Before", response)
        response.message = ('Server Error: Database');
        console.log("After", response)
        return callback(null, response);
    }
}

exports.handle_request = handle_request;