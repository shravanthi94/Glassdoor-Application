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
        case 'getCurrentCompanyJobByJobId':
            return getCurrentCompanyJobByJobId(payload, callback);
    }
}

async function getCurrentCompanyJobByJobId(payload, callback) {
    try {
        console.log("Payload222", payload)
        let company = await Company.findOne({ "email": payload.company.email });
        // console.log("Print this", company._id)
        if (company) {
            const jobPosting = await Jobposting.find({
                    "_id": payload.id,
                    "company": payload.company.id,
                    // "applicants.applicantStatus": { $ne: "withdraw" }
                }

            ).populate('applicants.student');
            if (jobPosting.length > 0) {
                // res.status(200).json(jobPosting[0]);
                response.status = 200;
                // console.log("Before", response)
                response.message = jobPosting[0];
                console.log("After", response)
                return callback(null, response);
            } else {
                // return res.status(400).json({ msg: 'No job posted yet!' });
                response.status = 400;
                response.message = 'No job posted yet!';
                return callback(null, response);
            }


        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
        repsonse.status = 500;
        response.message = 'Server Error: Database';
        return callback(null, response)
    }

}


exports.handle_request = handle_request;