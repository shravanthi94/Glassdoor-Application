const Student = require('../../models/StudentModel');
const Review = require('../../models/ReviewModel');
const Company = require('../../models/CompanyModel');
const Jobposting = require('../../models/JobPostingModel');

const response = {};

const handle_request = async (payload, callback) => {
  const { topic } = payload;
  console.log('In topic: ', topic);
  switch (topic) {
    case 'displayAllJobs':
      return displayAllJobs(payload, callback);
    case 'viewEachJobDetail':
      return viewEachJobDetail(payload, callback);
  }
};

async function displayAllJobs(payload, callback) {
  try {
    let jobs = await Jobposting.find().sort({ date: -1 }).populate('company');
    if (!jobs) {
      response.status = 400;
      response.message = 'No jobs posted yet';
      return callback(null, response);
    }

    response.status = 200;
    response.message = jobs;
    return callback(null, response);
  } catch (err) {
    console.error(err.message);
    response.status = 500;
    response.message = 'Server Error: Database';
    return callback(null, response);
  }
}

async function viewEachJobDetail(payload, callback) {
  try {
    let job = await Jobposting.findById(payload.params.id);
    if (!job) {
      response.status = 400;
      response.message = 'No jobs posted yet';
      return callback(null, response);
    }
    response.status = 200;
    response.message = job;
    return callback(null, response);
  } catch (err) {
    console.error(err.message);
    response.status = 500;
    response.message = 'Server Error: Database';
    return callback(null, response);
  }
}

exports.handle_request = handle_request;
