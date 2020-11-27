const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilePic: {
        type: String,
        default: 'default'
    },
    logo: {
        type: String,
        default: 'default'
    },
    ceoName: {
        type: String,
    },
    location: {
        type: String,
    },
    description: {
        type: String
    },
    website: {
        type: String,
    },
    size: {
        type: String
    },
    type: {
        type: String
    },
    revenue: {
        type: String
    },
    headquarters: {
        type: String
    },
    mission: {
        type: String
    },
    industry: {
        type: String
    },
    founded: {
        type: String
    },
    mission: {
        type: String,
    },
    overAllRating: {
        type: Number,
        default: 80
    },
    ceoApprovalRating: {
        type: Number,
        default: 95
    },
    recommendationRating: {
        type: Number,
        default: 75
    },
    logo: {
        type: String
    },
    images: [{
        type: String
    }],
    interview: [{
        overallInterviewExp: {
            type: String,
            required: true
        },
        title: {
            type: String
        },
        description: {
            type: String
        },
        jobTitle: {
            type: String
        },
        difficulty: {
            type: String
        },
        offerStatus: {
            type: String
        },
        questions: {
            type: String
        },
        answers: {
            type: String
        }
    }],
    salary: [{
        baseSalary: {
            type: String,
            required: true
        },
        avgTotalPay: {
            type: String
        },
        bonuses: {
            type: String
        },
        jobTitle: {
            type: String
        },
        yearsOfExperience: {
            type: String
        },
        location: {
            type: String,
            required: true
        },
        salaryGender: {
            type: String
        }
    }],
    date: { type: Date, default: Date.now() }
});

const Company = mongoose.model('company', CompanySchema);
module.exports = Company;