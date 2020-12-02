const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilePic: {
        image: {
            type: String,
        },
        status: {
            type: String,
            default: 'new',
        }
    },
    logo: {
        type: String,
        default: 'default',
    },
    ceoName: {
        type: String,
    },
    location: {
        type: String,
    },
    description: {
        type: String,
    },
    website: {
        type: String,
    },
    size: {
        type: String,
    },
    type: {
        type: String,
    },
    revenue: {
        type: String,
    },
    headquarters: {
        type: String,
    },
    mission: {
        type: String,
    },
    industry: {
        type: String,
    },
    founded: {
        type: String,
    },
    mission: {
        type: String,
    },
    overAllRating: {
        type: Number,
        default: 0,
    },
    ceoApprovalRating: {
        type: Number,
        default: 0,
    },
    recommendationRating: {
        type: Number,
        default: 0,
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    numberOfInterviews: {
        type: Number,
        default: 0,
    },
    numberOfSalaries: {
        type: Number,
        default: 0,
    },
    logo: {
        type: String,
    },
    featuredreviews: [{
        date: {
            type: String,
        },
        favorite: {
            type: Boolean,
        },
        featured: {
            type: Boolean,
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'company',
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student',
        },
        approvalStatus: {
            type: String,
        },
        headline: {
            type: String,
        },
        pros: {
            type: String,
        },
        cons: {
            type: String,
        },
        overAllRating: {
            type: String,
        },
        comment: {
            type: String,
        },
        currentOrFormer: {
            type: String,
        },
    }, ],
    interview: [{
        overallInterviewExp: {
            type: String
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        jobTitle: {
            type: String,
        },
        difficulty: {
            type: String,
        },
        offerStatus: {
            type: String,
        },
        questions: {
            type: String,
        },
        answers: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now(),
        }, 
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student',
        }
    }, ],
    salary: [{
        baseSalary: {
            type: String,
            required: true,
        },
        avgTotalPay: {
            type: String,
        },
        bonuses: {
            type: String,
        },
        jobTitle: {
            type: String,
        },
        yearsOfExperience: {
            type: String,
        },
        location: {
            type: String,
            required: true,
        },
        salaryGender: {
            type: String,
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student',
        }
    }, ],
    photos: [{
        file: {
            type: String,
        },
        status: {
            type: String,
            default: 'new',
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student',
        },
    }, ],
    date: { type: Date, default: Date.now() },
    views: [{
        date: {
            type: String,
        },
        count: {
            type: Number,
        },
    }, ],
});

const Company = mongoose.model('company', CompanySchema);
module.exports = Company;