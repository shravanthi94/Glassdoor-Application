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
        case 'getSalaryByCompanyId':
            return getSalaryByCompanyId(payload, callback);
        case 'addSalary':
            return addSalary(payload, callback);
    }
}

async function getSalaryByCompanyId(payload, callback) {
    try {
        console.log("company id: ", payload.params.id);
        const jobPosting = await Jobposting.find({ "company": payload.params.id });

        if (!jobPosting) {
            // return res.status(400).json({ msg: 'No job posted yet!' });
            response.status = 400;
            response.message = ('No job posted yet!');
            return callback(null, response);
        } else {

            console.log("company job postings: ", jobPosting);
            // res.status(200).json(jobPosting);
            response.status = 200;
            response.message = jobPosting;
            return callback(null, response);
        }

    } catch (err) {
        console.error(err.message);
        // res.status(500).send('Server Error: Database');
        response.status = 500;
        response.message = ('Server Error: Database');
        return callback(null, response);
    }
}

async function addSalary(payload, callback) {
    try {
        console.log("salary details: ", payload.body);

        var totalPay = parseInt(payload.body.baseSalary) + parseInt(payload.body.bonuses);
        var data = {
            avgTotalPay: totalPay,
            baseSalary: payload.body.baseSalary,
            bonuses: payload.body.bonuses,
            jobTitle: payload.body.jobTitle,
            yearsOfExperience: payload.body.yearsOfExp,
            location: payload.body.location,
            salaryGender: payload.body.gender,
            student: payload.body.student
        };

        const company = await Company.findByIdAndUpdate({ _id: payload.body.company }, { $push: { salary: data }, $inc: { numberOfSalaries: 1 } }, { new: true });

        if (!company) {
            // res.status(400).send("Couldn't add salary details. Try after sometime"); 
            response.status = 400;
            response.message = ('Couldn\'t add salary details. Try after sometime');
            return callback(null, response);
        } else {
            console.log("After salary add - company: ", company);
            // res.status(200).send(company);
            response.status = 200;
            response.message = company;
            return callback(null, response);

        }

    } catch (err) {
        console.error(err.message);
        // res.status(500).send('Server Error: Database');
        response.status = 500;
        response.message = ('Server Error: Database');
        return callback(null, response);
    }
}

exports.handle_request = handle_request;