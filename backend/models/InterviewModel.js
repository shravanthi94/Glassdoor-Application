const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    },
    companyName:{
        type: String,
        required: true
    },
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

});

const Interview = mongoose.model('interview', InterviewSchema);
module.exports = Interview;