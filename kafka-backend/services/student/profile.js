const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Student = require('../../models/StudentModel');
const Review = require('../../models/ReviewModel');
const Company = require('../../models/CompanyModel');
const Jobposting = require('../../models/JobPostingModel');

const response = {};

const handle_request = async (payload, callback) => {
  const { topic } = payload;
  console.log('In topic: ', topic);
  switch (topic) {
    case 'updateStudentBasics':
      return updateStudentBasics(payload, callback);
    case 'studentCounts':
      return studentCounts(payload, callback);
    case 'studentContribution':
      return studentContribution(payload, callback);
    case 'updateStudentDemographics':
      return updateStudentDemographics(payload, callback);
    case 'updateJobPreference':
      return updateJobPreference(payload, callback);
    case 'currentStudent':
      return currentStudent(payload, callback);
    case 'studentSearchResults':
      return studentSearchResults(payload, callback);
  }
};

async function updateStudentBasics(payload, callback) {
  const studentId = payload.user.id;
  const { name, email } = payload.body;

  try {
    const student = await Student.findById(studentId).select('-password');
    student.name = name;
    student.email = email;

    await student.save();

    response.status = 200;
    response.message = student;
    return callback(null, response);
  } catch (err) {
    console.error(error.message);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function studentCounts(payload, callback) {
  try {
    const reviewCount = await Review.find({
      student: payload.user.id,
    }).countDocuments();

    const ratingCount = await Review.find({
      student: payload.user.id,
      overAllRating: { $ne: null },
    }).countDocuments();

    const results = {
      reviewCount,
      ratingCount,
    };

    response.status = 200;
    response.message = results;
    return callback(null, response);
  } catch (err) {
    console.error(error.message);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function studentContribution(payload, callback) {
  const query = payload.params.query;
  console.log('Query: ', query);
  try {
    let results = [];
    if (query === 'reviews') {
      results = await Review.find({ student: payload.user.id }).populate(
        'company',
      );
    } else if (query === 'interviews') {
      results = await Company.find({ 'interview.student': payload.user.id });
    } else if (query === 'salaries') {
      results = await Company.find({ 'salary.student': payload.user.id });
    } else if (query === 'photos') {
      results = await Company.find({ 'photos.student': payload.user.id });
    }

    if (!results || results.length === 0) {
      response.status = 400;
      response.message = 'No results found.';
      return callback(null, response);
    }

    response.status = 200;
    response.message = results;
    return callback(null, response);
  } catch (err) {
    console.error(error.message);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function updateStudentDemographics(payload, callback) {
  const studentEmail = payload.user.email;
  const { ethnicity, gender, disability, veteran } = payload.body;

  try {
    const student = await Student.findOne({ email: studentEmail });
    student.demographics.ethnicity = ethnicity;
    student.demographics.gender = gender;
    student.demographics.disability = disability;
    student.demographics.veteran = veteran;

    await student.save();

    response.status = 200;
    response.message = student;
    return callback(null, response);
  } catch (err) {
    console.error(error.message);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function updateJobPreference(payload, callback) {
  const studentEmail = payload.user.email;
  const { status, title, relocation, salary, industry } = payload.body;

  console.log('Backend relocation:', relocation);
  try {
    const student = await Student.findOne({ email: studentEmail });

    student.jobPreference.status = status;
    student.jobPreference.title = title;
    student.jobPreference.relocation = relocation;
    student.jobPreference.salary = salary;
    student.jobPreference.industry = industry;

    await student.save();

    response.status = 200;
    response.message = student;
    return callback(null, response);
  } catch (err) {
    console.error(error.message);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function currentStudent(payload, callback) {
  try {
    const student = await Student.findOne({ email: payload.user.email });
    response.status = 200;
    response.message = student;
    return callback(null, response);
  } catch (err) {
    console.error(err.message);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

async function studentSearchResults(payload, callback) {
  const searchData = payload.params.data;
  const query = payload.params.query;
  try {
    let results = [];
    // let interviewCount, salaryCount;
    if (query === 'JOBS') {
      results = await Jobposting.find({
        title: { $regex: new RegExp('^' + searchData.toLowerCase(), 'i') },
      }).populate('company');
    } else {
      results = await Company.find({
        name: { $regex: new RegExp('^' + searchData.toLowerCase(), 'i') },
      });
    }

    if (results.length === 0) {
      response.status = 400;
      response.message = 'No results found.';
      return callback(null, response);
    }

    response.status = 200;
    response.message = results;
    return callback(null, response);
  } catch (err) {
    console.error(err.message);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

exports.handle_request = handle_request;
