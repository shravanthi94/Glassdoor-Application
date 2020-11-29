const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  jobPreference: {
    status: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    salary: {
      type: String,
      default: '',
    },
    relocation: {
      type: Boolean,
      default: true,
    },
    industry: {
      type: String,
      default: '',
    },
  },
  demographics: {
    ethnicity: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      default: '',
    },
    disability: {
      type: String,
      default: '',
    },
    veteran: {
      type: String,
      default: '',
    },
  },

  primaryResume: {
    type: String,
  },

  applications: {
    type: String,
  },

  date: { type: Date, default: Date.now() },
});

const Student = mongoose.model('student', StudentSchema);
module.exports = Student;

/*
 *
 *
 *
 *
 *
 *
 */
