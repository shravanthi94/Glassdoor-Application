const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysqlConnectionPool = require('../../config/sqlConnectionPool');

const Student = require('../../models/StudentModel');
const Review = require('../../models/ReviewModel');
const Company = require('../../models/CompanyModel');
const Jobposting = require('../../models/JobPostingModel');

var response = {};

const handle_request = async(payload, callback) => {
    const { topic } = payload;
    console.log('In topicassadfw: ', topic);
    switch (topic) {
        case 'getCurrentCompanyJobByJobId':
            return getCurrentCompanyJobByJobId(payload, callback);
        case 'studentDetailsByEmail':
            console.log("coming here")
            return getApplicantDetailByEmail(payload, callback);
        case 'getApplicantDetail':
            return getApplicantDetail(payload, callback);
        case 'updateApplicantStatus':
            return updateApplicantStatus(payload, callback);
    }
}

async function getCurrentCompanyJobByJobId(payload, callback) {
    try {
        // console.log("Payload222", payload)
        let company = await Company.findOne({ "email": payload.company.email });
        if (company) {
            const jobPosting = await Jobposting.find({
                    "_id": payload.params.id,
                    "company": company._id,
                }

            ).populate('applicants.student');
            if (jobPosting.length > 0) {
                response.status = 200;
                response.message = jobPosting[0];
                return callback(null, response);
            } else {
                response.status = 400;
                response.message = 'No job posted yet!';
                return callback(null, response);
            }


        }
    } catch (err) {
        console.error(err.message);
        // res.status(500).send('Server Error: Database');
        repsonse.status = 500;
        response.message = 'Server Error: Database';
        return callback(null, response)
    }

}

async function getApplicantDetail(payload, callback) {
    try {
        // console.log(payload)
        const job = await Jobposting.findOne({
            $and: [{ email: payload.company.email },
                { 'applicants._id': payload.params.id }
            ]
        });
        console.log("getapplicantdetail, job:", job)
        const applicantIndex = job.applicants.map((item) => item.id).indexOf(payload.params.id);
        const applicant = await job.applicants[applicantIndex];
        if (!job) {
            // return res.status(400).json({ msg: 'There is no Job' });
            response.status = 400;
            response.message = ('There is no Job');
            // console.log("After", response)
            return callback(null, response);
        }
        // res.json(applicant);
        response.status = 200;
        response.message = applicant;
        console.log("After", response)
        return callback(null, response);

    } catch (err) {
        console.error(err.message);
        // res.status(500).send('Server Error: Database');
        response.status = 500;
        response.message = ('Server Error: Database');
        // console.log("After", response)
        return callback(null, response);
    }
}

async function getApplicantDetailByEmail(payload, callback) {
    console.log("Inside In topic", payload)
    try {
        console.log("getApplicantDetailbyEmail", payload)
        const student = await Student.findOne({ 'email': payload.params.email });

        if (!student) {
            response.status = 400;
            response.message = ('No student Found');
            return callback(null, response);
        }
        response.status = 200;
        response.message = student;
        console.log("After", response)
        return callback(null, response);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
}

async function updateApplicantStatus(payload, callback) {
    // console.log("backend1")
    const data = {
        'applicants.$.applicantStatus': payload.body.applicantStatus,
    };
    try {
        // console.log('backend', payload.body.applicantStatus);
        const job = await Jobposting.findOneAndUpdate({ "email": payload.email, 'applicants._id': payload.params.applicantId }, { $set: data }, { new: true });
        // console.log(job);

        // res.json(job);
        response.status = 200;
        response.message = job;
        // console.log("After", response)
        return callback(null, response);
    } catch (err) {
        console.error(err.message);
        // res.status(500).send('Server Error');
        response.status = 500;
        response.message = ('Server Error');
        // console.log("After", response)
        return callback(null, response);
    }
}


exports.handle_request = handle_request;