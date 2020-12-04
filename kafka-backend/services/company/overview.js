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
    console.log('In topic: ', topic);
    switch (topic) {
        case 'getCompanyById':
            return getCompanyById(payload, callback);
    }
}

async function getCompanyById(payload, callback) {
    try {
        console.log("company id: ", payload.params.id);
        const overview = await Company.findById(payload.params.id);

        if (!overview) {
            // return res.status(400).json({ msg: 'No company profile found!' });
            response.status = 400;
            response.message = ('No company profile found!');
            return callback(null, response);
        } else {

            var d = new Date();
            var mm = d.getMonth() + 1;
            var dd = d.getDate();
            var yy = d.getFullYear();
            var myDateString = yy + '-' + mm + '-' + dd;
            const view = {
                date: myDateString,
                count: 1,
            }

            if (overview.views && overview.views.length > 0) {
                var flag = false;
                for (var i = 0; i < overview.views.length; i++) {
                    if (overview.views[i].date === myDateString) {
                        overview.views[i].count = overview.views[i].count + 1;
                        flag = true;
                    }
                }
                if (!flag) {
                    overview.views.push(view);
                }
            } else {
                overview.views.push(view);
            }
            overview.save();

            // const reviews = await Review.find({ "company": req.params.id, featured: true });

            const company = {
                overview: overview,
                // reviews: reviews
            }

            console.log("company overview-review: ", company);
            // res.status(200).json(company);
            response.status = 200;
            response.message = company;
            return callback(null, response);
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
        response.status = 500;
        response.message = ('Server Error: Database');
        return callback(null, response);
    }
}
exports.handle_request = handle_request;