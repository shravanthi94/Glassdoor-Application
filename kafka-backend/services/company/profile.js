const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Jobposting = require('../../models/JobPostingModel');
const Company = require('../../models/CompanyModel');
const mysqlConnectionPool = require('../../config/sqlConnectionPool');

const response = {};

const handle_request = async(payload, callback) => {
    const { topic } = payload;
    console.log('In topic: ', topic);
    switch (topic) {
        case 'updateProfile':
            return updateProfile(payload, callback);
        case 'getCurrentCompanyProfile':
            return getCurrentCompanyProfile(payload, callback)
        case 'getRegisteredCompany':
            return getRegisteredCompany(payload, callback)
    }
};

async function updateProfile(payload, callback) {
    const {
        ceoName,
        location,
        description,
        website,
        size,
        type,
        revenue,
        headquarters,
        industry,
        founded,
        mission,
    } = payload.body;
    const cmpnyProfileFields = {};
    cmpnyProfileFields.name = payload.company.name;
    cmpnyProfileFields.email = payload.company.email;
    if (ceoName) cmpnyProfileFields.ceoName = ceoName;
    if (location) cmpnyProfileFields.location = location;
    if (description) cmpnyProfileFields.description = description;
    if (website) cmpnyProfileFields.website = website;
    if (size) cmpnyProfileFields.size = size;
    if (type) cmpnyProfileFields.type = type;
    if (revenue) cmpnyProfileFields.revenue = revenue;
    if (headquarters) cmpnyProfileFields.headquarters = headquarters;
    if (industry) cmpnyProfileFields.industry = industry;
    if (founded) cmpnyProfileFields.founded = founded;
    if (mission) cmpnyProfileFields.mission = mission;
    try {
        mysqlConnectionPool.query(
            `SELECT * FROM company WHERE email= '${payload.company.email}'`,
            async(error, result) => {
                if (error) {
                    console.log(error);
                    // return res.status(500).send('Server Error');
                    response.status = 500;
                    response.message = ('Server Error');
                    // console.log("job Create Jjob create", response)
                    return callback(null, response);
                }
                if (result) {
                    let company = await Company.findOne({ email: payload.company.email });
                    console.log('create profile find query', company);
                    if (company) {
                        // update
                        company = await Company.findOneAndUpdate({ email: payload.company.email }, { $set: cmpnyProfileFields }, { new: true }, );
                        // return res.json(company);
                        response.status = 200;
                        response.message = company;

                        return callback(null, response);
                    }
                    company = new Company(cmpnyProfileFields);
                    await company.save();
                    // res.status(200).json(company);
                    response.status = 200;
                    response.message = company;
                    // console.log("job Create Jjob create", response)
                    return callback(null, response);
                }
                // return res.status(400).json({ errors: [{ msg: 'Company is not yet registered.' }] });
                response.status = 400;
                response.message = ('Company is not yet registered.');
                // console.log("job Create Jjob create", response)
                return callback(null, response);
            },
        );
    } catch (err) {
        console.error(err.message);
        // res.status(500).send('Server Error');
        response.status = 500;
        response.message = ('Server Error');
        // console.log("job Create Jjob create", response)
        return callback(null, response);
    }
}


async function getCurrentCompanyProfile(payload, callback) {
    try {
        const company = await Company.findOne({ email: payload.company.email });
        if (!company) {
            response.status = 400;
            response.message = 'There is no profile for this company';
            return callback(null, response);
        }

        response.status = 200;
        response.message = company;
        return callback(null, response);
    } catch (err) {
        response.status = 500;
        response.message = 'Server Error: Database';
        return callback(null, response);

    }
}

async function getRegisteredCompany(payload, callback) {
    const email = payload.company.email;
    try {
        mysqlConnectionPool.query(
            `SELECT id, email, name FROM company WHERE email = '${email}'`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    // return res.status(500).send('Database Server Error');
                    response.status = 500;
                    response.message = 'SQL Database Server Error';
                    return callback(null, response);
                }
                // res.json(result);
                response.status = 200;
                response.message = result;
                return callback(null, response);
            }
        );
    } catch (err) {
        console.log(err);
        // res.status(500).send('Server Error');
        response.status = 500;
        response.message = 'SQL Database Server Error';
        return callback(null, response);
    }
}

exports.handle_request = handle_request;