const mongoose = require('mongoose');

const JobPostingSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company',
    },
    companyName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    responsibilities: [{
        type: String,
        required: true
    }],
    qualifications: [{
        type: String,
        required: true
    }],
    industry: {
        type: String,
        required: true
    },
    country: {
        type: String
    },
    Remote: {
        type: Boolean,
        required: true
    },
    inPerson: {
        type: Boolean,
        required: true
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
    date: { type: Date, default: Date.now() },
    applicants: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student'
        },
        resume: {
            type: String
        },
        coverLetter: {
            type: String
        },
        applicantStatus: {
            type: String
        },
        appliedDate: {
            type: Date,
            default: Date.now()
        },
    }]

});

const Jobposting = mongoose.model('jobposting', JobPostingSchema);
module.exports = Jobposting;