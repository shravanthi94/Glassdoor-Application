const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company',
    },
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
    employerName:{
        type: String,
        required: true
    },
    salaryGender: {
        type: String
    }
});

const Salary = mongoose.model('salary', SalarySchema);
module.exports = Salary;