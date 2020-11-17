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
        type: String
    },
    ceoName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    website: {
        type: String,
        required: true
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
    industry: {
        type: String
    },
    founded: {
        type: String
    },
    mission: {
        type: String,
        required: true
    },
    overAllRating: {
        type: String,
        default: "90"
    },
    ceoApprovalRating: {
        type: String,
        default: "95"
    },
    recommendationRating: {
        type: String,
        default: "85"
    },
    logo:{
        type: String
    },
    images: [{
        type: String
    }],
    date: { type: Date, default: Date.now() },
});

const Company = mongoose.model('company', CompanySchema);
module.exports = Company;