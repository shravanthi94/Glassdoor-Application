const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Jobposting = require('../../models/JobPostingModel');

const response = {};

const handle_request = async (payload, callback) => {
  const { topic } = payload;
  console.log('In topic: ', topic);
  switch (topic) {
    case 'getAllJobs':
      return getAllJobs(payload, callback);
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

exports.handle_request = handle_request;
