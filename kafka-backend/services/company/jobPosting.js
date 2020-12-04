const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Jobposting = require('../../models/JobPostingModel');
const Company = require('../../models/CompanyModel');

const response = {};

const handle_request = async(payload, callback) => {
    const { topic } = payload;
    console.log('In topic: ', topic);
    switch (topic) {
        case 'getAllJobs':
            return getAllJobs(payload, callback);
        case 'createJob':
            return createJob(payload, callback);
    }
};

async function getAllJobs(payload, callback) {
    try {
        const jobs = await Jobposting.find({ email: payload.company.email })
            .populate('applicants.student')
            .sort({ date: -1 });

        if (!jobs) {
            response.status = 400;
            response.message = 'There are no Jobs created by this Company';
            return callback(null, response);
        }

        response.status = 200;
        response.message = jobs;
        return callback(null, response);
    } catch (err) {
        console.error(err.message);
        response.status = 500;
        response.message = 'Server Error';
        return callback(null, response);
    }
}

async function createJob(payload, callback) {
    try {
        // build profile object
        const {
            title,
            description,
            responsibilities,
            qualifications,
            industry,
            country,
            Remote,
            inPerson,
            street,
            city,
            state,
            salary,
            zip,
            jobType,
        } = payload.body;
        // console.log("KafkaBackend payload.body", payload.body)

        let company = await Company.findOne({ email: payload.company.email });
        if (company) {
            // console.log(company._id);
            const jobPostingFields = {};
            jobPostingFields.company = company._id;
            jobPostingFields.name = payload.company.name;
            jobPostingFields.email = payload.company.email;
            if (title) jobPostingFields.title = title;
            if (salary) jobPostingFields.salary = salary;
            if (description) jobPostingFields.description = description;
            if (responsibilities) {
                jobPostingFields.responsibilities = responsibilities
                    .split(',')
                    .map((responsibility) => responsibility.trim());
            }
            if (qualifications) {
                jobPostingFields.qualifications = qualifications
                    .split(',')
                    .map((qualification) => qualification.trim());
            }
            if (industry) jobPostingFields.industry = industry;
            if (country) jobPostingFields.country = country;
            if (Remote) jobPostingFields.Remote = Remote;
            if (inPerson) jobPostingFields.inPerson = inPerson;
            if (street) jobPostingFields.street = street;
            if (city) jobPostingFields.city = city;
            if (state) jobPostingFields.state = state;
            if (zip) jobPostingFields.zip = zip;
            if (jobType) jobPostingFields.jobType = jobType;
            // console.log('job Type', jobType);
            // company = await Jobposting.findOneAndUpdate({ "email": req.company.email }, { $set: jobPostingFields }, { new: true });
            let job = new Jobposting(jobPostingFields);
            await job.save();
            // res.status(200).json(job);
            response.status = 200;
            response.message = job;
            // console.log("job Create Jjob create", response)
            return callback(null, response);
        }
    } catch (err) {
        console.error(err.message);
        // res.status(500).send('Server Error');
        response.status = 500;
        response.message = ('Server Error');
        // console.log("job Create Jjob create", response)
        return callback(null, response);
    }
}

exports.handle_request = handle_request;