const mongoose = require('mongoose');

const JobPostingSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        // type: String,
        ref: 'company',
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    responsibilities: {
        type: [String],
    },
    qualifications: {
        type: [String],
    },
    industry: {
        type: String,
    },
    country: {
        type: String
    },
    Remote: {
        type: String,
    },
    inPerson: {
        type: String,
    },
    street: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: String
    },
    salary: {
        type: String
    },
    date: { type: Date, default: Date.now() },
    applicants: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student'
        },
        email: {
            type: String
        },
        resume: {
            type: String
        },
        coverLetter: {
            type: String
        },
        applicantStatus: {
            type: String,
            default: 'applied'
        },
        appliedDate: {
            type: Date,
            default: Date.now()
        },
    }]

});

const Jobposting = mongoose.model('jobposting', JobPostingSchema);
module.exports = Jobposting;