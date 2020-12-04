//studentResume

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Student = require('../../models/StudentModel');
const Review = require('../../models/ReviewModel');
const Company = require('../../models/CompanyModel');
const Jobposting = require('../../models/JobPostingModel');

const response = {};

const handle_request = async(payload, callback) => {
    const { topic } = payload;
    console.log('In topic: ', topic);
    switch (topic) {
        case 'makeResumePrimary':
            return makeResumePrimary(payload, callback);
        case 'makeResumeRemove':
            return makeResumeRemove(payload, callback);

    }
}

async function makeResumePrimary(payload, callback) {
    try {
        console.log('primary: ', payload.body);
        var data = { 'resumes.$.isPrimary': true };

        let primaryResume = await Student.findOneAndUpdate({ _id: payload.body.studentId, 'resumes.isPrimary': true }, { $set: { 'resumes.$.isPrimary': false } }, { new: true }, );

        let student = await Student.findOneAndUpdate({ _id: payload.body.studentId, 'resumes._id': payload.body.resumeId }, { $set: data }, { new: true }, );

        if (!student) {
            // res.status(400).send("Couldn't make primary. Try after sometime");
            response.status = 400;
            response.message = ("Couldn't make primary. Try after sometime");
            return callback(null, response);
        } else {
            // res.status(200).send(student);
            response.status = 200;
            response.message = student;
            return callback(null, response);
        }
    } catch (err) {
        console.error(err.message);
        // res.status(500).send('Server Error');
        response.status = 500;
        response.message = 'Server Error';
        return callback(null, response);
    }
}

async function makeResumeRemove(payload, callback) {
    try {
        console.log('req data remove: ', payload.body);

        await Student.update({ _id: payload.body.studentId }, { $pull: { resumes: { _id: payload.body.resumeId } } }, );

        let student = await Student.findById(payload.body.studentId);

        if (!student) {
            // res.status(400).send("Couldn't make primary. Try after sometime");
            response.status = 400;
            response.message = ("Couldn't make primary. Try after sometime");
            return callback(null, response);

        } else {
            console.log('student: ', student);
            // res.status(200).send(student);
            response.status = 200;
            response.message = student;
            return callback(null, response);
        }
    } catch (err) {
        console.error(err.message);
        // res.status(500).send('Server Error');

        response.status = 500;
        response.message = 'Server Error';
        return callback(null, response);
    }
}
exports.handle_request = handle_request;