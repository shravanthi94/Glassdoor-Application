const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company',
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    approvalStatus: {
        type: String,
        required: true
    },
    headline: {
        type: String
    },
    pros: {
        type: String
    },
    cons: {
        type: String
    },
    overAllRating: {
        type: String
    },
    ceoApprovalRating: {
        type: String
    },
    recommendationRating: {
        type: String
    },
    comment: {
        type: String
    },
    favorite: {
        type: Boolean
    },
    featured: {
        type: String
    },
    reply: [{

        initiatedBy: {
            type: String
        },
        receivedBy: {
            type: String
        },
        message: {
            type: String
        },
        Date: {
            type: Date,
            default: Date.now()
        },


    }]

});

const Review = mongoose.model('review', ReviewSchema);
module.exports = Review;