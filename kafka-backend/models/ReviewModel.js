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
        type: String
    },
    approvalStatus: {
        type: String,
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
    jobTitle: {
        type: String
    },
    comment: {
        type: String
    },
    favorite: {
        type: Boolean,
        default: false
    },
    featured: {
        type: Boolean,
        default: false
    },
    currentOrFormer: {
        type: String
    },
    mostHelpfulVotes:{
        type: Number,
        default: 0,
    },
    reply: [{
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